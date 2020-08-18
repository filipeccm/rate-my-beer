import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { firestore } from '../../firebase/firebase.utils';

import './BeerPopup.css';

import DisplayStars from '../display-stars/DisplayStars';
import Stars from '../stars/Stars';

const BeerPopup = ({ history, match }) => {
  const [beerData, setBeerData] = useState({});
  const [favorite, setFavorite] = useState(false);

  const { name, imageUrl, averageRating, numberOfRatings, origin } = beerData;

  useEffect(() => {
    firestore
      .doc(`beers/${match.params.id}`)
      .get()
      .then((beer) => {
        setBeerData({
          id: beer.id,
          ...beer.data(),
        });
      });
  }, [match.params.id]);

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
              {favorite ? <button>Remove</button> : <button>Add</button>}
              {/* <Stars form={false} beerId={id} currentUser={currentUser} /> */}
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(BeerPopup);
