import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ 
  currentMode,
  onModeChange,
  leftCount,
  rightCount,
  onCountChange,
  canPlayAnimation,
  onPlayAnimation
}) => {
  const handleCountChange = (side, value) => {
    // Only allow changes in addRemove mode
    if (currentMode !== 'addRemove') return;

    const numValue = parseInt(value) || 0;
    const boundedValue = Math.min(10, Math.max(0, numValue));
    onCountChange(side, boundedValue);
  };

  return (
    <div className="control-panel">
      <div className="control-section">
        <div className="count-inputs">
          <div className="input-group">
            <label>Left Stack:</label>
            <input
              type="number"
              min="0"
              max="10"
              value={leftCount}
              onChange={(e) => handleCountChange('left', e.target.value)}
              disabled={currentMode !== 'addRemove'}
            />
          </div>
          <div className="input-group">
            <label>Right Stack:</label>
            <input
              type="number"
              min="0"
              max="10"
              value={rightCount}
              onChange={(e) => handleCountChange('right', e.target.value)}
              disabled={currentMode !== 'addRemove'}
            />
          </div>
        </div>
      </div>

      <div className="control-section">
        <div className="mode-selector">
          <label>Mode:</label>
          <select 
            value={currentMode} 
            onChange={(e) => onModeChange(e.target.value)}
          >
            <option value="none">View Only</option>
            <option value="addRemove">Add/Remove Blocks</option>
            <option value="drawCompare">Draw Comparison</option>
          </select>
        </div>
      </div>

      <div className="control-section">
        <button 
          className={`animate-button ${!canPlayAnimation ? 'disabled' : ''}`}
          onClick={onPlayAnimation}
          disabled={!canPlayAnimation}
        >
          Play Animation
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
