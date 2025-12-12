import { Button } from './ui/button';
import { Baby, Smile, Rocket, Sparkles } from 'lucide-react';

export type AgeLevel = '2-4' | '4-8' | '8+';

interface LevelSelectorProps {
  onSelectLevel: (level: AgeLevel) => void;
}

export function LevelSelector({ onSelectLevel }: LevelSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 max-w-2xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Sparkles className="size-6 sm:size-8 text-yellow-500 fill-yellow-500" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Math Adventure! 
            </h1>
            <Sparkles className="size-6 sm:size-8 text-yellow-500 fill-yellow-500" />
          </div>
        </div>

        <h2 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl">
          Choose Your Level! 🎯
        </h2>
        
        <div className="grid gap-4 sm:gap-6">
          <Button
            onClick={() => onSelectLevel('2-4')}
            className="h-24 sm:h-32 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-2xl"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <Baby className="size-8 sm:size-12 flex-shrink-0" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl md:text-3xl">Little Learners</div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Ages 2-4 • Super Easy!</div>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onSelectLevel('4-8')}
            className="h-24 sm:h-32 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 rounded-2xl"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <Smile className="size-8 sm:size-12 flex-shrink-0" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl md:text-3xl">Math Stars</div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Ages 4-8 • Fun Challenge!</div>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onSelectLevel('8+')}
            className="h-24 sm:h-32 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <Rocket className="size-8 sm:size-12 flex-shrink-0" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl md:text-3xl">Math Masters</div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Ages 8+ • Expert Mode!</div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}