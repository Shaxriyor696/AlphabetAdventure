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
        src="/AlphabetAdventure/images/mascot/ibratjon.jpg" 
        alt="Friendly ibratjon"
        className={`w-40 h-25 -ml-32`}
      />
      <div className="absolute right-32 transform translate-x-2/3 -mt-40 -mr-20">
        <div className="bg-wood rounded-lg shadow-lg p-2 relative border-8 border-yellow-500 min-w-[250px]">
          {state === 'neutral' && (
            <p className="text-sm font-bold text-blue-500">To'g'ri topishga harakat qiling!</p>
          )}
          {state === 'correct' && (
            <div className="flex items-center gap-8 text-green-600">
              <Check className="w-6 h-6" />
              <p className="text-sm font-bold">Barakalla!</p>
            </div>
          )}
          {state === 'incorrect' && (
            <div className="flex items-center gap-4 text-red-600">
              <X className="w-4 h-4" />
              <p className="text-sm font-bold">Qayta urinib ko'ring!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}