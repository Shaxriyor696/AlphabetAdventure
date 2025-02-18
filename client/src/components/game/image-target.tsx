import { useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageTargetProps {
  item: {
    letter: string;
    word: string;
    image: string;
  };
  onCorrectDrop: (letter: string) => void;
  onIncorrectDrop: () => void;
  isCompleted: boolean;
}

export function ImageTarget({ item, onCorrectDrop, onIncorrectDrop, isCompleted }: ImageTargetProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'letter',
    drop: (draggedItem: { letter: string }) => {
      if (draggedItem.letter === item.letter) {
        onCorrectDrop(item.letter);
        setIsEnlarged(true);
        setTimeout(() => setIsEnlarged(false), 5000);
      } else {
        onIncorrectDrop();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleClick = () => {
    if (isCompleted) {
      setIsEnlarged(!isEnlarged);
    }
  };

  return (
    <>
      <div
        ref={drop}
        className={cn(
          "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
          isOver && "ring-2 ring-emerald-400",
          isCompleted && "ring-2 ring-emerald-500"
        )}
        onClick={handleClick}
      >
        <img
          src={item.image}
          alt={item.word}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <p className="text-center mt-2 mb-2 font-bold text-2xl">{item.word}</p>
      </div>

      <AnimatePresence>
        {isEnlarged && isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsEnlarged(false)}
          >
            <motion.div
              className="bg-white p-2 rounded-xl max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={item.image}
                alt={item.word}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
              <p className="text-center mt-2 mb-2 text-4xl font-bold">{item.word}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}