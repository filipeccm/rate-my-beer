import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import './App.css';

import Header from './components/header/Header';
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp';
import MyBeers from './components/my-beers/MyBeers';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import FormAddBeer from './components/form-add-beer/FormAddBeer';

import BeerPopup from './components/beer-popup/BeerPopup';
import Beers from './components/beers-section/Beers';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { fetchBeersStartAsync } from './redux/beers/beers.actions';
import { fetchFavoriteBeersIdsStartAsync } from './redux/favorite-beers/favorite-beers.actions';

const App = ({
  currentUser,
  setCurrentUser,
  fetchBeersStartAsync,
  fetchFavoriteBeersIdsStartAsync,
}) => {
  let location = useLocation();

  let background = location.state && location.state.background;

  useEffect(() => {
    fetchBeersStartAsync();
  }, [fetchBeersStartAsync]);

  useEffect(() => {
    if (currentUser) {
      fetchFavoriteBeersIdsStartAsync(currentUser);
    }
  }, [currentUser, fetchFavoriteBeersIdsStartAsync]);

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

  return (
    <div className="App">
      <Header />
      <main className="app-body">
        <Suspense fallback={<div>...</div>}>
          <Switch location={background || location}>
            <Route exact path="/" component={Beers} />
            <Route
              exact
              path="/add-beer"
              render={() =>
                currentUser ? <FormAddBeer /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/my-beers"
              render={() =>
                currentUser ? <MyBeers /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInSignUp />
              }
            />
          </Switch>
          {background && <Route path="/beers/:id" children={<BeerPopup />} />}
        </Suspense>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchBeersStartAsync: () => dispatch(fetchBeersStartAsync()),
  fetchFavoriteBeersIdsStartAsync: (currentUser) =>
    dispatch(fetchFavoriteBeersIdsStartAsync(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
