import { favoriteBeersActionTypes } from './favorite-beers.types';

import { firestore } from '../../firebase/firebase.utils';

export const addFavoriteBeer = (beer) => ({
  type: favoriteBeersActionTypes.ADD_FAVORITE_BEERS,
  payload: beer,
});

export const removeFavoriteBeer = (beerId) => ({
  type: favoriteBeersActionTypes.REMOVE_FAVORITE_BEERS,
  payload: beerId,
});

export const updateFavoriteBeer = (beer) => ({
  type: favoriteBeersActionTypes.UPDATE_FAVORITE_BEERS,
  payload: beer,
});

export const setFavoriteBeers = (beer) => ({
  type: favoriteBeersActionTypes.SET_FAVORITE_BEERS,
  payload: beer,
});

export const fetchFavoriteBeersStart = () => ({
  type: favoriteBeersActionTypes.FETCH_FAVORITE_BEERS_START,
});

export const fetchFavoriteBeersSuccess = (beersMap) => ({
  type: favoriteBeersActionTypes.FETCH_FAVORITE_BEERS_SUCCESS,
  payload: beersMap,
});

export const fetchFavoriteBeersIdsStartAsync = (currentUser) => {
  return (dispatch) => {
    dispatch(fetchFavoriteBeersStart());
    const unsubscribe = firestore
      .collection('favorites')
      .where(`${currentUser.id}`, '==', true)
      .onSnapshot({ includeMetadataChanges: true }, async (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('added');
            dispatch(addFavoriteBeer({ id: change.doc.id }));
          }
          if (change.type === 'modified') {
            console.log('modified');
            dispatch(updateFavoriteBeer({ id: change.doc.id }));
          }
          if (change.type === 'removed') {
            console.log('removed');
            dispatch(removeFavoriteBeer(change.doc.id));
          }
        });
      });
    return () => unsubscribe();
  };
};
