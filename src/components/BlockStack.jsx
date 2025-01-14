import React, { useState } from 'react';
import Block from './Block';
import './BlockStack.css';

const BlockStack = ({ 
  count,
  maxBlocks = 10,
  position,
  mode,
  onBlockCountChange,
  className
}) => {
  return (
    <div className={`block-stack ${className}`}>
      <div className="blocks-wrapper">
        <div className="blocks-container">
          {mode === 'drawCompare' && count > 0 && (
            <div 
              className="comparison-dot top"
              data-position="top"
              onMouseDown={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const event = new CustomEvent('startLine', {
                  detail: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    position: 'top'
                  },
                  bubbles: true
                });
                e.currentTarget.dispatchEvent(event);
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const event = new CustomEvent('endLine', {
                  detail: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    position: 'top'
                  },
                  bubbles: true
                });
                e.currentTarget.dispatchEvent(event);
              }}
            />
          )}
          {Array(count).fill(null).map((_, index) => (
            <Block key={index} />
          ))}
          {mode === 'drawCompare' && count > 0 && (
            <div 
              className="comparison-dot bottom"
              data-position="bottom"
              onMouseDown={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const event = new CustomEvent('startLine', {
                  detail: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    position: 'bottom'
                  },
                  bubbles: true
                });
                e.currentTarget.dispatchEvent(event);
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const event = new CustomEvent('endLine', {
                  detail: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    position: 'bottom'
                  },
                  bubbles: true
                });
                e.currentTarget.dispatchEvent(event);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockStack;