import React from 'react';
import './Block.css';

const Block = ({ 
  size = 60, 
  color = 'rgba(155, 230, 255, 0.3)',
  isHighlighted = false 
}) => {
  return (
    <div 
      className={`block-container ${isHighlighted ? 'highlighted' : ''}`}
      style={{
        '--block-size': `${size}px`,
        '--block-color': color
      }}
    >
      <div className="block">
        <div className="block-face front" />
        <div className="block-face back" />
        <div className="block-face right" />
        <div className="block-face left" />
        <div className="block-face top" />
        <div className="block-face bottom" />
      </div>
    </div>
  );
};

export default Block;