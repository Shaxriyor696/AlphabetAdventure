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
      className={`w-20 h-20 flex items-center justify-center text-3xl font-bold cursor-move
        ${isDragging ? 'opacity-30 scale-110' : 'opacity-100'}
        bg-white text-emerald-700
        shadow-md
        transform transition-all duration-200 ease-in-out
        hover:scale-105 hover:bg-emerald-50 active:scale-95`}
    >
      {letter}
    </Card>
  );
}