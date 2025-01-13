import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ showComparison, setShowComparison }) => {
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
    </div>
  );
};

export default ControlPanel;
