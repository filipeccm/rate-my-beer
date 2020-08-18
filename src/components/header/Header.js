import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {
  return (
    <nav className="nav-bar">
      <Link className="nav-item" to="/">
        Home
      </Link>
      <Link className="nav-item" to="/my-beers">
        My Beers
      </Link>
      {currentUser ? (
        <button className="nav-item" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      ) : (
        <Link className="nav-item" to="/sign-in">
          Sign in
        </Link>
      )}
    </nav>
  );
};

export default Header;
