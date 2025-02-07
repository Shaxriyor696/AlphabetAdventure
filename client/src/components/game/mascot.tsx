import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MascotProps {
  state: 'neutral' | 'correct' | 'incorrect';
}

export function Mascot({ state }: MascotProps) {
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    setAnimation('animate-bounce');
    const timer = setTimeout(() => setAnimation(''), 1000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="relative">
      <img 
        src="/mascot/crocodile.png" 
        alt="Friendly Crocodile"
        className={`w-32 h-32 ${animation}`}
      />
      <div className="absolute -bottom-4 right-0 transform translate-x-1/2">
        <div className="bg-wood rounded-lg shadow-lg p-3 relative border-2 border-brown-600 min-w-[120px]">
          {state === 'neutral' && (
            <p className="text-sm font-semibold text-brown-800">To'g'ri topdiniz!</p>
          )}
          {state === 'correct' && (
            <div className="flex items-center gap-1 text-green-600">
              <Check className="w-4 h-4" />
              <p className="text-sm font-semibold">Barakalla!</p>
            </div>
          )}
          {state === 'incorrect' && (
            <div className="flex items-center gap-1 text-red-600">
              <X className="w-4 h-4" />
              <p className="text-sm font-semibold">Qayta urinib ko'ring!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}