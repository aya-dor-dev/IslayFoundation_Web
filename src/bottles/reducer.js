import * as actionTypes from "../store/actionTypes";
import { updateObject } from "../utils";

const initialState = {
  bottles: null,
  error: null,
  loading: false,
  savingBottle: false,
  bottleSaved: false,
  bottleSavedError: null,
};

const getBottlesStart = (state) =>
  updateObject(state, { bottles: null, error: null, loading: true });

const getBottlesSuccess = (state, action) =>
  updateObject(state, {
    error: null,
    loading: false,
    bottles: action.bottles,
  });

const getBottlesFailed = (state, action) =>
  updateObject(state, { error: action.error });

const bottleCreateInit = (state) =>
  updateObject(state, {
    savingBottle: false,
    bottleSavedError: null,
    bottleSaved: false,
  });

const bottleCreateStart = (state) =>
  updateObject(state, { savingBottle: true });

const bottleCreateSuccess = (state, bottle) =>
  updateObject(state, {
    savingBottle: false,
    bottleSaved: true,
    bottleSavedError: null,
    bottles: state.bottles.concat(bottle),
  });

const bottleCreateFailed = (state, error) =>
  updateObject(state, { loading: false, bottleSavedError: error });

const bottleEditSuccess = (state, action) => {
  const bottles = state.bottles;
  const bottle = bottles.filter((btl) => btl.id === action.bottleId)[0];
  const index = bottles.indexOf(bottle);
  const updatedBottle = updateObject(
    bottle,
    action.payload
  );

  bottles[index] = updatedBottle;
  return updateObject(state, {
    savingBottle: false,
    bottleSaved: true,
    bottleSavedError: null,
    bottles: bottles,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BOTTLES_GET_ALL_START:
      return getBottlesStart(state, action);
    case actionTypes.BOTTLES_GET_ALL_SUCCESS:
      return getBottlesSuccess(state, action);
    case actionTypes.BOTTLES_GET_ALL_FAILED:
      return getBottlesFailed(state, action);
    case actionTypes.BOTTLE_CREATE_INIT:
      return bottleCreateInit(state);
    case actionTypes.BOTTLE_CREATION_START:
      return bottleCreateStart(state);
    case actionTypes.BOTTLE_CREATION_SUCCESS:
      return bottleCreateSuccess(state, action.bottle);
    case actionTypes.BOTTLE_CREATION_FAILED:
      return bottleCreateFailed(state, action.error);
    case actionTypes.BOTTLE_EDIT_SUCCESS:
      return bottleEditSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
