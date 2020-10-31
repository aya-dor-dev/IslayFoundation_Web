import API from "../../API/API";
import { put } from "redux-saga/effects";
import { SCHEME as USERS_SCHEME } from "../../auth/store/sagas";
import { GetInventoryAction } from "./types";
import * as actions from './actions';

const SCHEME = "inventories";
const SCHEME_FOR_INVENTORY = (id: string, token: string) =>
  `inventories/${id}.json?auth=${token}`;

const SCHEME_FOR_INVENTOR_NAME = (investorId: string, token: string) =>
  `users/${investorId}/name.json?auth=${token}&shallow=true`;

export function* loadInventory(action: GetInventoryAction) {
  yield put(actions.loadInventoryStart());
  const url = yield SCHEME_FOR_INVENTORY(action.inventoryId, action.token);

  try {
    const response = yield API.get(url);
    const inventory = yield response.data;
    
    const investors = [];
    for(const id of inventory.investors) {
      const investorResponse = yield API.get(SCHEME_FOR_INVENTOR_NAME(id, action.token));
      investors.push({
        id: id,
        name: investorResponse.data
      })
    }
    inventory.investors = investors;
    yield put(actions.loadInventorySuccess(inventory));
  } catch (err) {
    yield put(actions.loadInventoryFailed(err.message));
  }
}
/*
export function* createNewInventory(action) {
  console.log(action);
  yield put(actions.createNewInventoryStart());
  const inventory = yield {
    name: action.name,
    ownerId: action.userId,
    bottles: [],
    auctions: [],
    investors: [action.userId],
  };

  const url = yield `${SCHEME}.json?auth=${action.token}`;

  try {
    const response = yield API.post(url, inventory);
    inventory.id = yield response.data.name;
    const newInventoriesIds = [...action.inventoriesIds, inventory.id];
    const payload = {
      inventories: newInventoriesIds,
    };

    const updateUrl = yield `${USERS_SCHEME(action.userId)}?auth=${
      action.token
    }`;
    const updateRes = yield API.patch(updateUrl, payload);
    yield put(actions.createNewInventorySuccess(inventory));
  } catch (err) {
    yield put(actions.createNewInventoryFailed(err.message));
  }
}
*/