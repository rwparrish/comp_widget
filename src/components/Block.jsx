import React from 'react';
import './Block.css';

const Block = ({ color = '#FF6B6B' }) => {
  return (
    <div className="block-container">
      <div className="block" style={{'--block-color': color}}>
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

export default Block;