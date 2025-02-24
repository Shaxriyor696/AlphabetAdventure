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
        bg-white
        border-2 border-emerald-600
        rounded-[12px]  // Slightly rounded corners like in image
        text-4xl font-bold text-emerald-600
        ${isCompleted ? 'opacity-50' : 'hover:bg-emerald-50 cursor-pointer'}
        transition-all duration-200
      `}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

export default LetterCard; 