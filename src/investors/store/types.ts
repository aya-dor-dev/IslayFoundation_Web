import { APIResponse, ApiAction, RepoState } from "../../API/API";

export const GET_INVESTORS = "GET_INVESTORS";
export const GET_INVESTORS_START = "GET_INVESTORS_START";
export const GET_INVESTORS_SUCCESS = "GET_INVESTORS_SUCCESS";
export const GET_INVESTORS_FAILED = "GET_INVESTORS_FAILED";

export interface Investor {
  id: string;
  name: string;
  email?: string;
  bottlesOwned?: number | string;
  invested?: number | string;
  withdrawen?: number | string;
  profilePictureUrl?: string;
}

export interface InvestorsRepoState extends RepoState<Investor[]> {}

export interface GetInvestorsAction extends ApiAction {
  type: typeof GET_INVESTORS;
}

export interface GetInvestorsStartAction {
  type: typeof GET_INVESTORS_START;
}

export interface GetInvestorsResponse extends APIResponse<Investor[]> {
  type: typeof GET_INVESTORS_SUCCESS | typeof GET_INVESTORS_FAILED;
}

export type InvestorsActionTypes =
  | GetInvestorsAction
  | GetInvestorsStartAction
  | GetInvestorsResponse;
