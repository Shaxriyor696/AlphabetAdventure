import { useDrop } from 'react-dnd';
import { Card } from "@/components/ui/card";
import { correctSound, incorrectSound } from '@/lib/game-data';
import type { AlphabetItem } from '@/lib/game-data';

interface ImageTargetProps {
  item: AlphabetItem;
  onCorrectDrop: (letter: string) => void;
}

export function ImageTarget({ item, onCorrectDrop }: ImageTargetProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'letter',
    drop: (draggedItem: { letter: string }) => {
      if (draggedItem.letter === item.letter) {
        correctSound.play();
        onCorrectDrop(item.letter);
      } else {
        incorrectSound.play();
      }
    },
    canDrop: (draggedItem: { letter: string }) => draggedItem.letter === item.letter,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Card
      ref={drop}
      className={`relative w-48 h-48 flex flex-col items-center justify-center p-4
        ${isOver && canDrop ? 'ring-4 ring-green-500' : ''}
        ${isOver && !canDrop ? 'ring-4 ring-red-500' : ''}
        hover:shadow-lg transition-shadow`}
    >
      <div className="w-full h-32 mb-2 overflow-hidden rounded-lg">
        <img 
          src={item.image} 
          alt={item.word}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-lg font-semibold text-center">{item.word}</p>
    </Card>
  );
}
