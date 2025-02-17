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
        src="/images/mascot/ibratjon.jpg" 
        alt="Friendly ibratjon"
        className={`w-40 h-25`}
      />
      <div className="absolute -bottom-8 right-6 transform translate-x-2/3">
        <div className="bg-wood rounded-lg shadow-lg p-2 relative border-4 border-brown-600 min-w-[250px]">
          {state === 'neutral' && (
            <p className="text-sm font-semibold text-brown-700">To'g'ri topishga harakat qiling!</p>
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