import { fetchBeers, fetchOneBeerRating } from "../../api/api.utils";
import { BeersActionTypes } from "./beers.types";

export const addBeer = (beer) => ({
  type: BeersActionTypes.ADD_BEER,
  payload: beer,
});

export const removeBeer = (beerId) => ({
  type: BeersActionTypes.REMOVE_BEER,
  payload: beerId,
});

export const updateBeer = (beer) => ({
  type: BeersActionTypes.UPDATE_BEER,
  payload: beer,
});

export const fetchBeersStart = () => ({
  type: BeersActionTypes.FETCH_BEERS_START,
});

export const fetchBeersSuccess = (beersMap) => ({
  type: BeersActionTypes.FETCH_BEERS_SUCCESS,
  payload: beersMap,
});

export const fetchBeersStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchBeersStart());

    const data = await fetchBeers();

    if (data && data.results.length) {
      const beers = await Promise.all(
        data.results?.map(async (b) => {
          const rating = await fetchOneBeerRating(b.id);
          return {
            ...b,
            ratings: b?.ratings?.map((r) => r.rating),
            averageRating: rating.average_rating,
            numberOfRatings: rating.number_of_ratings,
            totalRating: rating.total_rating,
          };
        })
      );
      dispatch(fetchBeersSuccess(beers));
    }
  };
};
