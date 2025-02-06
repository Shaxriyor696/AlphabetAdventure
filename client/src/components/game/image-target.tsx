import { useDrop } from 'react-dnd';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { AlphabetItem } from '@/lib/game-data';

interface ImageTargetProps {
  item: AlphabetItem;
  onCorrectDrop: (letter: string) => void;
}

export function ImageTarget({ item, onCorrectDrop }: ImageTargetProps) {
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
    canDrop: (draggedItem: { letter: string }) => draggedItem.letter === item.letter,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Card
      ref={drop}
      className={`relative w-32 h-36 flex flex-col items-center justify-center p-2
        ${isOver && canDrop ? 'ring-4 ring-green-500' : ''}
        ${isOver && !canDrop ? 'ring-4 ring-red-500' : ''}
        hover:shadow-lg transition-shadow`}
    >
      <div className="w-full h-24 mb-1 overflow-hidden rounded-lg">
        <img 
          src={item.image} 
          alt={item.word}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm font-semibold text-center">{item.word}</p>
    </Card>
  );
}