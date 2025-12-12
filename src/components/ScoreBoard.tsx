import { Button } from './ui/button';
import { Trophy, Target, Zap, RotateCcw, ArrowLeft } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  totalAttempts: number;
  streak: number;
  onReset: () => void;
  onChangeLevel: () => void;
}

export function ScoreBoard({ score, totalAttempts, streak, onReset, onChangeLevel }: ScoreBoardProps) {
  const percentage = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col gap-4">
        {/* Stats Row */}
        <div className="flex gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-2 bg-yellow-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex-1 min-w-[140px] sm:min-w-0 sm:flex-none">
            <Trophy className="text-yellow-600 size-5 sm:size-6 flex-shrink-0" />
            <div>
              <div className="text-xs sm:text-sm text-yellow-700">Stars Earned ⭐</div>
              <div className="text-xl sm:text-2xl text-yellow-900">{score}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-blue-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex-1 min-w-[140px] sm:min-w-0 sm:flex-none">
            <Target className="text-blue-600 size-5 sm:size-6 flex-shrink-0" />
            <div>
              <div className="text-xs sm:text-sm text-blue-700">How Good? 🎯</div>
              <div className="text-xl sm:text-2xl text-blue-900">{percentage}%</div>
            </div>
          </div>

          {streak > 0 && (
            <div className="flex items-center gap-2 bg-orange-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 animate-bounce w-full sm:w-auto">
              <Zap className="text-orange-600 fill-orange-600 size-5 sm:size-6 flex-shrink-0" />
              <div>
                <div className="text-xs sm:text-sm text-orange-700">On Fire! 🔥</div>
                <div className="text-xl sm:text-2xl text-orange-900">{streak} in a row!</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Row */}
        <div className="flex gap-2 sm:gap-3">
          <Button 
            onClick={onChangeLevel}
            variant="outline"
            className="rounded-2xl h-10 sm:h-12 px-3 sm:px-6 flex-1 text-sm sm:text-base"
          >
            <ArrowLeft className="size-3 sm:size-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Change Level</span>
            <span className="xs:hidden">Level</span>
          </Button>
          <Button 
            onClick={onReset}
            variant="outline"
            className="rounded-2xl h-10 sm:h-12 px-3 sm:px-6 flex-1 text-sm sm:text-base"
          >
            <RotateCcw className="size-3 sm:size-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Start Over</span>
            <span className="xs:hidden">Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
}