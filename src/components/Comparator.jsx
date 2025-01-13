import React, { useState, useEffect } from 'react';
import './Comparator.css';

const Comparator = () => {
  const [comparison, setComparison] = useState('=');

  useEffect(() => {
    const updateComparison = () => {
      const stacks = document.querySelectorAll('.block-stack');
      const leftStack = stacks[0];
      const rightStack = stacks[1];

      const leftBlocks = leftStack.querySelectorAll('.block-container');
      const rightBlocks = rightStack.querySelectorAll('.block-container');

      if (leftBlocks.length > rightBlocks.length) {
        setComparison('>');
      } else if (leftBlocks.length < rightBlocks.length) {
        setComparison('<');
      } else {
        setComparison('=');
      }
    };

    updateComparison();

    const observer = new MutationObserver(updateComparison);
    
    document.querySelectorAll('.block-stack').forEach(stack => {
      observer.observe(stack, { 
        childList: true,
        subtree: true 
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="comparator">
      {comparison}
    </div>
  );
};

export default Comparator;
