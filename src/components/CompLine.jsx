import React, { useState, useEffect } from 'react';
import './CompLine.css';

const CompLine = ({ 
  mode, 
  leftCount, 
  rightCount, 
  isAnimating,
  lines,
  onLinesChange 
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [dotPosition, setDotPosition] = useState(null);
  const [showSymbol, setShowSymbol] = useState(false);
  const [showLines, setShowLines] = useState(true);

  useEffect(() => {
    if (mode !== 'drawCompare') {
      // Clear lines when leaving compare mode
      onLinesChange([]);
      setShowSymbol(false);
      setShowLines(true);
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
      setDotPosition(null);
    }
  }, [mode, onLinesChange]);

  useEffect(() => {
    if (isAnimating && lines.length > 0) {
      // Start the animation sequence
      setTimeout(() => {
        setShowSymbol(true);
        // Remove lines after they've shrunk
        setTimeout(() => {
          setShowLines(false);
        }, 500); // Match shrinkLine animation duration
      }, 100);
    } else if (!isAnimating) {
      setShowSymbol(false);
      setShowLines(true);
    }
  }, [isAnimating, lines.length]);

  useEffect(() => {
    const handleStartLine = (e) => {
      if (mode !== 'drawCompare') return;
      setIsDrawing(true);
      setStartPoint(e.detail);
      setCurrentPoint(e.detail);
      setDotPosition(e.detail.position);
    };

    const handleEndLine = (e) => {
      if (!isDrawing || e.detail.position !== dotPosition) {
        setIsDrawing(false);
        setStartPoint(null);
        setCurrentPoint(null);
        setDotPosition(null);
        return;
      }

      onLinesChange(prev => [...prev, {
        start: startPoint,
        end: e.detail,
        position: e.detail.position
      }]);

      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
      setDotPosition(null);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      setCurrentPoint({
        x: e.clientX,
        y: e.clientY
      });
    };

    document.addEventListener('startLine', handleStartLine);
    document.addEventListener('endLine', handleEndLine);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('startLine', handleStartLine);
      document.removeEventListener('endLine', handleEndLine);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDrawing, dotPosition, startPoint, mode]);

  const getComparisonSymbol = () => {
    if (leftCount > rightCount) return '>';
    if (leftCount < rightCount) return '<';
    return '=';
  };

  const renderComparisonSymbol = () => {
    const symbol = getComparisonSymbol();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return (
      <text
        x={centerX}
        y={centerY}
        className={`comparison-symbol ${showSymbol ? 'visible' : ''}`}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {symbol}
      </text>
    );
  };

  if (mode !== 'drawCompare' && !isAnimating) {
    return null;
  }

  return (
    <svg className="comparison-lines-container">
      {/* Active drawing line */}
      {isDrawing && startPoint && currentPoint && (
        <line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={currentPoint.x}
          y2={currentPoint.y}
          className="comparison-line drawing"
        />
      )}
      
      {/* Completed lines */}
      {!isAnimating && showLines && lines.map((line, index) => (
        <line
          key={index}
          x1={line.start.x}
          y1={line.start.y}
          x2={line.end.x}
          y2={line.end.y}
          className={`comparison-line complete ${line.position}`}
        />
      ))}

      {/* Animating lines */}
      {isAnimating && showLines && lines.map((line, index) => (
        <line
          key={index}
          x1={line.start.x}
          y1={line.start.y}
          x2={line.end.x}
          y2={line.end.y}
          className={`comparison-line shrinking ${line.position}`}
        />
      ))}

      {/* Comparison Symbol */}
      {renderComparisonSymbol()}
    </svg>
  );
};

export default CompLine;