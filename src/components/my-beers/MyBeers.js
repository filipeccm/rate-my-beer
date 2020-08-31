import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './MyBeers.css';

import OneBeer from '../beers-section/OneBeer';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectFavoriteBeersItems } from '../../redux/favorite-beers/favorite-beers.selectors';
import { selectBeersItems } from '../../redux/beers/beers.selectors';

const MyBeers = ({
  currentUser,

  favoriteBeers,
  beers,
}) => {
  const [favBeers, setFavBeers] = useState(null);

  let location = useLocation();

  useEffect(() => {
    if (currentUser && beers && favoriteBeers) {
      const favoriteIds = favoriteBeers.map((fav) => fav.id);
      const favorites = beers.filter((beer) => favoriteIds.includes(beer.id));
      setFavBeers(favorites);
    }
  }, [currentUser, beers, favoriteBeers]);

  return (
    <div>
      <div className="my-beers-grid">
        {favBeers
          ? favBeers.map((beer) => (
              <OneBeer key={beer.id} beer={beer} currentUser={currentUser} />
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  favoriteBeers: selectFavoriteBeersItems(state),
  beers: selectBeersItems(state),
});

export default connect(mapStateToProps)(MyBeers);
