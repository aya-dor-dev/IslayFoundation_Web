import {
  GET_INVENTORY,
  InventoryActionTypes,
  GET_INVENTORY_START,
  Inventory,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAILED,
  CREATE_INVENTORY_INIT,
  CREATE_INVENTORY,
  CREATE_INVENTORY_START,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_FAILED,
} from "./types";

export const loadInventory = (
  token: string,
  inventoryId: string
): InventoryActionTypes => {
  return {
    type: GET_INVENTORY,
    token: token,
    inventoryId: inventoryId,
  };
};

export const loadInventoryStart = (): InventoryActionTypes => {
  return {
    type: GET_INVENTORY_START,
  };
};

export const loadInventorySuccess = (
  inventory: Inventory
): InventoryActionTypes => {
  return {
    type: GET_INVENTORY_SUCCESS,
    data: inventory,
  };
};

export const loadInventoryFailed = (error: string): InventoryActionTypes => {
  return {
    type: GET_INVENTORY_FAILED,
    error: error,
  };
};

export const createNewInventoryInit = (): InventoryActionTypes => {
  return {
    type: CREATE_INVENTORY_INIT,
  };
};

export const createNewInventory = (
  token: string,
  userId: string,
  name: string
): InventoryActionTypes => {
  return {
    type: CREATE_INVENTORY,
    name: name,
    token: token,
    userId: userId,
  };
};

export const createNewInventoryStart = (): InventoryActionTypes => {
  return {
    type: CREATE_INVENTORY_START
  };
};

export const createNewInventorySuccess = (inventory: Inventory): InventoryActionTypes => {
  return {
    type: CREATE_INVENTORY_SUCCESS,
    data: inventory,
  };
};

export const createNewInventoryFailed = (error: string): InventoryActionTypes => {
  return {
    type: CREATE_INVENTORY_FAILED,
    error: error,
  };
};
