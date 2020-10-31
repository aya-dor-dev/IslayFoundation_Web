import { Inventory } from "../../inventories/store/types";

export interface SessionState {
  loggedIn: boolean;
  loggingIn: boolean;
  token?: string;
  userId?: string;
  error?: string;
  userName?: string;
  email?: string;
  inventories?: Inventory[];
}

export const LOGIN = "LOGIN";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const ATTEMPT_AUTO_LOGIN = "ATTEMPT_AUTO_LOGIN";
export const AUTO_LOGOUT = "AUTO_LOGOUT";
export const LOGOUT = "LOGOUT";

export interface LoginAction {
  type: typeof LOGIN;
  username: string;
  password: string;
}

export interface LoginStartAction {
  type: typeof LOGIN_START;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  token: string;
  userId: string;
  userName: string;
  email: string;
  inventories: Inventory[];
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  error: string;
}

export interface AutoLogoutAction {
  type: typeof AUTO_LOGOUT;
  expiresInMilliseconds: number;
}

export interface AttemptAutoLoginAction {
  type: typeof ATTEMPT_AUTO_LOGIN;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type SessionActionTypes =
  | LoginAction
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailAction
  | AutoLogoutAction
  | AttemptAutoLoginAction
  | LogoutAction;
