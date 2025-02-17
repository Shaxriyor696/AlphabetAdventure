import { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { LetterCard } from './letter-card';
import { ImageTarget } from './image-target';
import { Mascot } from './mascot';
import { Button } from '@/components/ui/button';
import { alphabetData, ITEMS_PER_PAGE } from '@/lib/game-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordFormationGame } from './word-formation-game';

export function GameBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());
  const [mascotState, setMascotState] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = window.innerWidth <= 768;
  const [timeLeft, setTimeLeft] = useState(25);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showTimeUpMessage, setShowTimeUpMessage] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const [showWordGame, setShowWordGame] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/audio/alphabet.mp3');
  }, []);

  const playAudioSlice = (start: number, end: number) => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    audio.currentTime = start;
    audio.play();

    const stopAudio = () => {
      if (audio.currentTime >= end) {
        audio.pause();
        audio.removeEventListener('timeupdate', stopAudio);
      }
    };

    audio.addEventListener('timeupdate', stopAudio);
  };

  const startIdx = currentPage * ITEMS_PER_PAGE;
  const currentItems = alphabetData.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(alphabetData.length / ITEMS_PER_PAGE);

  const handleCorrectDrop = (letter: string) => {
    setCompletedLetters(prev => new Set(Array.from(prev).concat(letter)));
    setMascotState('correct');
    setScore(prev => prev + 10);

    const currentItem = alphabetData.find(item => item.letter === letter);
    if (currentItem) {
      playAudioSlice(currentItem.audioStart, currentItem.audioEnd);
    }

    setTimeout(() => setMascotState('neutral'), 2000);
  };

  const handleIncorrectDrop = () => {
    setMascotState('incorrect');
    setTimeout(() => setMascotState('neutral'), 2000);
  };

  const progress = (completedLetters.size / alphabetData.length) * 100;

  const isGameComplete = completedLetters.size === alphabetData.length;

  // Reset timer when page changes
  useEffect(() => {
    setTimeLeft(25);
    setIsTimerActive(true);
    setShowTimeUpMessage(false);
  }, [currentPage]);

  // Timer logic
  useEffect(() => {
    if (!isTimerActive) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          // Show "Try Again" if not all items are completed
          const currentItemLetters = currentItems.map(item => item.letter);
          const completedCurrentItems = currentItemLetters.every(letter => 
            completedLetters.has(letter)
          );
          if (!completedCurrentItems) {
            setShowTimeUpMessage(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isTimerActive, currentItems]);

  // Check if all current items are completed
  useEffect(() => {
    const currentItemLetters = currentItems.map(item => item.letter);
    const completedCurrentItems = currentItemLetters.every(letter => 
      completedLetters.has(letter)
    );
    
    if (completedCurrentItems && isTimerActive) {
      setIsTimerActive(false);
      clearInterval(timerRef.current);
      // Auto-advance to next page after a short delay
      setTimeout(() => {
        if (currentPage < totalPages - 1) {
          setCurrentPage(p => p + 1);
        }
      }, 1500);
    }
  }, [completedLetters, currentItems]);

  useEffect(() => {
    if (isGameComplete) {
      setTimeout(() => {
        setShowWordGame(true);
      }, 3000);
    }
  }, [isGameComplete]);

  const handleSkipToWords = () => {
    setShowWordGame(true);
  };

  if (showWordGame) {
    return <WordFormationGame onBackToImages={() => setShowWordGame(false)} />;
  }

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-250 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-2">
            <Button
              onClick={handleSkipToWords}
              variant="outline"
              className="text-emerald-700"
            >
              So'z tuzish o'yiniga o'tish →
            </Button>
          </div>
          <div className="flex justify-between items-center mb-10">
            {/* Score Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-emerald-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-emerald-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                  transform: `rotate(-90deg)`,
                }}
              ></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-900">{score}</div>
                <div className="text-sm font-medium text-emerald-700">Ballar</div>
              </div>
            </div>

            {/* Timer Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border-8 border-emerald-350"></div>
              <div 
                className="absolute inset-0 rounded-full border-6 border-emerald-700"
                style={{
                  clipPath: `polygon(0 0, ${(timeLeft / 25) * 100}% 0, ${(timeLeft / 25) * 100}% 100%, 0 100%)`,
                  transform: `rotate(-90deg)`,
                }}
              ></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-900">{timeLeft}</div>
                <div className="text-sm font-medium text-emerald-700">Seconds</div>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-emerald-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-emerald-500"
                style={{
                  clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
                  transform: `rotate(-90deg)`,
                }}
              ></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-900">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm font-medium text-emerald-700">Progress</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            {currentItems.map((item) => (
              <ImageTarget
                key={item.letter}
                item={item}
                onCorrectDrop={handleCorrectDrop}
                onIncorrectDrop={handleIncorrectDrop}
                isCompleted={completedLetters.has(item.letter)}
              />
            ))}
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {currentItems.map((item) => (
              <LetterCard 
                key={item.letter}
                letter={item.letter}
                isCompleted={completedLetters.has(item.letter)}
              />
            ))}
          </div>

          <div className="flex justify-center gap-2 mb-8">
            <Button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              variant="outline"
              className="px-6 py-3 text-lg font-medium"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Ortga
            </Button>
            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              className="px-6 py-3 text-lg font-medium"
            >
              Oldinga
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8">
            <Mascot state={mascotState} />
            <p className="text-2xl font-bold text-emerald-1000">
            KIDS Englishga xush kelibsiz!
            </p>
          </div>

          {/* Time Up Message */}
          <AnimatePresence>
            {showTimeUpMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  className="bg-white p-8 rounded-xl max-w-md text-center"
                  onClick={() => {
                    setShowTimeUpMessage(false);
                    setTimeLeft(25);
                    setIsTimerActive(true);
                  }}
                >
                  <h2 className="text-3xl font-bold text-red-700 mb-4">
                    Vaqt tugadi! ⏰
                  </h2>
                  <p className="text-xl mb-4">
                    Qaytadan urinib ko'ring😊
                  </p>
                  <Button 
                    onClick={() => {
                      setShowTimeUpMessage(false);
                      setTimeLeft(25);
                      setIsTimerActive(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Qayta urinish
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isGameComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  className="bg-white p-8 rounded-xl max-w-md text-center"
                  onClick={e => e.stopPropagation()}
                >
                  <h2 className="text-3xl font-bold text-emerald-700 mb-4">
                    Congratulations! 🎉
                  </h2>
                  <p className="text-xl mb-4">
                    You've completed the alphabet game!
                  </p>
                  <p className="text-2xl font-bold text-emerald-600">
                    Final Score: {score}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DndProvider>
  );
}