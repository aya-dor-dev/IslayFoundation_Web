import { RepoState, ApiAction, APIResponse } from "../../API/API";
import { Investor } from "../../investors/store/types";

export const GET_INVENTORY = "GET_INVENTORY";
export const GET_INVENTORY_START = "GET_INVENTORY_START";
export const GET_INVENTORY_SUCCESS = "GET_INVENTORY_SUCCESS";
export const GET_INVENTORY_FAILED = "GET_INVENTORY_FAILED";

export const CREATE_INVENTORY_INIT = "CREATE_INVENTORY_INIT";
export const CREATE_INVENTORY = "CREATE_INVENTORY";
export const CREATE_INVENTORY_START = "CREATE_INVENTORY_START";
export const CREATE_INVENTORY_SUCCESS = "CREATE_INVENTORY_SUCCESS";
export const CREATE_INVENTORY_FAILED = "CREATE_INVENTORY_FAILED";

export interface Inventory {
  name: string;
  id: string;
  ownerId: string;
  investors: Investor[];
  bottlesCount: number;
  totalInvestment: number;
  totalReturn: number;
}

export interface InventoryState extends RepoState<Inventory> {}

export interface GetInventoryAction extends ApiAction {
  type: typeof GET_INVENTORY;
  inventoryId: string
}

export interface GetInventoryStartAction {
  type: typeof GET_INVENTORY_START;
}

export interface GetInventoryResponse extends APIResponse<Inventory> {
  type: typeof GET_INVENTORY_SUCCESS | typeof GET_INVENTORY_FAILED;
}

export interface CreateInventoryInitAction {
  type: typeof CREATE_INVENTORY_INIT;
}

export interface CreateInventoryAction extends ApiAction {
  type: typeof CREATE_INVENTORY;
  name: string;
}

export interface CreateInventoryStartAction {
  type: typeof CREATE_INVENTORY_START;
}

export interface CreateInventoryResponse extends APIResponse<Inventory> {
  type: typeof CREATE_INVENTORY_SUCCESS | typeof CREATE_INVENTORY_FAILED;
}

export type InventoryActionTypes =
  | GetInventoryAction
  | GetInventoryStartAction
  | GetInventoryResponse
  | CreateInventoryAction
  | CreateInventoryStartAction
  | CreateInventoryResponse
  | CreateInventoryInitAction;
