import React from "react";
import { connect } from "react-redux";

import "./Header.css";

import { FaHeart, FaUserCheck, FaUser, FaPlusCircle } from "react-icons/fa";
import { ReactComponent as Logo } from "../../images/rate-my-beer-logo.svg";

import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/user.actions";

const Header = ({ currentUser, setCurrentUser }) => {
  return (
    <nav className="nav-bar">
      <Link className="nav-item" to="/">
        <Logo />
      </Link>
      <Link className="nav-item" to="/my-beers">
        <FaHeart />
        <span className="nav-item-desc">Favorite beers</span>
      </Link>
      <Link className="nav-item" to="/add-beer">
        <FaPlusCircle />
        <span className="nav-item-desc">Add beer</span>
      </Link>
      {currentUser ? (
        <div className="nav-item" onClick={() => setCurrentUser(undefined)}>
          <FaUserCheck />
          <span className="nav-item-desc">Logout</span>
        </div>
      ) : (
        <Link className="nav-item" to="/login">
          <FaUser />
          <span className="nav-item-desc">Login</span>
        </Link>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
