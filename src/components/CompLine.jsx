import React, { useState, useEffect } from 'react';
import './CompLine.css';

const CompLine = ({ 
  startPoint,
  endPoint,
  type = 'student',
  animating = false
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (animating) {
      setAnimationProgress(0);
      const animate = () => {
        setAnimationProgress(prev => {
          if (prev >= 1) return 1;
          return prev + 0.05;
        });
      };

      const intervalId = setInterval(animate, 16); // ~60fps
      return () => clearInterval(intervalId);
    } else {
      setAnimationProgress(1);
    }
  }, [animating]);

  if (!startPoint || !endPoint) return null;

  const getAnimatedPath = () => {
    if (!animating || animationProgress === 1) {
      return {
        x1: startPoint.x,
        y1: startPoint.y,
        x2: endPoint.x,
        y2: endPoint.y
      };
    }

    return {
      x1: startPoint.x,
      y1: startPoint.y,
      x2: startPoint.x + (endPoint.x - startPoint.x) * animationProgress,
      y2: startPoint.y + (endPoint.y - startPoint.y) * animationProgress
    };
  };

  const snapToGrid = (point) => {
    // Snap to 45-degree angles if close enough
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const snapThreshold = 15; // degrees

    for (let snapAngle = -180; snapAngle <= 180; snapAngle += 45) {
      if (Math.abs(angle - snapAngle) < snapThreshold) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        const snappedX = startPoint.x + distance * Math.cos(snapAngle * (Math.PI / 180));
        const snappedY = startPoint.y + distance * Math.sin(snapAngle * (Math.PI / 180));
        return { x: snappedX, y: snappedY };
      }
    }

    return point;
  };

  const path = getAnimatedPath();
  const snappedEndPoint = type === 'student' ? snapToGrid(endPoint) : endPoint;

  return (
    <svg className="comp-line">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <line
        {...path}
        className={`line ${type} ${animating ? 'animating' : ''}`}
        style={{
          '--progress': animationProgress
        }}
      />
      
      {type === 'student' && (
        <>
          <circle 
            cx={path.x1} 
            cy={path.y1} 
            r="4" 
            className="endpoint start"
          />
          <circle 
            cx={path.x2} 
            cy={path.y2} 
            r="4" 
            className="endpoint end"
          />
        </>
      )}
    </svg>
  );
};

export default CompLine;
