import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './components/header/Header';
import SignIn from './components/sign-in/SignIn';
import Beers from './components/beers-section/Beers';
import MyBeers from './components/my-beers/MyBeers';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import FormAddBeer from './components/form-add-beer/FormAddBeer';
import {
  BrowserRouter as Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import BeerPopup from './components/beer-popup/BeerPopup';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  let location = useLocation();

  let background = location.state && location.state.background;

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
      <Header currentUser={currentUser} />
      <main className="app-body">
        <Switch location={background || location}>
          <Route
            exact
            path="/"
            render={() => <Beers currentUser={currentUser} />}
          />
          {/* <FormAddBeer currentUser={currentUser} /> */}
          <Route
            exact
            path="/my-beers"
            render={() =>
              currentUser ? (
                <MyBeers currentUser={currentUser} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
          />
          <Route
            exact
            path="/sign-in"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignIn currentUser={currentUser} />
              )
            }
          />
        </Switch>
        {background && <Route path="/beers/:id" children={<BeerPopup />} />}
      </main>
    </div>
  );
};

export default App;
