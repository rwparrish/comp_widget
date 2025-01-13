import React from 'react';
import './Block.css';

const Block = ({ color, onDragEnd }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', '');
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    
    // Get the current mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Get the stack container boundaries
    const stackElement = e.target.closest('.block-stack');
    if (!stackElement) return;
    
    const stackRect = stackElement.getBoundingClientRect();
    
    // Check if the block was dropped outside the stack
    const isOutside = 
      mouseX < stackRect.left ||
      mouseX > stackRect.right ||
      mouseY < stackRect.top ||
      mouseY > stackRect.bottom;
    
    if (isOutside) {
      onDragEnd(e);
    }
  };

  return (
    <div 
      className="block-container"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="block">
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