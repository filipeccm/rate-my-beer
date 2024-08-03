import React, { useRef } from "react";
import "./OneBeer.css";
import { Link, useLocation } from "react-router-dom";
import DisplayStars from "../display-stars/DisplayStars";

const OneBeer = ({ beer }) => {
  const overlayRef = useRef();
  let location = useLocation();

  const hideOverlay = () => {
    overlayRef.current.style.setProperty("opacity", "0");
  };
  const showOverlay = () => {
    overlayRef.current.style.setProperty("opacity", "0.5");
  };

  const averageRating = beer.averageRating;

  return (
    <Link to={`/beers/${beer.id}`} state={{ background: location }}>
      <div className="beer-card">
        <div>
          <img
            src="https://dummyimage.com/225x225/003147/fff"
            alt="placeholder"
          />
        </div>
        <div ref={overlayRef} className="beer-card-overlay"></div>
        <div
          className="beer-card-info"
          onMouseEnter={hideOverlay}
          onMouseLeave={showOverlay}
        >
          <h2>{beer.name}</h2>
          <div className="beer-card-rating">
            <DisplayStars averageRating={averageRating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OneBeer;
