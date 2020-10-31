import API from '../API/API';
import * as actions from '../store'
import {put, delay} from 'redux-saga/effects';

const SCHEME = (inventoryId) => `inventories/${inventoryId}/bottles.json`
const BOTTLE_SCHEME = (inventoryId, bottleId, token) => `inventories/${inventoryId}/bottles/${bottleId}.json?auth=${token}`

export function* getAllBottles(action) {
  yield put(actions.getAllBottlesStart())
  const url = yield `${SCHEME(action.inventoryId)}?auth=${action.token}`
  try {
    const bottles = []
    const response = yield API.get(url);
    for (const key in response.data) {
      bottles.push({
        id: key,
        ...response.data[key]
      })
    }
    yield put(actions.getAllBottlesSuccess(bottles))
  } catch (err) {
    yield put(actions.getAllBottlesFailed(err.message))
  }
}

export function* updateBottle(action) {
  yield put(actions.createNewBottleStart())
  const url = BOTTLE_SCHEME(action.inventoryId, action.bottleId, action.token)
  try {
    yield API.patch(url, action.payload)
    yield put(actions.updateBottleSuccess(action.bottleId, action.payload))
  } catch(err) {
    yield put(actions.createNewBottleFailed(err.message))
  }
}
