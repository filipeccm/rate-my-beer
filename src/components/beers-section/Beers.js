import React from "react";
import { connect } from "react-redux";
import "./Beers.css";

import OneBeer from "./OneBeer";

import { selectBeersItems } from "../../redux/beers/beers.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Beers = ({ currentUser, beers }) => {
  return (
    <div>
      <div className="beers-grid">
        {beers?.length && (
          <>
            {beers.map((beer, idx) => (
              <OneBeer key={idx} beer={beer} currentUser={currentUser} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  beers: selectBeersItems(state),
});

export default connect(mapStateToProps)(Beers);
