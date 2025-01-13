import React, { useState } from 'react';
import BlockStack from './components/BlockStack';
import ValueDisplay from './components/ValueDisplay';
import './App.css';
import CompLine from './components/CompLine';
import Comparator from './components/Comparator';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [showComparison, setShowComparison] = useState(true)

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
      <ControlPanel 
        showComparison={showComparison}
        setShowComparison={setShowComparison}
      />
      <div className="stacks-container">
        <BlockStack 
          position="left" 
          blockCount={leftCount}
          onBlockAdd={handleStackClick}
          onBlockRemove={handleBlockRemove}
        />
        {showComparison && <Comparator />}
        <BlockStack 
          position="right" 
          blockCount={rightCount}
          onBlockAdd={handleStackClick}
          onBlockRemove={handleBlockRemove}
        />
        <ValueDisplay value={leftCount} position="left" />
        <ValueDisplay value={rightCount} position="right" />
        <CompLine />
      </div>
    </div>
  );
}

export default App;
