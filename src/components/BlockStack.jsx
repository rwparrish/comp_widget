import React, { useRef } from 'react';
import Block from './Block';
import './BlockStack.css';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B9B9B', '#588C7E', '#FFD93D', '#FF6F69'
];

const BlockStack = ({ position, blockCount, onBlockAdd, onBlockRemove }) => {
  const containerRef = useRef(null);

  const handleClick = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    // Get all blocks
    const blocks = container.getElementsByClassName('block-container');
    if (blocks.length === 0) {
      // If no blocks, allow click anywhere in container
      onBlockAdd(position);
      return;
    }

    // Get the topmost block's position
    const topBlock = blocks[blocks.length - 1];
    const topBlockRect = topBlock.getBoundingClientRect();
    const topBlockY = topBlockRect.top - rect.top;

    // If click is above the topmost block, add new block
    if (clickY < topBlockY) {
      onBlockAdd(position);
    }
  };

  const handleDragEnd = (index, e) => {
    const stackElement = e.target.closest('.block-stack');
    if (!stackElement) {
      onBlockRemove(position);
    }
  };

  return (
    <div className={`block-stack ${position}-stack`}>
      <div 
        ref={containerRef}
        className="blocks-container"
        onClick={handleClick}
      >
        <div className="blocks-wrapper">
          {Array.from({ length: blockCount }).map((_, index) => (
            <Block 
              key={index} 
              color={COLORS[index]}
              onDragEnd={(e) => handleDragEnd(index, e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockStack;