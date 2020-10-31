import { updateObject } from "../../utils";
import { InvestorsRepoState, Investor, InvestorsActionTypes, GET_INVESTORS_START, GET_INVESTORS_SUCCESS, GetInvestorsAction, GetInvestorsResponse, GET_INVESTORS_FAILED } from "./types";

const initialState: InvestorsRepoState = {
  data: undefined,
  error: undefined,
  loading: false,
};

export const getInvestorsStart = (state: InvestorsRepoState) =>
  updateObject(state, { loading: true});

export const getInvestorsSuccess = (state: InvestorsRepoState, action: GetInvestorsResponse) =>
  updateObject(state, { data: action.data, loading: false });

export const getInvestorsFailed = (state: InvestorsRepoState, action: GetInvestorsResponse) =>
  updateObject(state, { error: action.error, loading: false});

const reducer = (state = initialState, action: InvestorsActionTypes) => {
  switch (action.type) {
    case GET_INVESTORS_START: return getInvestorsStart(state)
    case GET_INVESTORS_SUCCESS: return getInvestorsSuccess(state, action)
    case GET_INVESTORS_FAILED: return getInvestorsFailed(state, action)
    default: return state
  }
};

export default reducer;
