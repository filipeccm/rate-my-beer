import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./BeerPopup.css";
import DisplayStars from "../display-stars/DisplayStars";
import Stars from "../stars/Stars";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectFavoriteBeersItems } from "../../redux/favorite-beers/favorite-beers.selectors";
import Heart from "../heart/Heart";
import { selectBeersItems } from "../../redux/beers/beers.selectors";

const BeerPopup = ({ currentUser, beers }) => {
  const [beerData, setBeerData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const oneBeer = beers.find((b) => b.id === +id);
    setBeerData(oneBeer);
  }, [beers, id]);

  return (
    <div className="beer-popup-wrapper" onClick={() => navigate(-1)}>
      <div className="beer-popup" onClick={(e) => e.stopPropagation()}>
        {beerData ? (
          <Fragment>
            <div
              className="beer-popup-image"
              style={{
                backgroundImage: `url('https://dummyimage.com/225x225/003147/fff')`,
              }}
            ></div>
            <div className="beer-popup-info">
              <div className="beer-popup-icons">
                <Heart beer={beerData} currentUser={currentUser} />
                <Stars
                  form={false}
                  beerId={id}
                  beer={beerData}
                  currentUser={currentUser}
                />
              </div>
              <h2>{beerData.name}</h2>

              {beerData?.numberOfRatings > 0 && (
                <>
                  <div className="beer-card-rating">
                    <DisplayStars averageRating={beerData?.averageRating} />
                  </div>
                  <p className="beer-card-p">
                    <span>{beerData?.averageRating}</span> out of{" "}
                    <span>{beerData?.numberOfRatings}</span> ratings
                  </p>
                </>
              )}
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  favoriteBeer: selectFavoriteBeersItems(state),
  beers: selectBeersItems(state),
});

export default connect(mapStateToProps)(BeerPopup);
