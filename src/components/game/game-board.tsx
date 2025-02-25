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
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/AlphabetAdventure/audio/alphabet.mp3');
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

      // For the last page (Zebra)
      if (currentPage === totalPages - 1) {
        // Wait for the zebra image display (5 seconds) plus a short delay
        setTimeout(() => {
          setShowCompletionMessage(true);
          // Auto-hide completion message after 8 seconds
          setTimeout(() => {
            setShowCompletionMessage(false);
            setShowWordGame(true);
          }, 8000);
        }, 6000);  // Increased delay after zebra image
      } else {
        // For other pages, advance as normal
        setTimeout(() => {
          if (currentPage < totalPages - 1) {
            setCurrentPage(p => p + 1);
          }
        }, 5000);
      }
    }
  }, [completedLetters, currentItems, currentPage, totalPages]);

  useEffect(() => {
    if (isGameComplete) {
      setShowCompletionMessage(true);
      // Auto-hide after 8 seconds
      setTimeout(() => {
        setShowCompletionMessage(false);
        setShowWordGame(true);  // Automatically move to word game
      }, 9000);
    }
  }, [isGameComplete]);

  const handleSkipToWords = () => {
    setShowWordGame(true);
  };

  const handleRestartGame = () => {
    setCompletedLetters(new Set());
    setScore(0);
    setCurrentPage(0);
    setTimeLeft(25);
    setIsTimerActive(true);
  };

  const handleReturnToMenu = () => {
    setIsGameStarted(false);
    // Reset any necessary game state
    setCompletedLetters(new Set());
    setScore(0);
    setCurrentPage(0);
    setTimeLeft(25);
    setIsTimerActive(true);
  };

  // Add this shuffle function near the top of your component
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [shuffledItems, setShuffledItems] = useState(alphabetData.slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE));

  useEffect(() => {
    if (!isTimerActive) return;

    setShuffledItems(shuffleArray(alphabetData.slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE)));

    const shuffleTimer = setInterval(() => {
      setShuffledItems(prevItems => shuffleArray([...prevItems]));
    }, 3000);

    return () => clearInterval(shuffleTimer);
  }, [currentPage, isTimerActive]);

  if (!isGameStarted) {
    return (
      <div className="min-h-screen bg-[#CDFADB] flex items-center justify-center">
        <div className="text-center max-w-2xl w-full px-4">
          
          {/* Video Section */}
          <div className="mb-2">
            <div className="relative w-full pt-[56.25%]">
              <iframe 
                className="absolute top-[-140px] left-0 w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/75-1YsGiUC8?si=p-gMSxYNVKg_jOp5" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </div>

          {/* Audio Section */}
          <div className="mb-2 -mt-12">
            <audio 
              controls
              className="w-full mb-2 rounded-lg"
              src="/AlphabetAdventure/audio/alphabet.mp3"
            >
              Your browser does not support the audio element.
            </audio>
            <p className="text-lg font-medium text-emerald-700">
              Alphabet Audio
            </p>
          </div>

          {/* Topic Title */}
          <h2 className="text-2xl font-semibold text-emerald-700 mb-10">
            Alphabet Topic
          </h2>

          {/* Enter Game Button */}
          <button
            onClick={() => setIsGameStarted(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            O'yinga kirish
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="yellow" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (showWordGame) {
    return <WordFormationGame onBackToImages={() => setShowWordGame(false)} />;
  }

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen bg-[#CDFADB] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between mb-4">
            <Button
              onClick={handleReturnToMenu}
              variant="outline"
              className="bg-yellow-300 border-4 border-emerald-500 hover:bg-emerald-50 text-emerald-600 px-1 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Asosiy menyu
            </Button>
            
            <Button
              onClick={handleSkipToWords}
              variant="outline"
              className="bg-yellow-300 border-4 border-emerald-500 hover:bg-emerald-50 text-emerald-600 px-1 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2"
            >
              So'z tuzish o'yiniga o'tish
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="green" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Button>
          </div>
          <div className="flex  justify-between items-center mb-10">
            {/* Score Rectangle */}
            <div className="relative w-20 h-16">
              <div className="absolute inset-0 border-4 border-emerald-400 bg-emerald-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-900">{score}</div>
                  <div className="text-sm font-medium text-emerald-800">Ballar</div>
                </div>
              </div>
            </div>

            {/* Timer Rectangle */}
            <div className="relative w-20 h-16 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-red-400 bg-red-50 rounded-lg"></div>
              <div className="absolute inset-2 flex gap-1">
                {[...Array(0)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-md ${i * 2.5 <= timeLeft ? 'bg-red-400' : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <div className="relative text-center">
                <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
                <div className="text-sm font-medium text-red-600">Seconds</div>
              </div>
            </div>

            {/* Progress Rectangle */}
            <div className="relative w-20 h-16 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-emerald-400 bg-emerald-150 rounded-lg"></div>
              <div className="absolute inset-2 flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-md ${i * 10 <= progress ? 'bg-yellow-0' : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <div className="relative text-center">
                <div className="text-2xl font-bold text-emerald-900">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm font-medium text-emerald-700">Progress</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-2">
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

          <div className="flex justify-center gap-4 sm:gap-8 mb-4 sm:mb-8">
            {shuffledItems.map((item) => (
              <LetterCard 
                key={item.letter}
                letter={item.letter}
                isCompleted={completedLetters.has(item.letter)}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-2">
            <Button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="bg-yellow-300 border-2 border-emerald-500 hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-yellow-300 text-emerald-600 px-8 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-3 shadow-sm"
            >
              <ChevronLeft className="h-3 w-3" />
              Ortga
            </Button>
            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="bg-yellow-300 border-2 border-emerald-500 hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-yellow-300 text-emerald-600 px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-3 shadow-sm"
            >
              Oldinga
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-32 sm:w-32 sm:h-32">
              <Mascot state={mascotState} />
            </div>
            <p className="text-2xl font-bold text-emerald-1000 -ml-2">
              
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
            {showCompletionMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-10 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  className="bg-white p-8 rounded-xl max-w-md text-center"
                  onClick={e => e.stopPropagation()}
                >
                  <h2 className="text-3xl font-bold text-emerald-700 mb-4">
                    Tabriklaymiz! 🎉
                  </h2>
                  <p className="text-xl mb-4">
                    Siz alifbo o'yinini tugatdingiz!
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mb-8">
                    Yakuniy ball: {score}
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={handleRestartGame}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg"
                    >
                      Qayta o'ynash 🔄
                    </Button>
                    <Button
                      onClick={() => setShowWordGame(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 text-lg"
                    >
                      So'z tuzish o'yini ➡️
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DndProvider>
  );
}