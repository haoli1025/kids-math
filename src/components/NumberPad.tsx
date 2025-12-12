import { Button } from './ui/button';
import { Delete } from 'lucide-react';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onBackspace: () => void;
  onClear: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

export function NumberPad({ onNumberClick, onBackspace, onClear, onEnter, disabled }: NumberPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Numbers 1-9 */}
        {numbers.slice(0, 9).map((num) => (
          <Button
            key={num}
            type="button"
            onClick={() => onNumberClick(num)}
            disabled={disabled}
            className="h-14 sm:h-16 md:h-20 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            {num}
          </Button>
        ))}
        
        {/* Clear button */}
        <Button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className="h-14 sm:h-16 md:h-20 text-lg sm:text-xl md:text-2xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          Clear
        </Button>
        
        {/* Zero */}
        <Button
          type="button"
          onClick={() => onNumberClick(0)}
          disabled={disabled}
          className="h-14 sm:h-16 md:h-20 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          0
        </Button>
        
        {/* Backspace button */}
        <Button
          type="button"
          onClick={onBackspace}
          disabled={disabled}
          className="h-14 sm:h-16 md:h-20 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-1 sm:gap-2"
        >
          <Delete className="size-5 sm:size-6" />
        </Button>
      </div>
      
      {/* Enter button - full width */}
      <Button
        type="button"
        onClick={onEnter}
        disabled={disabled}
        className="w-full h-14 sm:h-16 md:h-20 mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        ✓ Check Answer! ✓
      </Button>
    </div>
  );
}
