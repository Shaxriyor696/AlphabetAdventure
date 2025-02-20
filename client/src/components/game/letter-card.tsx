import React from 'react';

interface LetterCardProps {
  letter: string;
  isCompleted?: boolean;
  onClick?: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, isCompleted = false, onClick }) => {
  return (
    <div 
      className={`
        w-24 h-24
        flex items-center justify-center 
        border-4 border-emerald-600  // Made border thicker and slightly lighter
        rounded-[20px]  // Using direct pixel value instead of CSS variable
        bg-emerald-50  // Light green background instead of white
        shadow-lg hover:shadow-xl  // Bigger shadow and hover effect
        text-5xl font-bold text-emerald-600  // Larger text and matching color
        ${isCompleted ? 'opacity-50' : 'hover:bg-emerald-100 hover:scale-105 cursor-pointer'}
        transition-all duration-200
      `}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

export default LetterCard; 