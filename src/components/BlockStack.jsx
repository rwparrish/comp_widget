import React from 'react';
import Block from './Block';
import './BlockStack.css';

const COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD'
  ];

const BlockStack = ({ position }) => {
  return (
    <div className={`block-stack ${position}-stack`}>
       <div className="blocks-container">
        {COLORS.map((color, index) => (
          <Block key={index} color={color} />
        ))}
      </div>
    </div>
  );
};

export default BlockStack;