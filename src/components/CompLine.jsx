import React, { useState, useEffect } from 'react';
import './CompLine.css';

const CompLine = ({ mode }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [dotPosition, setDotPosition] = useState(null);
  const [lines, setLines] = useState([]);

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

      setLines(prev => [...prev, {
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
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.start.x}
          y1={line.start.y}
          x2={line.end.x}
          y2={line.end.y}
          className={`comparison-line complete ${line.position}`}
        />
      ))}
    </svg>
  );
};

export default CompLine;