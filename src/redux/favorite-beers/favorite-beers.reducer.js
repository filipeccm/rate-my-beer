import { favoriteBeersActionTypes } from './favorite-beers.types';

import {
  addFavoriteBeerItem,
  updateFavoriteBeerItem,
  removeFavoriteBeerItem,
} from './favorite-beers.utils';

const INITIAL_STATE = {
  favoriteBeers: [],
};

export const favoriteBeersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case favoriteBeersActionTypes.ADD_FAVORITE_BEERS:
      return {
        ...state,
        favoriteBeers: addFavoriteBeerItem(state.favoriteBeers, action.payload),
      };
    case favoriteBeersActionTypes.UPDATE_FAVORITE_BEERS:
      return {
        ...state,
        favoriteBeers: updateFavoriteBeerItem(
          state.favoriteBeers,
          action.payload
        ),
      };
    case favoriteBeersActionTypes.REMOVE_FAVORITE_BEERS:
      return {
        ...state,
        favoriteBeers: removeFavoriteBeerItem(
          state.favoriteBeers,
          action.payload
        ),
      };
    case favoriteBeersActionTypes.SET_FAVORITE_BEERS:
      return {
        ...state,
        favoriteBeers: action.payload,
      };
    case favoriteBeersActionTypes.FETCH_FAVORITE_BEERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case favoriteBeersActionTypes.FETCH_FAVORITE_BEERS_SUCCESS:
      return {
        ...state,
        favoriteBeers: action.payload,
      };
    default:
      return state;
  }
};

export default favoriteBeersReducer;
