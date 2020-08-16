import React from 'react';
import './FormInput.css';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form">
      {label ? <label>{label}</label> : null}
      <input onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
