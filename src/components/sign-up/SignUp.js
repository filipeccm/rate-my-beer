import React, { useState } from 'react';
import './SignUp.css';

import FormInput from '../form-input/FormInput';
import { ReactComponent as SignInIcon } from '../../images/sign-in-icon.svg';

import { createUserProfileDocument, auth } from '../../firebase/firebase.utils';

const FormAddBeer = () => {
  const [newUserData, setNewUserData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    createdAt: '',
  });

  const { displayName, email, password, confirmPassword } = newUserData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });

      setNewUserData({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-image">
          <svg
            className="sign-up-shape"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#79E083"
              d="M36.9,-29.1C47,-26.8,53.9,-13.4,55.2,1.3C56.4,16,52.2,32,42.1,40.4C32,48.8,16,49.6,-0.2,49.8C-16.4,50,-32.9,49.7,-48.5,41.3C-64,32.9,-78.7,16.4,-81.8,-3.1C-84.9,-22.7,-76.4,-45.3,-60.9,-47.6C-45.3,-49.9,-22.7,-31.9,-4.6,-27.2C13.4,-22.6,26.8,-31.4,36.9,-29.1Z"
              transform="translate(100 100)"
            />
          </svg>
          <SignInIcon className="sign-up-icon" />
        </div>
        <h2>Create a new account</h2>
        <FormInput
          name="displayName"
          label="Display name"
          value={displayName}
          handleChange={handleChange}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={email}
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={password}
          handleChange={handleChange}
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
        />
        <div className="send-button-container">
          <button className="send-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddBeer;
