import React, { useEffect, useState } from 'react';
import './Beers.css';

import OneBeer from './OneBeer';
import MyBeers from '../my-beers/MyBeers';

import { firestore } from '../../firebase/firebase.utils';

const Beers = ({ currentUser }) => {
  const [beers, setBeers] = useState(null);
  console.log('rendered');

  //get all beers
  useEffect(() => {
    const unsubscribe = firestore.collection('beers').onSnapshot((snapshot) => {
      const beerArray = [];
      snapshot.forEach((doc) => {
        beerArray.push({
          id: doc.id,
          ...doc.data(),
        });
        const ref = firestore.doc(`beers/${doc.id}`);
        ref.update({
          ...doc.data(),
        });
      });
      setBeers(beerArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="beers-grid">
        {beers
          ? beers.map((beer) => (
              <OneBeer key={beer.id} beer={beer} currentUser={currentUser} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Beers;