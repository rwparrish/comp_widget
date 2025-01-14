import React, { useState } from 'react';
import BlockStack from './components/BlockStack';
import CompLine from './components/CompLine';
import Comparator from './components/Comparator';
import ControlPanel from './components/ControlPanel';
import EmptyStateGuide from './components/EmptyStateGuide';
import './App.css';

function App() {
  const [currentMode, setCurrentMode] = useState('none');
  const [leftStackCount, setLeftStackCount] = useState(0);
  const [rightStackCount, setRightStackCount] = useState(0);
  const [animatingComparison, setAnimatingComparison] = useState(false);

  const handleCountChange = (side, newCount) => {
    if (side === 'left') {
      setLeftStackCount(newCount);
    } else {
      setRightStackCount(newCount);
    }
  };

  const handlePlayAnimation = () => {
    setAnimatingComparison(true);
  };

  return (
    <div className="app">
      <div className="block-stacks-container">
        <BlockStack 
          className="left-stack"
          count={leftStackCount}
          position="left"
          mode={currentMode}
          onBlockCountChange={(count) => handleCountChange('left', count)}
        />
        <BlockStack 
          className="right-stack"
          count={rightStackCount}
          position="right"
          mode={currentMode}
          onBlockCountChange={(count) => handleCountChange('right', count)}
        />
        <CompLine 
          mode={currentMode}
        />
        {leftStackCount === 0 && rightStackCount === 0 && <EmptyStateGuide />}
      </div>
      <ControlPanel 
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        leftCount={leftStackCount}
        rightCount={rightStackCount}
        onCountChange={handleCountChange}
        canPlayAnimation={false}
        onPlayAnimation={handlePlayAnimation}
      />
    </div>
  );
}

export default App;
