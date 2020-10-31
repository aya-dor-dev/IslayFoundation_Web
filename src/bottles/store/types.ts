import { APIResponse, ApiAction, RepoState } from "../../API/API";

export const GET_BOTTLES = "GET_BOTTLES";
export const GET_BOTTLES_START = "GET_BOTTLES_START";
export const GET_BOTTLES_SUCCESS = "GET_BOTTLES_SUCCESS";
export const GET_BOTTLES_FAILED = "GET_BOTTLES_FAILED";

export enum BOTTLE_STATE {
  UNLISTED,
  LISTED,
  SOLD
}

export interface IBottle {
  id?: string;
  name?: string;
  imageUrl?: string;
  ownerId?: string;
  cost?: number;
  purchaseDate?: number;
  soldFor?: number;
  state?: BOTTLE_STATE
}

export interface Bottle extends IBottle {
  name: string;
  ownerId: string;
  cost: number;
}

export interface BottlesRepoState extends RepoState<Bottle[]>{}

export interface GetBottlesAction extends ApiAction {
  type: typeof GET_BOTTLES;
  inventoryId: string
}

export interface GetBottlesStartAction {
  type: typeof GET_BOTTLES_START;
}

export interface GetBottlesResponse extends APIResponse<Bottle[]> {
  type: typeof GET_BOTTLES_SUCCESS | typeof GET_BOTTLES_FAILED;
}

export type BottlesActionTypes =
  | GetBottlesAction
  | GetBottlesStartAction
  | GetBottlesResponse;