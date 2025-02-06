import { useDrag } from 'react-dnd';
import { Card } from "@/components/ui/card";

interface LetterCardProps {
  letter: string;
  isCompleted: boolean;
}

export function LetterCard({ letter, isCompleted }: LetterCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'letter',
    item: { letter },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (isCompleted) {
    return null;
  }

  return (
    <Card
      ref={drag}
      className={`w-16 h-16 flex items-center justify-center text-3xl font-bold cursor-move
        ${isDragging ? 'opacity-30 scale-110' : 'opacity-100'}
        bg-gradient-to-br from-primary-500 to-primary-600 text-white
        transform transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95`}
    >
      {letter}
    </Card>
  );
}