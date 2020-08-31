import { BeersActionTypes } from './beers.types';
import { updateBeerItem, removeBeerItem, addBeerItem } from './beers.utils';

const INITIAL_STATE = {
  beers: null,
  isFetching: false,
};

const beersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BeersActionTypes.ADD_BEER:
      return {
        ...state,
        beers: addBeerItem(state.beers, action.payload),
      };
    case BeersActionTypes.UPDATE_BEER:
      return {
        ...state,
        beers: updateBeerItem(state.beers, action.payload),
      };
    case BeersActionTypes.REMOVE_BEER:
      return {
        ...state,
        beers: removeBeerItem(state.beers, action.payload),
      };
    case BeersActionTypes.FETCH_BEERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case BeersActionTypes.FETCH_BEERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        beers: action.payload,
      };
    case BeersActionTypes.FETCH_BEERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default beersReducer;
