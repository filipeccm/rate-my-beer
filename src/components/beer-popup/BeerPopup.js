import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { firestore, toggleFavorite } from '../../firebase/firebase.utils';

import './BeerPopup.css';

import DisplayStars from '../display-stars/DisplayStars';
import Stars from '../stars/Stars';

const BeerPopup = ({ history, match, currentUser }) => {
  const [beerData, setBeerData] = useState({});
  const [favorite, setFavorite] = useState(false);

  const beerId = match.params.id;

  const {
    name,
    imageUrl,
    averageRating,
    numberOfRatings,
    origin,
    id,
  } = beerData;

  useEffect(() => {
    const unsubscribe = firestore
      .doc(`beers/${match.params.id}`)
      .onSnapshot((beer) => {
        setBeerData({
          id: beer.id,
          ...beer.data(),
        });
      });

    return () => unsubscribe();
  }, [match.params.id]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = firestore
        .doc(`favorites/${match.params.id}`)
        .onSnapshot((doc) => {
          const obj = { ...doc.data() };
          if (
            obj.hasOwnProperty(currentUser.id) &&
            obj[currentUser.id] === true
          ) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        });

      return () => unsubscribe();
    }
  }, [match.params.id, currentUser]);

  return (
    <div className="beer-popup-wrapper" onClick={() => history.goBack()}>
      <div className="beer-popup" onClick={(e) => e.stopPropagation()}>
        {beerData ? (
          <Fragment>
            <div
              className="beer-popup-image"
              style={{
                backgroundImage: imageUrl
                  ? `url(${imageUrl})`
                  : `url('https://dummyimage.com/225x225/003147/fff'})`,
              }}
            ></div>
            <div className="beer-popup-info">
              <h2>{name}</h2>
              <div className="beer-card-rating">
                <DisplayStars averageRating={averageRating} />
              </div>
              <p>
                <span>{averageRating}</span> out of{' '}
                <span>{numberOfRatings}</span> ratings
              </p>
              <p>
                Origin <span>{origin}</span>
              </p>
              <button
                onClick={() => toggleFavorite(match.params.id, currentUser)}
              >
                {favorite ? 'Remove' : 'Add'}
              </button>

              <Stars form={false} beerId={beerId} currentUser={currentUser} />
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(BeerPopup);
