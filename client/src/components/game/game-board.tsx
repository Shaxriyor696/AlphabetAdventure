import React from 'react';
import { Circle } from '../ui/circle';

const GameBoard: React.FC = () => {
  const timeLeft = 120;
  const progress = 75;
  const score = 100;

  return (
    <div className="flex justify-between mb-8">
      {/* Timer Circle */}
      <Circle 
        value={timeLeft} 
        label="Seconds" 
        variant="timer"
      />

      {/* Progress Circle */}
      <Circle 
        value={`${progress}%`} 
        label="Progress" 
        variant="progress"
      />

      {/* Score Circle */}
      <Circle 
        value={score} 
        label="Ballar" 
        variant="score"
      />
    </div>
  );
};

export default GameBoard; 