import { useDrop } from 'react-dnd';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check } from 'lucide-react';
import type { AlphabetItem } from '@/lib/game-data';

interface ImageTargetProps {
  item: AlphabetItem;
  onCorrectDrop: (letter: string) => void;
  isCompleted: boolean;
}

export function ImageTarget({ item, onCorrectDrop, isCompleted }: ImageTargetProps) {
  const { toast } = useToast();

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'letter',
    drop: (draggedItem: { letter: string }) => {
      if (draggedItem.letter === item.letter) {
        toast({
          title: "Correct!",
          description: `'${item.letter}' matches with ${item.word}!`,
          variant: "default",
          className: "bg-green-500 text-white",
        });
        onCorrectDrop(item.letter);
      } else {
        toast({
          title: "Try Again!",
          description: "That's not the right match. Keep trying!",
          variant: "destructive",
        });
      }
    },
    canDrop: (draggedItem: { letter: string }) => !isCompleted && draggedItem.letter === item.letter,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Card
      ref={drop}
      className={`relative w-32 h-36 flex flex-col items-center justify-center p-2
        ${isOver && canDrop ? 'ring-4 ring-green-500 scale-105' : ''}
        ${isOver && !canDrop ? 'ring-4 ring-red-500' : ''}
        ${isCompleted ? 'opacity-75' : ''}
        transition-all duration-200 ease-in-out
        hover:shadow-lg`}
    >
      <div className="w-full h-24 mb-1 overflow-hidden rounded-lg relative">
        <img 
          src={item.image} 
          alt={item.word}
          className={`w-full h-full object-cover transition-transform duration-200
            ${isCompleted ? 'scale-95 blur-sm' : ''}`}
        />
        {isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/30">
            <Check className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-center">{item.word}</p>
    </Card>
  );
}