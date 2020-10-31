import {
  InvestorsActionTypes,
  GET_INVESTORS,
  GET_INVESTORS_START,
  Investor,
  GET_INVESTORS_SUCCESS,
  GET_INVESTORS_FAILED,
} from "./types";

export const getInvestors = (
  token: string,
  inventoryId: string
): InvestorsActionTypes => {
  return {
    type: GET_INVESTORS,
    token: token,
    inventoryId: inventoryId,
  };
};

export const getInvestorsStart = (): InvestorsActionTypes => {
  return {
    type: GET_INVESTORS_START,
  };
};

export const getInvestorsSuccess = (
  investors: Investor[]
): InvestorsActionTypes => {
  return {
    type: GET_INVESTORS_SUCCESS,
    data: investors,
  };
};

export const getInvestorsFailed = (error: string) => {
  return {
    type: GET_INVESTORS_FAILED,
    error: error,
  };
};
