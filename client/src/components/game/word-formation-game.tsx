import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { alphabetData } from '@/lib/game-data';
import { ChevronLeft } from 'lucide-react';
import { COMMON_ENGLISH_WORDS } from '@/lib/word-data';

interface Letter {
  id: string;
  char: string;
  isSelected: boolean;
  useCount: number;
}

export function WordFormationGame({ onBackToImages }: { onBackToImages: () => void }) {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [score, setScore] = useState(0);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [mascotState, setMascotState] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
  const [showAnimal, setShowAnimal] = useState<{ image: string; word: string } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/alphabet.mp3');
  }, []);

  // Initialize letters
  useEffect(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shuffledLetters = alphabet.split('')
      .sort(() => Math.random() - 0.5)
      .map((char, index) => ({
        id: `letter-${index}`,
        char,
        isSelected: false,
        useCount: 0
      }));
    setLetters(shuffledLetters);
  }, []);

  const handleLetterClick = (letter: Letter) => {
    // Allow multiple uses of the same letter
    setLetters(prev => prev.map(l => 
      l.id === letter.id 
        ? { ...l, useCount: l.useCount + 1 }
        : l
    ));
    
    // Add letter to current word
    setCurrentWord(prev => prev + letter.char);
  };

  const checkWord = () => {
    if (currentWord.length < 3) {
      setMascotState('incorrect');
      setTimeout(() => setMascotState('neutral'), 2000);
      return;
    }

    const isValidWord = COMMON_ENGLISH_WORDS.includes(currentWord);
    const matchingAnimal = alphabetData.find(
      item => item.word.toUpperCase() === currentWord
    );

    if ((isValidWord || matchingAnimal) && !foundWords.has(currentWord)) {
      setScore(prev => prev + (currentWord.length * 10));
      setFoundWords(prev => new Set(Array.from(prev).concat(currentWord)));
      setMascotState('correct');

      if (matchingAnimal) {
        setShowAnimal({ image: matchingAnimal.image, word: matchingAnimal.word });
        if (matchingAnimal.audioStart !== undefined && matchingAnimal.audioEnd !== undefined) {
          const audio = audioRef.current;
          if (audio) {
            audio.currentTime = matchingAnimal.audioStart;
            audio.play();
            const stopAudio = () => {
              if (audio.currentTime >= matchingAnimal.audioEnd!) {
                audio.pause();
                audio.removeEventListener('timeupdate', stopAudio);
              }
            };
            audio.addEventListener('timeupdate', stopAudio);
          }
        }
        setTimeout(() => setShowAnimal(null), 3000);
      }

      // Don't reset letters to allow reuse
      setCurrentWord('');
    } else {
      setMascotState('incorrect');
    }
    
    setTimeout(() => setMascotState('neutral'), 2000);
  };

  const resetSelection = () => {
    setLetters(prev => prev.map(l => ({ 
      ...l, 
      isSelected: false,
      useCount: 0
    })));
    setCurrentWord('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-250 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={onBackToImages}
            variant="outline"
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Rasmlar o'yiniga qaytish
          </Button>

          {/* Score and Found Words Circles */}
          <div className="flex gap-1">
            {/* Score Circle */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-emerald-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-emerald-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                  transform: `rotate(-90deg)`,
                }}
              ></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-900">{score}</div>
                <div className="text-sm font-medium text-emerald-700">Ballar</div>
              </div>
            </div>

            {/* Found Words Circle */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-emerald-300"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-emerald-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                  transform: `rotate(-90deg)`,
                }}
              ></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-900">{foundWords.size}</div>
                <div className="text-sm font-medium text-emerald-700">So'zlar</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">
            So'z tuzish o'yini
          </h2>
        </div>

        {/* Current Word Display */}
        <div className="bg-white rounded-lg p-6 mb-8 text-center shadow-lg">
          <p className="text-4xl font-bold text-emerald-900 min-h-[60px]">
            {currentWord || 'Select letters to form a word'}
          </p>
        </div>

        {/* Letter Grid */}
        <div className="grid grid-cols-7 gap-4 mb-9 justify-center">
          {letters.map((letter) => (
            <motion.button
              key={letter.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-lg text-2xl font-bold relative
                ${letter.useCount > 0 
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-emerald-900'
                } shadow-md transition-colors`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter.char}
              {letter.useCount > 1 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {letter.useCount}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={checkWord}
            className="bg-emerald-500 hover:bg-emerald-500 text-white"
            disabled={currentWord.length === 0}
          >
            Check Word
          </Button>
          <Button
            onClick={resetSelection}
            variant="outline"
            disabled={currentWord.length === 0}
          >
            Reset Selection
          </Button>
        </div>

        {/* Found Words List with categories */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-emerald-900 mb-4">
            Topilgan so'zlar:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(foundWords).map(word => {
              const isAnimal = alphabetData.some(item => 
                item.word.toUpperCase() === word
              );
              return (
                <span
                  key={word}
                  className={`px-3 py-1 rounded-full ${
                    isAnimal 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        {/* Animal Display Overlay */}
        <AnimatePresence>
          {showAnimal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div className="bg-white p-4 rounded-xl max-w-md text-center">
                <img
                  src={showAnimal.image}
                  alt={showAnimal.word}
                  className="w-45 h-45 object-cover rounded-lg mx-auto mb-4"
                />
                <p className="text-2xl font-bold text-emerald-900">
                  {showAnimal.word}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 