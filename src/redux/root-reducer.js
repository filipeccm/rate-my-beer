import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import beersReducer from './beers/beers.reducer';
import favoriteBeersReducer from './favorite-beers/favorite-beers.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  beers: beersReducer,
  favoriteBeers: favoriteBeersReducer,
});

export default rootReducer;
