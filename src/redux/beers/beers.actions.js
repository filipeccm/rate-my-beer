import { BeersActionTypes } from './beers.types';

import { firestore } from '../../firebase/firebase.utils';

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
  return (dispatch) => {
    dispatch(fetchBeersStart());
    const unsubscribe = firestore
      .collection('beers')
      .orderBy('createdAt')
      .onSnapshot({ includeMetadataChanges: true }, async (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            dispatch(addBeer({ id: change.doc.id, ...change.doc.data() }));
          }
          if (change.type === 'modified') {
            dispatch(updateBeer({ id: change.doc.id, ...change.doc.data() }));
          }
          if (change.type === 'removed') {
            dispatch(removeBeer(change.doc.id));
          }
        });
      });
    return () => unsubscribe();
  };
};
