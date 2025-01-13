import React from 'react';
import './BlockStack.css';

const BlockStack = ({ position }) => {
  return (
    <div className={`block-stack ${position}-stack`}>
        BLOCK STACK
      {/* Block stack content will go here */}
    </div>
  );
};

export default BlockStack;