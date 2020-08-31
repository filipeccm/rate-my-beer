import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './BeerPopup.css';

import { firestore, toggleFavorite } from '../../firebase/firebase.utils';

import DisplayStars from '../display-stars/DisplayStars';
import Stars from '../stars/Stars';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

const BeerPopup = ({ history, match, currentUser }) => {
  const [beerData, setBeerData] = useState({});
  const [favorite, setFavorite] = useState(false);

  const beerId = match.params.id;

  const { name, imageUrl, averageRating, numberOfRatings, origin } = beerData;

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
              <div className="beer-popup-icons">
                {favorite ? (
                  <FaHeart
                    className="favorite-button favorited"
                    onClick={() => toggleFavorite(match.params.id, currentUser)}
                  />
                ) : (
                  <FaRegHeart
                    className="favorite-button"
                    onClick={() => toggleFavorite(match.params.id, currentUser)}
                  />
                )}
                <Stars form={false} beerId={beerId} currentUser={currentUser} />
              </div>
              <h2>{name}</h2>
              <div className="beer-card-rating">
                <DisplayStars averageRating={averageRating} />
              </div>
              <p className="beer-card-p">
                <span>{averageRating}</span> out of{' '}
                <span>{numberOfRatings}</span> ratings
              </p>
              <p>
                Origin <span className="extra-info">{origin}</span>
              </p>
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(withRouter(BeerPopup));
