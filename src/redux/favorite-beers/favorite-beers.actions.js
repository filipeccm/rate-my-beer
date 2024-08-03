import {
  favoriteBeer,
  fetchFavoriteBeers,
  deleteFavoriteBeer,
} from "../../api/api.utils";
import { favoriteBeersActionTypes } from "./favorite-beers.types";

export const addFavoriteBeer = (beer, currentUser) => {
  return async (dispatch) => {
    const res = await favoriteBeer(beer.id, currentUser);
    if (res && res.ok) {
      dispatch({
        type: favoriteBeersActionTypes.ADD_FAVORITE_BEERS,
        payload: beer,
      });
    }
  };
};

export const removeFavoriteBeer = (beerId, currentUser) => {
  return async (dispatch) => {
    const res = await deleteFavoriteBeer(beerId, currentUser);
    if (res && res.ok) {
      dispatch({
        type: favoriteBeersActionTypes.REMOVE_FAVORITE_BEERS,
        payload: beerId,
      });
    }
  };
};

export const updateFavoriteBeer = (beer) => ({
  type: favoriteBeersActionTypes.UPDATE_FAVORITE_BEERS,
  payload: beer,
});

export const setFavoriteBeers = (beer) => {
  return {
    type: favoriteBeersActionTypes.SET_FAVORITE_BEERS,
    payload: beer,
  };
};

export const fetchFavoriteBeersStart = () => ({
  type: favoriteBeersActionTypes.FETCH_FAVORITE_BEERS_START,
});

export const fetchFavoriteBeersSuccess = (beersMap) => ({
  type: favoriteBeersActionTypes.FETCH_FAVORITE_BEERS_SUCCESS,
  payload: beersMap,
});

export const fetchFavoriteBeersIdsStartAsync = (currentUser) => {
  return async (dispatch) => {
    dispatch(fetchFavoriteBeersStart());
    const data = await fetchFavoriteBeers(currentUser);
    if (data && data?.likedBeers?.length) {
      const beers = data.likedBeers.map((b) => {
        return {
          ...b.beer,
          ratings: b?.ratings?.map((r) => r.rating),
        };
      });
      dispatch(fetchFavoriteBeersSuccess(beers));
    }
  };
};
