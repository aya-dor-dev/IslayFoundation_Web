import { APIResponse, ApiAction, RepoState } from "../../API/API";

export const GET_AUCTIONEERS = "GET_AUCTIONEERS";
export const GET_AUCTIONEERS_START = "GET_AUCTIONEERS_START";
export const GET_AUCTIONEERS_SUCCESS = "GET_AUCTIONEERS_SUCCESS";
export const GET_AUCTIONEERS_FAILED = "GET_AUCTIONEERS_FAILED";

export interface Auctioneer {
  id: string;
  name: string;
  feesFormula: string;
  imageUrl?: string;
}

export interface AuctioneersRepoState extends RepoState<Auctioneer[]> {}

export interface GetAuctioneersAction extends ApiAction {
  type: typeof GET_AUCTIONEERS;
}

export interface GetAuctioneersStartAction {
  type: typeof GET_AUCTIONEERS_START;
}

export interface GetAuctioneersResponse extends APIResponse<Auctioneer[]> {
  type: typeof GET_AUCTIONEERS_SUCCESS | typeof GET_AUCTIONEERS_FAILED;
}

export type AuctioneersActionTypes =
  | GetAuctioneersAction
  | GetAuctioneersStartAction
  | GetAuctioneersResponse;
