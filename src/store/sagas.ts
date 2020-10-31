import { GET_INVENTORY } from './../inventories/store/types';
import { takeEvery, takeLatest } from "redux-saga/effects";
import * as auth from "../auth/store/sagas";
import * as bottles from "../bottles/store/sagas";
import * as auctioneers from "../auctioneers/store/sagas";
import * as inventories from "../inventories/store/sagas";
import * as auctions from "../auctions/store/sagas";
import {GET_AUCTIONS} from '../auctions/store/types';
import {GET_BOTTLES} from '../bottles/store/types';
import * as actionTypes from "./actionTypes";
import {LOGIN, ATTEMPT_AUTO_LOGIN, AUTO_LOGOUT} from '../auth/store/types';
import {GET_AUCTIONEERS} from '../auctioneers/store/types';

import { SagaMiddleware } from "redux-saga";

export function attach(sagaMiddleware: SagaMiddleware) {
  sagaMiddleware.run(watchAuth)
  sagaMiddleware.run(watchBottles)
  sagaMiddleware.run(watchUsers)
  sagaMiddleware.run(watchAuctioneers)
  sagaMiddleware.run(watchInventories)
  sagaMiddleware.run(watchAuctions)
}

function* watchAuth() {
  yield takeEvery(LOGIN, auth.authenticateUser);
  yield takeEvery(AUTO_LOGOUT, auth.autoLogout);
  yield takeEvery(ATTEMPT_AUTO_LOGIN, auth.attemptAutoLogin);
  yield takeEvery(actionTypes.SESSION_UPDATE, auth.updateUserData)
}

function* watchBottles() {
  yield takeEvery(GET_BOTTLES, bottles.getAllBottles);
  // yield takeLatest(actionTypes.BOTTLE_CREATE, bottles.createNewBottle);
  // yield takeLatest(actionTypes.BOTTLE_EDIT, bottles.updateBottle);
}

function* watchAuctions() {
  yield takeLatest(GET_AUCTIONS, auctions.getAllAuctions);
}

function* watchUsers() {
  // yield takeEvery(actionTypes.USERS_GET, users.getAllUsers);
}

function* watchAuctioneers() {
  yield takeEvery(GET_AUCTIONEERS, auctioneers.getAllAuctioneers);
}

function* watchInventories() {
  yield takeLatest(GET_INVENTORY, inventories.loadInventory)
  //yield takeLatest(actionTypes.INVENTORY_CREATE, inventories.createNewInventory);
}
