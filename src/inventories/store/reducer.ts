import { updateObject } from "../../utils";
import {
  InventoryState,
  InventoryActionTypes,
  GET_INVENTORY_START,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAILED,
  GetInventoryResponse,
} from "./types";

const initialState: InventoryState = {
  data: undefined,
  loading: false,
  error: undefined,
};

const getInventoryStart = (state: InventoryState) =>
  updateObject(state, { error: undefined, loading: true, data: undefined });

const getInventorySuccess = (
  state: InventoryState,
  action: GetInventoryResponse
) =>
  updateObject(state, { data: action.data, loading: false, error: undefined });

const getInventoryFailed = (
  state: InventoryState,
  action: GetInventoryResponse
) =>
  updateObject(state, { data: undefined, loading: false, error: action.error });

export default function sessionReducer(
  state = initialState,
  action: InventoryActionTypes
): InventoryState {
  switch (action.type) {
    case GET_INVENTORY_START:
      return getInventoryStart(state);
    case GET_INVENTORY_SUCCESS:
      return getInventorySuccess(state, action);
    case GET_INVENTORY_FAILED:
      return getInventoryFailed(state, action);
    default:
      return state;
  }
}
