import React, { useState, useEffect } from 'react';
import './FormAddBeer.css';

import FormInput from '../form-input/FormInput';
import Stars from '../stars/Stars';
import { FaStar } from 'react-icons/fa';

import { firestore, rateThisBeer } from '../../firebase/firebase.utils';

const FormAddBeer = ({ currentUser }) => {
  const [data, setData] = useState({
    name: '',
    rating: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, rating } = data;

    const beersRef = firestore.collection('beers');
    try {
      beersRef
        .add({
          name,
          averageRating: 0,
          numberOfRatings: 0,
          ratingTotal: 0,
        })
        .then((newBeer) => {
          const ratingRef = firestore.doc(`ratings/${newBeer.id}`);

          ratingRef.set({
            [currentUser.id]: rating,
          });
        });

      setData({ name: '', rating: null });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'rating') {
      setData({
        ...data,
        [name]: Number(value),
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const radios = [1, 2, 3, 4, 5];

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        name="name"
        label="name"
        value={data.name}
        handleChange={handleChange}
      />
      <div className="radio-buttons">
        <label>Rating</label>
        <Stars handleChange={handleChange} form={true} />
      </div>
      <button type="submit">Add Beer</button>
    </form>
  );
};

export default FormAddBeer;
