import React, { useState, useEffect } from 'react';
import BlockStack from './components/BlockStack';
import CompLine from './components/CompLine';
import ControlPanel from './components/ControlPanel';
import ValueDisplay from './components/ValueDisplay';
import './App.css';

function App() {
  const [currentMode, setCurrentMode] = useState('none');
  const [leftStackCount, setLeftStackCount] = useState(0);
  const [rightStackCount, setRightStackCount] = useState(0);
  const [animatingComparison, setAnimatingComparison] = useState(false);
  const [comparisonLines, setComparisonLines] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    if (currentMode !== 'none') {
      setShowPrompt(false);
    }
  }, [currentMode]);

  console.log("hello")

  const handleCountChange = (side, newCount) => {
    if (side === 'left') {
      setLeftStackCount(newCount);
    } else {
      setRightStackCount(newCount);
    }
  };

  const handlePlayAnimation = () => {
    setAnimatingComparison(true);
    setTimeout(() => {
      setAnimatingComparison(false);
    }, 2000);
  };

  // Check if we have both top and bottom lines
  const hasCompletePair = comparisonLines.length === 2 && 
    comparisonLines.some(line => line.position === 'top') &&
    comparisonLines.some(line => line.position === 'bottom');

  return (
    <div className="app">
      {currentMode === 'none' && showPrompt && (
        <div className="mode-prompt">
          Please select a mode from the control panel to begin
        </div>
      )}
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
          leftCount={leftStackCount}
          rightCount={rightStackCount}
          isAnimating={animatingComparison}
          onLinesChange={setComparisonLines}
          lines={comparisonLines}
        />
      </div>
      <div className="values-container">
        <div className="value-left">
          <ValueDisplay value={leftStackCount} />
        </div>
        <div className="value-right">
          <ValueDisplay value={rightStackCount} />
        </div>
      </div>
      <ControlPanel 
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        leftCount={leftStackCount}
        rightCount={rightStackCount}
        onCountChange={handleCountChange}
        canPlayAnimation={hasCompletePair}
        onPlayAnimation={handlePlayAnimation}
      />
    </div>
  );
}

export default App;
