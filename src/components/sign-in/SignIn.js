import React, { useState } from "react";
import "./SignIn.css";
import FormInput from "../form-input/FormInput";
import { ReactComponent as SignUpIcon } from "../../images/tap-icon.svg";
import { signin } from "../../api/api.utils";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const SignIn = ({ setCurrentUser }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
      const res = await signin(email, password);
      setCurrentUser(res);
      setLoginData({ email: "", password: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleUserSubmit}>
        <div className="form-image">
          <svg
            className="sign-in-shape"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#F88933"
              d="M49.1,-42.6C65.6,-32.6,82.3,-16.3,77.9,-4.4C73.6,7.6,48.1,15.1,31.6,23.2C15.1,31.3,7.6,40,-2.6,42.6C-12.8,45.2,-25.5,41.7,-41.5,33.6C-57.6,25.5,-76.9,12.8,-76.8,0C-76.8,-12.7,-57.4,-25.4,-41.4,-35.4C-25.4,-45.4,-12.7,-52.7,1.8,-54.5C16.3,-56.3,32.6,-52.6,49.1,-42.6Z"
              transform="translate(100 100)"
            />
          </svg>
          <SignUpIcon className="sign-in-icon" />
        </div>
        <h2>Login with your account</h2>
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={loginData.email}
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={loginData.password}
          handleChange={handleChange}
        />
        <div className="login-buttons-container">
          <button className="send-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
