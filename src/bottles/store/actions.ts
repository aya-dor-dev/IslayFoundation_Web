import { BottlesActionTypes, GET_BOTTLES, GET_BOTTLES_START, GET_BOTTLES_SUCCESS, Bottle, GET_BOTTLES_FAILED } from "./types";

export function getBottles(token: string, inventoryId: string): BottlesActionTypes {
  return {
    type: GET_BOTTLES,
    token: token,
    inventoryId: inventoryId
  }
}

export function getBottlesStart(): BottlesActionTypes {
  return {
    type: GET_BOTTLES_START
  }
}

export function getBottlesSuccess(bottles: Bottle[]): BottlesActionTypes {
  return {
    type: GET_BOTTLES_SUCCESS,
    data: bottles
  }
}

export function getBottlesFailed(error?: string): BottlesActionTypes {
  return {
    type: GET_BOTTLES_FAILED,
    error: error
  }
}