import React, { useEffect, useState } from 'react';
import './App.css';

import SignIn from './components/sign-in/SignIn';
import Beers from './components/beers-section/Beers';
import Star from './components/stars/Stars';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import FormAddBeer from './components/form-add-beer/FormAddBeer';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
      return () => unsubscribeFromAuth();
    });
  }, [setCurrentUser]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="App">
      <SignIn currentUser={currentUser} />
      <Beers currentUser={currentUser} />
      <FormAddBeer currentUser={currentUser} />
    </div>
  );
};

export default App;
