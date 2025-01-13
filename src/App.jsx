import React, { useState } from 'react';
import BlockStack from './components/BlockStack';
import './App.css';

function App() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const handleBlockAdd = (position) => {
    if (position === 'left' && leftCount < 10) {
      setLeftCount(prev => prev + 1);
    } else if (position === 'right' && rightCount < 10) {
      setRightCount(prev => prev + 1);
    }
  };

  const handleBlockRemove = (position) => {
    if (position === 'left' && leftCount > 0) {
      setLeftCount(prev => prev - 1);
    } else if (position === 'right' && rightCount > 0) {
      setRightCount(prev => prev - 1);
    }
  };

  const handleStackClick = (position) => {
    handleBlockAdd(position);
  };

  return (
    <div className="app">
      <div className="stacks-container">
        <BlockStack 
          position="left" 
          blockCount={leftCount}
          onBlockAdd={handleStackClick}
          onBlockRemove={handleBlockRemove}
        />
        <BlockStack 
          position="right" 
          blockCount={rightCount}
          onBlockAdd={handleStackClick}
          onBlockRemove={handleBlockRemove}
        />
      </div>
    </div>
  );
}

export default App;
