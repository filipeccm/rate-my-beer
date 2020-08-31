import React from 'react';
import { connect } from 'react-redux';
import './Beers.css';

import OneBeer from './OneBeer';

import { fetchBeersStartAsync } from '../../redux/beers/beers.actions';
import { selectBeersItems } from '../../redux/beers/beers.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Beers = ({ currentUser, beers }) => {
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

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  beers: selectBeersItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBeersStartAsync: () => dispatch(fetchBeersStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
