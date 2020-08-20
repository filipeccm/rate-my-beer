import React, { useEffect, useState, useRef } from 'react';
import './OneBeer.css';

import { Link, useLocation } from 'react-router-dom';

import Stars from '../stars/Stars';
import DisplayStars from '../display-stars/DisplayStars';

import {
  rateThisBeer,
  updateRatings,
  firestore,
} from '../../firebase/firebase.utils';

const OneBeer = ({
  beer: { name, averageRating, numberOfRatings, imageUrl, id },
}) => {
  const overlayRef = useRef();
  let location = useLocation();
  console.log({ name, averageRating, numberOfRatings, id });

  const hideOverlay = () => {
    overlayRef.current.style.setProperty('opacity', '0');
  };
  const showOverlay = () => {
    overlayRef.current.style.setProperty('opacity', '0.5');
  };

  useEffect(() => {
    updateRatings(id);
  }, [id]);

  // useEffect(() => {
  //   //get the specific beer
  //   const beerRef = firestore.doc(`beers/${id}`);
  //   //get all ratings for specific beer
  //   const ratingRef = firestore.doc(`ratings/${id}`);
  //   //ratings realtime listener
  //   ratingRef.onSnapshot((snapshot) => {
  //     const values = snapshot.data();
  //     if (values) {
  //       const nor = Object.values(values).length;
  //       const rt = Object.values(values).reduce((a, b) => a + b, 0);
  //       const avg = rt / nor;
  //       try {
  //         //update the ratings inside the beer
  //         beerRef.update({
  //           numberOfRatings: nor,
  //           ratingTotal: rt,
  //           averageRating: avg,
  //         });
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   });
  // }, [id]);

  return (
    <Link
      to={{
        pathname: `/beers/${id}`,
        state: { background: location },
      }}
    >
      <div
        className="beer-card"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : `url('https://dummyimage.com/225x225/003147/fff'})`,
        }}
      >
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
          {/* <Stars form={false} beerId={id} currentUser={currentUser} /> */}
        </div>
      </div>
    </Link>
  );
};

export default OneBeer;
