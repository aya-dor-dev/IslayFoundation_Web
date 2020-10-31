import * as actionTypes from "../store/actionTypes";

export const updateBottle = (token, inventoryId, bottleId, payload) => {
  return {
    type:actionTypes.BOTTLE_EDIT,
    token: token,
    inventoryId: inventoryId,
    bottleId: bottleId,
    payload: payload
  }
};
