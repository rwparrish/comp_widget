import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ 
  showComparison, 
  setShowComparison,
  autoDrawLines,
  setAutoDrawLines,
  clearLines
}) => {
  return (
    <div className="control-panel">
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={showComparison}
            onChange={(e) => setShowComparison(e.target.checked)}
          />
          Show Comparison
        </label>
      </div>
      
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={autoDrawLines}
            onChange={(e) => setAutoDrawLines(e.target.checked)}
          />
          Auto-draw Lines
        </label>
      </div>

      <div className="control-group">
        <button 
          className="control-button"
          onClick={clearLines}
        >
          Clear Lines
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
