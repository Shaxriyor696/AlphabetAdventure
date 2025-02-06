import { useDrag } from 'react-dnd';
import { Card } from "@/components/ui/card";

interface LetterCardProps {
  letter: string;
}

export function LetterCard({ letter }: LetterCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'letter',
    item: { letter },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={`w-16 h-16 flex items-center justify-center text-3xl font-bold cursor-move
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        bg-gradient-to-br from-primary-500 to-primary-600 text-white
        hover:scale-105 transition-transform`}
    >
      {letter}
    </Card>
  );
}