import { updateObject } from "../../utils";
import {
  AuctionsRepoState,
  GetAuctionsResponse,
  AuctionsActionTypes,
  GET_AUCTIONS_START,
  GET_AUCTIONS_SUCCESS,
  GET_AUCTIONS_FAILED,
} from "./types";

const initialState: AuctionsRepoState = {
  data: undefined,
  error: undefined,
  loading: false,
};

const getAuctionsStart = (state: AuctionsRepoState) =>
  updateObject(state, {
    error: undefined,
    loading: true,
  });

const getAuctionsSuccess = (
  state: AuctionsRepoState,
  action: GetAuctionsResponse
) =>
  updateObject(state, {
    data: action.data,
    error: undefined,
    loading: false,
  });

const getAuctionsFailed = (
  state: AuctionsRepoState,
  action: GetAuctionsResponse
) =>
  updateObject(state, {
    data: undefined,
    error: action.error,
    loading: false,
  });

export default function auctionsReducer(
  state = initialState,
  action: AuctionsActionTypes
): AuctionsRepoState {
  switch (action.type) {
    case GET_AUCTIONS_START:
      return getAuctionsStart(state);
    case GET_AUCTIONS_SUCCESS:
      return getAuctionsSuccess(state, action);
    case GET_AUCTIONS_FAILED:
      return getAuctionsFailed(state, action);
    default:
      return state;
  }
}
