import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import beersReducer from './beers/beers.reducer';
import favoriteBeersReducer from './favorite-beers/favorite-beers.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['beers'],
};

const rootReducer = combineReducers({
  user: userReducer,
  beers: beersReducer,
  favoriteBeers: favoriteBeersReducer,
});

export default persistReducer(persistConfig, rootReducer);
