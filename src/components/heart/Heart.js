import { FaRegHeart, FaHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectFavoriteBeersItems } from "../../redux/favorite-beers/favorite-beers.selectors";
import { connect } from "react-redux";
import {
  addFavoriteBeer,
  removeFavoriteBeer,
} from "../../redux/favorite-beers/favorite-beers.actions";

const Heart = ({
  beer,
  currentUser,
  favoriteBeer,
  addFavoriteBeer,
  removeFavoriteBeer,
}) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const favoritedBeer = favoriteBeer.find((x) => x.id === beer.id);
      if (favoritedBeer) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [beer.id, favoriteBeer, currentUser]);
  return (
    <>
      {favorite ? (
        <FaHeart
          className="favorite-button favorited"
          onClick={() => {
            removeFavoriteBeer(beer.id, currentUser);
          }}
        />
      ) : (
        <FaRegHeart
          className="favorite-button"
          onClick={() => {
            addFavoriteBeer(beer, currentUser);
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  favoriteBeer: selectFavoriteBeersItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addFavoriteBeer: (beer, currentUser) =>
    dispatch(addFavoriteBeer(beer, currentUser)),
  removeFavoriteBeer: (beerId, currentUser) =>
    dispatch(removeFavoriteBeer(beerId, currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Heart);
