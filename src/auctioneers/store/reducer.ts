import { updateObject } from "../../utils";
import {
  AuctioneersRepoState,
  GetAuctioneersResponse,
  AuctioneersActionTypes,
  GET_AUCTIONEERS_START,
  GET_AUCTIONEERS_SUCCESS,
  GET_AUCTIONEERS_FAILED,
} from "./types";

const initialState: AuctioneersRepoState = {
  data: undefined,
  error: undefined,
  loading: false,
};

const getAuctioneersStart = (state: AuctioneersRepoState) =>
  updateObject<AuctioneersRepoState>(state, {
    error: undefined,
    loading: true,
  });

const getAuctioneersSuccess = (
  state: AuctioneersRepoState,
  action: GetAuctioneersResponse
) =>
  updateObject<AuctioneersRepoState>(state, {
    data: action.data,
    error: undefined,
    loading: false,
  });

const getAuctioneersFailed = (
  state: AuctioneersRepoState,
  action: GetAuctioneersResponse
) =>
  updateObject<AuctioneersRepoState>(state, {
    data: undefined,
    error: action.error,
    loading: false,
  });

export default function auctioneersReducer(
  state = initialState,
  action: AuctioneersActionTypes
): AuctioneersRepoState {
  switch (action.type) {
    case GET_AUCTIONEERS_START:
      return getAuctioneersStart(state);
    case GET_AUCTIONEERS_SUCCESS:
      return getAuctioneersSuccess(state, action);
    case GET_AUCTIONEERS_FAILED:
      return getAuctioneersFailed(state, action);
    default:
      return state;
  }
}
