import React from 'react';
import './EmptyStateGuide.css';

const EmptyStateGuide = () => {
  return (
    <div className="empty-state-guide">
      <div className="guide-arrow left"></div>
      <div className="guide-arrow right"></div>
      <div className="guide-text">Click + to add blocks</div>
    </div>
  );
};

export default EmptyStateGuide;
