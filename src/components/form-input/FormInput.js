import React from 'react';
import './FormInput.css';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form-input">
      {label ? <label>{label}</label> : null}
      <input onChange={handleChange} {...otherProps} required />
    </div>
  );
};

export default FormInput;
