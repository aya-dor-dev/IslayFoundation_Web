import API, { withToken } from "./API";
import { SCHEME as INVENTORIES_SCHEME } from "./inventories";
import { Bottle, BOTTLE_STATE } from "../bottles/store/types";

export const SCHEME_NAME = "bottles";

const BOTTLES_SCHEME = (inventoryId: string) =>
  `${INVENTORIES_SCHEME}/${inventoryId}/bottles.json`;

const BOTTLE_SCHEME = (inventoryId: string, bottleId: string) =>
  `inventories/${inventoryId}/bottles/${bottleId}.json`;

export const getBottles = (
  inventoryId: string,
  token: string,
  state?: BOTTLE_STATE
) => {
  return API.get(withToken(BOTTLES_SCHEME(inventoryId), token)).then((res) => {
    const bottles: Bottle[] = [];
    for (const key in res.data) {
      const b: Bottle = res.data[key];
      b.id = key;
      if (state === undefined || b.state === state) {
        bottles.push(b);
      }
    }

    return bottles;
  });
};

export const getBottlesByIds = (
  inventoryId: string,
  token: string,
  ids: string[]
) => {
  const promises = ids.map((id) => getBottle(inventoryId, id, token));
  return Promise.all(promises);
};

export const getBottle = (
  inventoryId: string,
  bottleId: string,
  token: string
) => {
  return API.get(withToken(BOTTLE_SCHEME(inventoryId, bottleId), token)).then(
    (res) => {
      const btl: Bottle = res.data;
      btl.id = bottleId;
      return btl;
    }
  );
};

export const createNewBottle = (
  bottle: Bottle,
  inventoryId: string,
  token: string
) => {
  return API.post(withToken(BOTTLES_SCHEME(inventoryId), token), bottle);
};

export const updateBottle = (
  bottle: Bottle,
  inventoryId: string,
  token: string
) => {
  const id = bottle.id!;
  delete bottle.id;

  return API.patch(withToken(BOTTLE_SCHEME(inventoryId, id), token), bottle);
};

export const updateState = (
  bottleId: string,
  inventoryId: string,
  newState: BOTTLE_STATE,
  token: string
) => {
  return API.patch(withToken(BOTTLE_SCHEME(inventoryId, bottleId), token), {
    state: newState,
  });
};
