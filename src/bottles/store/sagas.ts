import * as API from '../../API/Bottles';
import * as actions from './actions'
import {put} from 'redux-saga/effects';
import { GetBottlesAction, Bottle } from './types';

export function* getAllBottles(action: GetBottlesAction) {
  yield put(actions.getBottlesStart())
  try {
    const bottles: Bottle[] = yield API.getBottles(action.inventoryId, action.token)
    yield put(actions.getBottlesSuccess(bottles))
  } catch (err) {
    yield put(actions.getBottlesFailed(err.message))
  }
}

// export function* updateBottle(action) {
//   yield put(actions.createNewBottleStart())
//   const url = BOTTLE_SCHEME(action.inventoryId, action.bottleId, action.token)
//   try {
//     yield API.patch(url, action.payload)
//     yield put(actions.updateBottleSuccess(action.bottleId, action.payload))
//   } catch(err) {
//     yield put(actions.createNewBottleFailed(err.message))
//   }
// }
// export function* createNewBottle(action) {
//   yield put(actions.createNewBottleStart())
//   const bottle = yield {
//     name: action.name,
//     ownerId: action.ownerId,
//     price: action.price,
//     purchaseDate: action.purchaseDate,
//     imageUrl: action.imageUrl,
//     state: "UNLISTED"
//   }

//   const url = yield `${SCHEME(action.inventoryId)}?auth=${action.token}`

//   try {
//     const response = yield API.post(url, bottle);
//     yield bottle.id = response.name
//     yield put(actions.createNewBottleSuccess(bottle))
//   } catch (err) {
//     yield put(actions.createNewBottleFailed(err.message))
//   }
// }