import React, { useEffect, useState, useRef } from 'react';
import './OneBeer.css';

import Stars from '../stars/Stars';
import DisplayStars from '../display-stars/DisplayStars';

import { rateThisBeer, firestore } from '../../firebase/firebase.utils';

const OneBeer = ({
  currentUser,
  beers,
  beer: { name, averageRating, numberOfRatings, id },
}) => {
  const [rating, setRating] = useState(null);
  const overlayRef = useRef();

  const hideOverlay = () => {
    overlayRef.current.style.setProperty('opacity', '0');
  };
  const showOverlay = () => {
    overlayRef.current.style.setProperty('opacity', '0.5');
  };

  useEffect(() => {
    //get the specific beer
    const beerRef = firestore.doc(`beers/${id}`);
    //get all ratings for specific beer
    const newRef = firestore.doc(`ratings/${id}`);
    //ratings realtime listener
    newRef.onSnapshot((snapshot) => {
      const values = snapshot.data();
      if (values) {
        const nor = Object.values(values).length;
        const rt = Object.values(values).reduce((a, b) => a + b, 0);
        const avg = rt / nor;
        try {
          //update the ratings inside the beer
          beerRef.update({
            numberOfRatings: nor,
            ratingTotal: rt,
            averageRating: avg,
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  }, [id]);

  return (
    <div className="beer-card">
      <div ref={overlayRef} className="beer-card-overlay"></div>
      <div
        className="beer-card-info"
        onMouseEnter={hideOverlay}
        onMouseLeave={showOverlay}
      >
        <h2>{name}</h2>
        <div className="beer-card-rating">
          <DisplayStars averageRating={averageRating} />
        </div>
        <p>
          <span>{averageRating}</span> out of <span>{numberOfRatings}</span>{' '}
          ratings
        </p>
        <Stars form={false} beerId={id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default OneBeer;
