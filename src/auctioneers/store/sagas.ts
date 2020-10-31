import * as API from '../../API/Auctioneers';
import * as actions from './actions';
import {put} from 'redux-saga/effects';
import { GetAuctioneersAction } from './types';

export function* getAllAuctioneers(action: GetAuctioneersAction) {
  yield put(actions.getAuctioneersStart())
  try {
    const auctioneers = []
    const response = yield API.getAuctioneers(action.token);
    for (const key in response.data) {
      auctioneers.push({
        id: key,
        ...response.data[key]
      })
    }
    yield put(actions.getAuctioneersSuccess(auctioneers))
  } catch (err) {
    yield put(actions.getAuctioneersFailed(err.message))
  }
}