import axios from "axios";
import API from "../../API/API";
import * as actions from "./actions";
import { put, delay } from "redux-saga/effects";
import { LoginAction, AutoLogoutAction, AttemptAutoLoginAction } from "./types";

export const LS_TOKEN = "token";
const LS_EXPIRATION_DATE = "expiration_date";
const LS_USER_ID = "user_id";

const API_KEY = "AIzaSyA0MGI9bHB81LweLumRUiljZE-lGeZK9ko";

export const SCHEME = (localId: string) => `users/${localId}.json`;

export function* authenticateUser(action: LoginAction) {
  yield put(actions.loginStart());
  const authData = {
    email: action.username,
    password: action.password,
    returnSecureToken: true,
  };

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  try {
    const response = yield axios.post(url, authData);
    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = yield new Date(
      new Date().getTime() + expiresIn * 1000
    );

    yield localStorage.setItem(LS_TOKEN, idToken);
    yield localStorage.setItem(LS_EXPIRATION_DATE, expirationDate);
    yield localStorage.setItem(LS_USER_ID, localId);

    const userData = yield loadUserData(idToken, localId);
    yield put(
      actions.loginSuccess(
        idToken,
        localId,
        userData.email,
        userData.name,
        userData.inventories
      )
    );
    yield put(actions.autoLogout(expiresIn * 1000));
  } catch (err) {
    yield put(actions.loginFail(err.message));
  }
}

export function* attemptAutoLogin(action: AttemptAutoLoginAction) {
  yield put(actions.loginStart());
  const token = yield localStorage.getItem(LS_TOKEN);
  if (!token) {
    return;
  }
  const expirationDate = yield localStorage.getItem(LS_EXPIRATION_DATE);
  const expiresInMilliseconds = yield new Date(expirationDate).getTime() -
    new Date().getTime();

  if (expiresInMilliseconds > 0) {
    try {
      const userData = yield loadUserData(
        token,
        localStorage.getItem(LS_USER_ID)!
      );
      yield put(
        yield put(
          actions.loginSuccess(
            token,
            localStorage.getItem(LS_USER_ID)!,
            userData.email,
            userData.name,
            userData.inventories
          )
        )
      );
      yield put(actions.autoLogout(expiresInMilliseconds));
    } catch (err) {
      yield put(actions.loginFail(err.message));
    }
  } else {
    yield put(actions.logout());
  }
}

export function* loadUserData(token: string, localId: string) {
  const usrDataUrl = yield `${SCHEME(localId)}?auth=${token}`;
  const response = yield API.get(usrDataUrl);
  const userData = yield response.data;

  userData.inventories = yield loadInventoriesInformation(
    token,
    userData.inventories ?? []
  );

  return userData;
}

export function* loadInventoriesInformation(
  token: string,
  inventoriesIds: string[]
) {
  const inventories = yield [];
  for (const id of inventoriesIds) {
    const inventoriesInfoUrl = yield `inventories/${id}/name.json?auth=${token}&shallow=true`;
    const response = yield API.get(inventoriesInfoUrl);
    const name = yield response.data;
    yield inventories.push({
      id: id,
      name: name,
    });
  }

  return inventories;
}

export function* autoLogout(action: AutoLogoutAction) {
  yield delay(action.expiresInMilliseconds);
  yield put(actions.logout());
}

export function* updateUserData(action: any) {
  // yield put(actions.sessionUpdateStart());
}
