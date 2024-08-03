import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import SignInSignUp from "./pages/sign-in-sign-up/SignInSignUp";
import MyBeers from "./components/my-beers/MyBeers";
import FormAddBeer from "./components/form-add-beer/FormAddBeer";
import BeerPopup from "./components/beer-popup/BeerPopup";
import Beers from "./components/beers-section/Beers";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { fetchBeersStartAsync } from "./redux/beers/beers.actions";
import { fetchFavoriteBeersIdsStartAsync } from "./redux/favorite-beers/favorite-beers.actions";

const App = ({
  currentUser,
  fetchBeersStartAsync,
  fetchFavoriteBeersIdsStartAsync,
}) => {
  const location = useLocation();

  const locationState = location.state;

  useEffect(() => {
    fetchBeersStartAsync();
  }, [fetchBeersStartAsync]);

  useEffect(() => {
    if (currentUser) {
      fetchFavoriteBeersIdsStartAsync(currentUser);
    }
  }, [currentUser, fetchFavoriteBeersIdsStartAsync]);

  return (
    <div className="App">
      <Header />
      <main className="app-body">
        <Suspense fallback={<div>...</div>}>
          <Routes location={locationState?.background || location}>
            <Route exact path="/" element={<Beers />} />
            <Route
              exact
              path="/add-beer"
              element={currentUser ? <FormAddBeer /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/my-beers"
              element={currentUser ? <MyBeers /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={currentUser ? <Navigate to="/" /> : <SignInSignUp />}
            />
          </Routes>
          {locationState?.background && (
            <Routes>
              <Route path="/beers/:id" element={<BeerPopup />} />
            </Routes>
          )}
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
