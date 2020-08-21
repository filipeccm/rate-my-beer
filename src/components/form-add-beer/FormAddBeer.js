import React, { useState } from 'react';
import './FormAddBeer.css';

import FormInput from '../form-input/FormInput';
import { FaCheck } from 'react-icons/fa';
import { ReactComponent as BeerIcon } from '../../images/form-icon.svg';

import { firestore } from '../../firebase/firebase.utils';

const FormAddBeer = () => {
  const [data, setData] = useState({
    name: '',
    origin: '',
    imageUrl: '',
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const beersRef = firestore.collection('beers');
    try {
      setIsSubmiting(true);
      await beersRef.add({
        ...data,
        averageRating: 0,
        numberOfRatings: 0,
        ratingTotal: 0,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setData({ name: '', imageUrl: '', origin: '' });
      setIsSubmiting(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-image">
          <svg
            className="shape"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFB941"
              d="M34.8,-25.6C47.1,-22.5,60.4,-11.3,63.9,3.5C67.4,18.3,61.2,36.6,48.9,52.1C36.6,67.6,18.3,80.3,-2,82.3C-22.4,84.4,-44.8,75.8,-60.3,60.3C-75.7,44.8,-84.3,22.4,-76.8,7.5C-69.3,-7.4,-45.7,-14.8,-30.2,-17.8C-14.8,-20.8,-7.4,-19.5,1.9,-21.4C11.3,-23.4,22.5,-28.6,34.8,-25.6Z"
              transform="translate(100 100)"
            />
          </svg>
          <BeerIcon className="beer-icon" />
        </div>
        <h2>Add your beers</h2>
        <FormInput
          name="name"
          label="name"
          value={data.name}
          handleChange={handleChange}
        />
        <FormInput
          name="imageUrl"
          label="Image URL"
          value={data.imageUrl}
          handleChange={handleChange}
        />
        <FormInput
          name="origin"
          label="origin"
          value={data.origin}
          handleChange={handleChange}
        />
        {/* <div className="radio-buttons">
          <label>Rating</label>
          <Stars handleChange={handleChange} form={true} />
        </div> */}
        <div className="send-button-container">
          {isSubmiting ? (
            <div>Loading</div>
          ) : (
            <button
              className={
                success ? 'send-button submit-successful' : 'send-button'
              }
              type="submit"
            >
              {success ? <FaCheck /> : 'SUBMIT'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormAddBeer;
