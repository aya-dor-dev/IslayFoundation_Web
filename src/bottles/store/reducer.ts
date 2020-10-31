import { updateObject } from "../../utils";
import {
  BottlesRepoState,
  GetBottlesResponse,
  BottlesActionTypes,
  GET_BOTTLES_START,
  GET_BOTTLES_SUCCESS,
  GET_BOTTLES_FAILED,
} from "./types";

const initialState: BottlesRepoState = {
  data: undefined,
  error: undefined,
  loading: false,
};

const getBottlesStart = (state: BottlesRepoState) =>
  updateObject(state, {
    error: undefined,
    loading: true,
  });

const getBottlesSuccess = (
  state: BottlesRepoState,
  action: GetBottlesResponse
) =>
  updateObject(state, {
    data: action.data,
    error: undefined,
    loading: false,
  });

const getBottlesFailed = (
  state: BottlesRepoState,
  action: GetBottlesResponse
) =>
  updateObject(state, {
    data: undefined,
    error: action.error,
    loading: false,
  });

export default function bottlesReducer(
  state = initialState,
  action: BottlesActionTypes
): BottlesRepoState {
  switch (action.type) {
    case GET_BOTTLES_START:
      return getBottlesStart(state);
    case GET_BOTTLES_SUCCESS:
      return getBottlesSuccess(state, action);
    case GET_BOTTLES_FAILED:
      return getBottlesFailed(state, action);
    default:
      return state;
  }
}
