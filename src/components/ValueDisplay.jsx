import React from 'react';
import './ValueDisplay.css';

const ValueDisplay = ({ value, position }) => {
  return (
    <div className={`value-display ${position}`}>
      {value}
    </div>
  );
};

export default ValueDisplay;
