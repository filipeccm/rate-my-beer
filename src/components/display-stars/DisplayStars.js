import React, { useEffect, useRef } from 'react';
import './DisplayStars.css';

import { FaStar } from 'react-icons/fa';

const DisplayStars = ({ averageRating }) => {
  const maskRef = useRef();

  const nums = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (averageRating >= 0) {
      const avg = averageRating / 5;
      maskRef.current.style.setProperty(
        'width',
        `calc((1em * 4 + 0.8em) * ${avg})`
      );
    }
  }, [averageRating]);

  return (
    <div className="display-stars-container">
      <div className="display-stars">
        <div className="stars-container">
          {nums.map((num) => (
            <FaStar key={num} color={'gray'} className="empty-stars" />
          ))}
        </div>
        <div ref={maskRef} className="mask">
          <div className="mask-container">
            {nums.map((num) => (
              <FaStar key={num} color={'#f88a32'} className="mask-stars" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayStars;
