import React, { useState } from 'react';
import Block from './Block';
import './BlockStack.css';
import ValueDisplay from './ValueDisplay';

const BlockStack = ({ 
  count,
  maxBlocks = 10,
  position,
  mode,
  onBlockCountChange,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleAddBlockClick = (e) => {
    e.stopPropagation();
    if (mode === 'addRemove' && count < maxBlocks) {
      onBlockCountChange(count + 1);
    }
  };

  const handleBlockDragStart = (e, index) => {
    if (mode !== 'addRemove') return;
    setIsDragging(true);
  };

  const handleBlockDragEnd = (e, index) => {
    if (!isDragging) return;
    setIsDragging(false);
    onBlockCountChange(count - 1);
  };

  const handleDotMouseDown = (e, position) => {
    if (mode !== 'drawCompare') return;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const event = new CustomEvent('startLine', {
      detail: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        position
      },
      bubbles: true
    });
    e.currentTarget.dispatchEvent(event);
  };

  const handleDotMouseUp = (e, position) => {
    if (mode !== 'drawCompare') return;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const event = new CustomEvent('endLine', {
      detail: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        position
      },
      bubbles: true
    });
    e.currentTarget.dispatchEvent(event);
  };

  return (
    <div className={`block-stack ${className}`}>
      <div className="blocks-wrapper">
        {mode === 'addRemove' && count < maxBlocks && (
          <div 
            className="add-block-hint clickable"
            onClick={handleAddBlockClick}
          >
            Click here to add a block
          </div>
        )}
        <div className="blocks-container">
          {mode === 'drawCompare' && count > 0 && (
            <div 
              className="comparison-dot top"
              data-position="top"
              onMouseDown={(e) => handleDotMouseDown(e, 'top')}
              onMouseUp={(e) => handleDotMouseUp(e, 'top')}
              onMouseEnter={(e) => handleDotMouseUp(e, 'top')}
            />
          )}
          {Array(count).fill(null).map((_, index) => (
            <div
              key={index}
              className="block-wrapper"
              draggable={mode === 'addRemove'}
              onDragStart={(e) => handleBlockDragStart(e, index)}
              onDragEnd={(e) => handleBlockDragEnd(e, index)}
            >
              <Block />
            </div>
          ))}
          {mode === 'drawCompare' && count > 0 && (
            <div 
              className="comparison-dot bottom"
              data-position="bottom"
              onMouseDown={(e) => handleDotMouseDown(e, 'bottom')}
              onMouseUp={(e) => handleDotMouseUp(e, 'bottom')}
              onMouseEnter={(e) => handleDotMouseUp(e, 'bottom')}
            />
          )}
        </div>
        {mode === 'addRemove' && count > 0 && (
          <div className="remove-block-hint">
            Drag blocks away to remove them
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockStack;