import React, { useState } from "react";
import "./Stars.css";
import { connect } from "react-redux";
import { FaStar } from "react-icons/fa";
import FormInput from "../form-input/FormInput";
import { fetchOneBeerRating, rateBeer } from "../../api/api.utils";
import { updateBeer } from "../../redux/beers/beers.actions";

const Stars = ({
  handleChange,
  beerId,
  currentUser,
  form,
  beer,
  updateBeer,
}) => {
  const [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = async (i) => {
    if (form) {
      return setStars(i);
    }
    const res = await rateBeer(beerId, currentUser, i);

    if (res) {
      const data = await fetchOneBeerRating(beerId);
      setStars(i);
      updateBeer({
        ...beer,
        numberOfRatings: data.number_of_ratings,
        totalRating: data.total_rating,
        averageRating: data.average_rating,
      });
    }
  };

  const radios = [1, 2, 3, 4, 5];
  return (
    <div className="stars-wrapper">
      {radios.map((i) => (
        <label className="stars" key={i}>
          <FormInput
            name="rating"
            type="radio"
            value={i}
            handleChange={handleChange}
            onClick={async () => await handleClick(i)}
          />
          <FaStar
            color={i <= (hover || stars) ? "orange" : "gray"}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateBeer: (beer) => dispatch(updateBeer(beer)),
});

export default connect(null, mapDispatchToProps)(Stars);
