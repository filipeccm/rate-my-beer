import React, { useState, useEffect } from 'react';
import './Stars.css';

import { FaStar } from 'react-icons/fa';

import { rateThisBeer, firestore } from '../../firebase/firebase.utils';

import FormInput from '../form-input/FormInput';

const Stars = ({ handleChange, beerId, currentUser, form }) => {
  const [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.id;
      const ratingsRef = firestore.doc(`ratings/${beerId}`);

      ratingsRef.get().then((doc) => {
        const obj = { ...doc.data() };
        if (obj.hasOwnProperty(userId) === true) {
          setStars(obj[userId]);
        }
      });
    }
  }, [beerId, currentUser]);

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
            onClick={() =>
              form
                ? setStars(i)
                : rateThisBeer(beerId, currentUser, i) && setStars(i)
            }
          />
          <FaStar
            color={i <= (hover || stars) ? 'orange' : 'gray'}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      ))}
    </div>
  );
};

export default Stars;
