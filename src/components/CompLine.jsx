import React, { useState, useEffect } from 'react';
import './CompLine.css';

const CompLine = () => {
  const [dotPositions, setDotPositions] = useState({
    left: { top: null, bottom: null },
    right: { top: null, bottom: null }
  });
  const [showDots, setShowDots] = useState({ left: false, right: false });
  const [activeLine, setActiveLine] = useState(null);
  const [persistentLines, setPersistentLines] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateDotsPosition = () => {
      const stacks = document.querySelectorAll('.block-stack');
      const leftStack = stacks[0];
      const rightStack = stacks[1];

      const leftBlocks = leftStack.querySelectorAll('.block-container');
      const rightBlocks = rightStack.querySelectorAll('.block-container');

      setShowDots({
        left: leftBlocks.length > 0,
        right: rightBlocks.length > 0
      });

      if (leftBlocks.length > 0) {
        const leftTopBlock = leftBlocks[leftBlocks.length - 1];
        const leftBottomBlock = leftBlocks[0];
        setDotPositions(prev => ({
          ...prev,
          left: {
            top: leftTopBlock.getBoundingClientRect().top - 40,
            bottom: leftBottomBlock.getBoundingClientRect().bottom + 40
          }
        }));
      }

      if (rightBlocks.length > 0) {
        const rightTopBlock = rightBlocks[rightBlocks.length - 1];
        const rightBottomBlock = rightBlocks[0];
        setDotPositions(prev => ({
          ...prev,
          right: {
            top: rightTopBlock.getBoundingClientRect().top - 40,
            bottom: rightBottomBlock.getBoundingClientRect().bottom + 40
          }
        }));
      }
    };

    updateDotsPosition();
    const observer = new MutationObserver(updateDotsPosition);
    
    document.querySelectorAll('.block-stack').forEach(stack => {
      observer.observe(stack, { childList: true, subtree: true });
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e, position, type) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const startPoint = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    setIsDragging(true);
    setActiveLine({
      start: startPoint,
      end: { x: e.clientX, y: e.clientY },
      type,
      startSide: position,
      snapped: false
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !activeLine) return;

    const targetSide = activeLine.startSide === 'left' ? 'right' : 'left';
    const dots = document.querySelectorAll('.comp-dot');
    let snapped = false;

    dots.forEach(dot => {
      if (dot.dataset.type === activeLine.type && 
          dot.dataset.side === targetSide) {
        const rect = dot.getBoundingClientRect();
        const dotCenterX = rect.left + rect.width / 2;
        const dotCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - dotCenterX, 2) + 
          Math.pow(e.clientY - dotCenterY, 2)
        );

        if (distance < 30) {
          snapped = true;
          setActiveLine(prev => ({
            ...prev,
            end: { x: dotCenterX, y: dotCenterY },
            snapped: true
          }));
        }
      }
    });

    if (!snapped) {
      setActiveLine(prev => ({
        ...prev,
        end: { x: e.clientX, y: e.clientY },
        snapped: false
      }));
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    
    if (activeLine?.snapped) {
      setPersistentLines(prev => [...prev, {
        start: activeLine.start,
        end: activeLine.end,
        type: activeLine.type
      }]);
    }
    
    setIsDragging(false);
    setActiveLine(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeLine]);

  return (
    <div className="comp-line">
      {/* Left stack dots */}
      {showDots.left && dotPositions.left.top !== null && (
        <>
          <div 
            className="comp-dot"
            data-type="top"
            data-side="left"
            style={{
              left: '33.33%',
              top: dotPositions.left.top,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'left', 'top')}
          />
          <div 
            className="comp-dot"
            data-type="bottom"
            data-side="left"
            style={{
              left: '33.33%',
              top: dotPositions.left.bottom,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'left', 'bottom')}
          />
        </>
      )}

      {/* Right stack dots */}
      {showDots.right && dotPositions.right.top !== null && (
        <>
          <div 
            className="comp-dot"
            data-type="top"
            data-side="right"
            style={{
              right: '33.33%',
              top: dotPositions.right.top,
              transform: 'translate(50%, -50%)'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'right', 'top')}
          />
          <div 
            className="comp-dot"
            data-type="bottom"
            data-side="right"
            style={{
              right: '33.33%',
              top: dotPositions.right.bottom,
              transform: 'translate(50%, -50%)'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'right', 'bottom')}
          />
        </>
      )}

      <svg className="comp-line-svg">
        {persistentLines.map((line, index) => (
          <line
            key={index}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            className="comp-line-path snapped"
          />
        ))}
        
        {activeLine && (
          <line
            x1={activeLine.start.x}
            y1={activeLine.start.y}
            x2={activeLine.end.x}
            y2={activeLine.end.y}
            className={`comp-line-path ${activeLine.snapped ? 'snapped' : ''}`}
          />
        )}
      </svg>
    </div>
  );
};

export default CompLine;
