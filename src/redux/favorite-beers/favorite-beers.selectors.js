import { createSelector } from 'reselect';

const selectFavoriteBeers = (state) => state.favoriteBeers;

export const selectFavoriteBeersItems = createSelector(
  [selectFavoriteBeers],
  (favoriteBeers) => favoriteBeers.favoriteBeers
);
