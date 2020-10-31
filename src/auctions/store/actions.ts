import {
  GET_AUCTIONS,
  GET_AUCTIONS_START,
  GET_AUCTIONS_SUCCESS,
  GET_AUCTIONS_FAILED,
  AuctionsActionTypes,
  Auction,
} from "./types";

export function getAuctions(token: string, inventoryId: string): AuctionsActionTypes {
  return {
    type: GET_AUCTIONS,
    token: token,
    inventoryId: inventoryId
  }
}

export function getAuctionsStart(): AuctionsActionTypes {
  return {
    type: GET_AUCTIONS_START
  }
}

export function getAuctionsSuccess(auctions: Auction[]): AuctionsActionTypes {
  return {
    type: GET_AUCTIONS_SUCCESS,
    data: auctions
  }
}

export function getAuctionsFailed(error?: string): AuctionsActionTypes {
  return {
    type: GET_AUCTIONS_FAILED,
    error: error
  }
}