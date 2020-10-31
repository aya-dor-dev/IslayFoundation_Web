import {
  GET_AUCTIONEERS,
  GET_AUCTIONEERS_START,
  GET_AUCTIONEERS_SUCCESS,
  GET_AUCTIONEERS_FAILED,
  AuctioneersActionTypes,
  Auctioneer
} from "./types";

export function getAuctioneers(token: string): AuctioneersActionTypes {
  return {
    type: GET_AUCTIONEERS,
    token: token
  }
}

export function getAuctioneersStart(): AuctioneersActionTypes {
  return {
    type: GET_AUCTIONEERS_START
  }
}

export function getAuctioneersSuccess(auctioneers: Auctioneer[]): AuctioneersActionTypes {
  return {
    type: GET_AUCTIONEERS_SUCCESS,
    data: auctioneers
  }
}

export function getAuctioneersFailed(error?: string): AuctioneersActionTypes {
  return {
    type: GET_AUCTIONEERS_FAILED,
    error: error
  }
}