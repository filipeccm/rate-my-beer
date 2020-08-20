import React, { useEffect } from 'react';
import './SignIn.css';

import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';

const SignIn = () => {
  return (
    <div className="sign-in">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
