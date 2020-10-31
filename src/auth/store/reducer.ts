import { updateObject } from "../../utils";
import {
  SessionState,
  SessionActionTypes,
  LoginFailAction,
  LoginSuccessAction,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

const initialState: SessionState = {
  loggedIn: false,
  loggingIn: false,
};

const loginStart = (state: SessionState) =>
  updateObject(state, { error: undefined, loggingIn: true, loggedIn: false });

const loginFailed = (state: SessionState, action: LoginFailAction) =>
  updateObject(state, { error: action.error, loggingIn: false, loggedIn: false });

const loginSuccess = (state: SessionState, action: LoginSuccessAction) =>
  updateObject(state, {
    error: undefined,
    loggingIn: false,
    loggedIn: true,
    token: action.token,
    userId: action.userId,
    email: action.email,
    userName: action.userName,
    inventories: action.inventories,
  });

const logout = (state: SessionState) => 
  updateObject(state, initialState)

export default function sessionReducer(
  state = initialState,
  action: SessionActionTypes
): SessionState {
  switch (action.type) {
    case LOGIN_START:
      return loginStart(state);
    case LOGIN_FAIL:
      return loginFailed(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
}
