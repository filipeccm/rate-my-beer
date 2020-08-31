import { createSelector } from 'reselect';

const selectBeers = (state) => state.beers;

export const selectBeersItems = createSelector(
  [selectBeers],
  (beers) => beers.beers
);
