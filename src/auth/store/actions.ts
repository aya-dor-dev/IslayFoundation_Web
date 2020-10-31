import {
  LOGIN,
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SessionActionTypes,
  AUTO_LOGOUT,
  ATTEMPT_AUTO_LOGIN,
  LOGOUT,
} from "./types";
import { Inventory } from "../../inventories/store/types";

export function login(username: string, password: string): SessionActionTypes {
  return {
    type: LOGIN,
    username: username,
    password: password,
  };
}

export function loginStart(): SessionActionTypes {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(
  token: string,
  userId: string,
  email: string,
  name: string,
  inventories: Inventory[]
): SessionActionTypes {
  return {
    type: LOGIN_SUCCESS,
    token: token,
    userId: userId,
    email: email,
    userName: name,
    inventories: inventories
  };
}

export function loginFail(error: string): SessionActionTypes {
  return {
    type: LOGIN_FAIL,
    error: error,
  }
}

export function autoLogout(expiresInMilliseconds: number): SessionActionTypes {
  return {
    type: AUTO_LOGOUT,
    expiresInMilliseconds: expiresInMilliseconds,
  }
}

export function attemptAutoLogin(): SessionActionTypes {
  return {
    type: ATTEMPT_AUTO_LOGIN,
  }
}

export function logout(): SessionActionTypes {
  return {
    type: LOGOUT,
  }
}