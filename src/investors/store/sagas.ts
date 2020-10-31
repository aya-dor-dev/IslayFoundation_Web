import API from '../../API/API';
import * as actions from '../../store'
import {put} from 'redux-saga/effects';

const SCHEME = "users.json"

// export function* loadInvestors(action) {
//   yield put(actions.getInvestorsStart())
// }

// export function* getAllUsers(action) {
//   yield put(actions.getUsersStart())
//   const url = yield `${SCHEME}?auth=${action.token}`
//   try {
//     const users = []
//     const response = yield API.get(url);
//     for (const key in response.data) {
//       users.push({
//         id: key,
//         ...response.data[key]
//       })
//     }
//     yield put(actions.getUsersSuccess(users))
//   } catch (err) {
//     yield put(actions.getUsersFailed(err.message))
//   }
// }