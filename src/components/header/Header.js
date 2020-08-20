import React from 'react';
import './Header.css';
import { FaHeart, FaUserCheck, FaUser, FaPlusCircle } from 'react-icons/fa';
import { ReactComponent as Logo } from '../../images/rate-my-beer-logo.svg';

import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {
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
        <div className="nav-item" onClick={() => auth.signOut()}>
          <FaUserCheck />
          <span className="nav-item-desc">Logout</span>
        </div>
      ) : (
        <Link className="nav-item" to="/sign-in">
          <FaUser />
          <span className="nav-item-desc">Login</span>
        </Link>
      )}
    </nav>
  );
};

export default Header;
