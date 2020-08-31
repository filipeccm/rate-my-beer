import React, { useRef } from 'react';
import './OneBeer.css';

import { Link, useLocation } from 'react-router-dom';

import DisplayStars from '../display-stars/DisplayStars';

const OneBeer = ({
  beer: { name, averageRating, numberOfRatings, imageUrl, id },
}) => {
  const overlayRef = useRef();
  let location = useLocation();

  const hideOverlay = () => {
    overlayRef.current.style.setProperty('opacity', '0');
  };
  const showOverlay = () => {
    overlayRef.current.style.setProperty('opacity', '0.5');
  };

  return (
    <Link
      to={{
        pathname: `/beers/${id}`,
        state: { background: location },
      }}
    >
      <div
        className="beer-card"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : `url('https://dummyimage.com/225x225/003147/fff'})`,
        }}
      >
        <div ref={overlayRef} className="beer-card-overlay"></div>
        <div
          className="beer-card-info"
          onMouseEnter={hideOverlay}
          onMouseLeave={showOverlay}
        >
          <h2>{name}</h2>
          <div className="beer-card-rating">
            <DisplayStars averageRating={averageRating} />
          </div>
          <p>
            <span>{averageRating}</span> out of <span>{numberOfRatings}</span>{' '}
            ratings
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OneBeer;
