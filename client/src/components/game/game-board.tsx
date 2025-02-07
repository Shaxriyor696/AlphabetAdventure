import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { LetterCard } from './letter-card';
import { ImageTarget } from './image-target';
import { Mascot } from './mascot';
import { Button } from '@/components/ui/button';
import { alphabetData, ITEMS_PER_PAGE } from '@/lib/game-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function GameBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());
  const [mascotState, setMascotState] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
  const isMobile = window.innerWidth <= 768;

  const startIdx = currentPage * ITEMS_PER_PAGE;
  const currentItems = alphabetData.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(alphabetData.length / ITEMS_PER_PAGE);

  const handleCorrectDrop = (letter: string) => {
    setCompletedLetters(prev => new Set([...prev, letter]));
    setMascotState('correct');
    setTimeout(() => setMascotState('neutral'), 2000);
  };

  const handleIncorrectDrop = () => {
    setMascotState('incorrect');
    setTimeout(() => setMascotState('neutral'), 2000);
  };

  const progress = (completedLetters.size / alphabetData.length) * 100;

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-200 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <Mascot state={mascotState} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {currentItems.map((item) => (
              <div key={item.letter} className="flex justify-center">
                <LetterCard 
                  letter={item.letter}
                  isCompleted={completedLetters.has(item.letter)}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {currentItems.map((item) => (
              <div key={item.letter} className="flex justify-center">
                <ImageTarget
                  item={item}
                  onCorrectDrop={handleCorrectDrop}
                  onIncorrectDrop={handleIncorrectDrop}
                  isCompleted={completedLetters.has(item.letter)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              size="sm"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}