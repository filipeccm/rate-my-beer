import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './MyBeers.css';

import OneBeer from '../beers-section/OneBeer';

import { firestore } from '../../firebase/firebase.utils';

const MyBeers = ({ currentUser }) => {
  const [favoriteBeers, setFavoriteBeers] = useState([]);
  const [loading, setLoading] = useState(true);

  let location = useLocation();

  //get all beers
  useEffect(() => {
    if (currentUser) {
      //find out which beers were marked as 'favorite' by user
      const unsubscibe = firestore
        .collection('favorites')
        .where(`${currentUser.id}`, '==', true)
        .onSnapshot((snapshot) => {
          const favoriteBeersArray = []; //array to push the favorite beers into
          snapshot.forEach((snapshot) => {
            firestore
              .doc(`beers/${snapshot.id}`) //get beer data stored in another collection
              .get()
              .then((snap) => {
                favoriteBeersArray.push({
                  id: snap.id,
                  ...snap.data(),
                });
                setFavoriteBeers([...favoriteBeersArray]); //update state
                setLoading(false); //update loading state
              })
              .catch((error) => error.message);
          });
        });
      return () => unsubscibe();
    }
  }, [currentUser]);

  useEffect(() => {
    console.log('=>', favoriteBeers);
  }, []);

  return (
    <div>
      <div className="my-beers-grid">
        {loading ? (
          <div>Loading...</div>
        ) : (
          favoriteBeers.map((beer) => (
            <OneBeer key={beer.id} beer={beer} currentUser={currentUser} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyBeers;
