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
      <div className="absolute bottom-0 right-0 transform translate-x-1/2 -translate-y-1/2">
        <div className="bg-wood p-3 rounded-lg shadow-lg relative">
          {state === 'neutral' && (
            <p className="text-sm font-semibold">Let's match!</p>
          )}
          {state === 'correct' && (
            <div className="flex items-center gap-1 text-green-600">
              <Check className="w-4 h-4" />
              <p className="text-sm font-semibold">Great job!</p>
            </div>
          )}
          {state === 'incorrect' && (
            <div className="flex items-center gap-1 text-red-600">
              <X className="w-4 h-4" />
              <p className="text-sm font-semibold">Try again!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
