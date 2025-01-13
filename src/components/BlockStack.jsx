import React, { useState } from 'react';
import Block from './Block';
import './BlockStack.css';

const BlockStack = ({ 
  count,
  maxBlocks = 10,
  position,
  mode,
  onBlockCountChange,
  onLineStart,
  onLineEnd,
  className
}) => {
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [dragStartY, setDragStartY] = useState(null);
  const [highlightedForComparison, setHighlightedForComparison] = useState(false);

  const handleMouseDown = (e) => {
    if (mode !== 'addRemove' || count === 0) return;
    
    const stackRect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - stackRect.top;
    
    // Only start drag if clicking in the blocks area
    const blocksContainer = e.currentTarget.querySelector('.blocks-container');
    const blocksRect = blocksContainer.getBoundingClientRect();
    
    if (clickY >= blocksRect.top - stackRect.top) {
      setIsBeingDragged(true);
      setDragStartY(e.clientY);
      e.preventDefault(); // Prevent text selection
    }
  };

  const handleMouseMove = (e) => {
    if (!isBeingDragged || !dragStartY) return;

    const dragDistance = e.clientY - dragStartY;
    
    // If dragged down more than 50px, remove a block
    if (dragDistance > 50) {
      onBlockCountChange(Math.max(0, count - 1));
      setDragStartY(e.clientY);
    }
  };

  const handleMouseUp = (e) => {
    if (isBeingDragged) {
      setIsBeingDragged(false);
      setDragStartY(null);
    } else if (mode === 'addRemove') {
      // Handle click to add block
      const stackRect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - stackRect.top;
      const topBlockY = count > 0 
        ? e.currentTarget.querySelector('.blocks-container').getBoundingClientRect().top - stackRect.top 
        : stackRect.height;

      if (clickY < topBlockY && count < maxBlocks) {
        onBlockCountChange(count + 1);
      }
    }
  };

  const handleLineInteraction = (e, type) => {
    if (mode !== 'drawCompare') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const point = {
      x: rect.left + rect.width / 2,
      y: e.clientY
    };

    if (type === 'start') {
      setHighlightedForComparison(true);
      onLineStart?.(point);
    } else {
      setHighlightedForComparison(false);
      onLineEnd?.(point);
    }
  };

  return (
    <div 
      className={`block-stack ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsBeingDragged(false);
        setDragStartY(null);
        setHighlightedForComparison(false);
      }}
      onMouseEnter={(e) => mode === 'drawCompare' && handleLineInteraction(e, 'end')}
    >
      <div className="blocks-wrapper">
        <div className="blocks-container">
          {mode === 'drawCompare' && count > 0 && (
            <div className="comparison-dot top" />
          )}
          {Array(count).fill(null).map((_, index) => (
            <Block key={index} />
          ))}
          {mode === 'drawCompare' && count > 0 && (
            <div className="comparison-dot bottom" />
          )}
        </div>
      </div>
      {mode === 'addRemove' && count < maxBlocks && (
        <div className="add-indicator" />
      )}
      {isBeingDragged && (
        <div className="drag-indicator">
          Drag down to remove block
        </div>
      )}
    </div>
  );
};

export default BlockStack;