import {combineReducers} from 'redux';
import sessionReducer from '../auth/store/reducer';
import bottlesReducer from '../bottles/store/reducer';
import investorsReducer from '../investors/store/reducer';
import auctioneersReducer from '../auctioneers/store/reducer';
import auctionsReducer from '../auctions/store/reducer';
import inventoriesReducer from '../inventories/store/reducer';

export const rootReducer = combineReducers({
  session: sessionReducer,
  bottles: bottlesReducer,
  investors: investorsReducer,
  auctioneers: auctioneersReducer,
  inventory: inventoriesReducer,
  auctions: auctionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

