import React from 'react';
import './SignIn.css';

import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';

const SignIn = ({ currentUser }) => {
  return (
    <div className="sign-in">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      {currentUser ? (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      ) : null}
    </div>
  );
};

export default SignIn;
