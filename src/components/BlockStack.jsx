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

    const blocks = container.getElementsByClassName('block-container');
    if (blocks.length === 0) {
      onBlockAdd(position);
      return;
    }

    const topBlock = blocks[blocks.length - 1];
    const topBlockRect = topBlock.getBoundingClientRect();
    const topBlockY = topBlockRect.top - rect.top;

    if (clickY < topBlockY) {
      onBlockAdd(position);
    }
  };

  const handleBlockRemove = () => {
    onBlockRemove(position);
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
              onDragEnd={handleBlockRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockStack;