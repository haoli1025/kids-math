import { Button } from './ui/button';
import { Trophy, Star, Sparkles, RotateCcw, ArrowLeft } from 'lucide-react';

interface FinalScoreProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onChangeLevel: () => void;
}

export function FinalScore({ score, totalQuestions, onPlayAgain, onChangeLevel }: FinalScoreProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine message based on score
  const getMessage = () => {
    if (percentage === 100) {
      return {
        title: "Perfect Score! 🎉",
        message: "You're a Math Superstar!",
        emoji: "🌟",
        color: "from-yellow-400 to-orange-400"
      };
    } else if (percentage >= 80) {
      return {
        title: "Excellent Work! 🎊",
        message: "You did amazing!",
        emoji: "⭐",
        color: "from-green-400 to-emerald-400"
      };
    } else if (percentage >= 60) {
      return {
        title: "Great Job! 👏",
        message: "Keep practicing!",
        emoji: "💪",
        color: "from-blue-400 to-cyan-400"
      };
    } else {
      return {
        title: "Nice Try! 💫",
        message: "Practice makes perfect!",
        emoji: "🌈",
        color: "from-purple-400 to-pink-400"
      };
    }
  };

  const result = getMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center">
          {/* Trophy Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className={`bg-gradient-to-br ${result.color} rounded-full p-6 sm:p-8 shadow-lg`}>
              <Trophy className="size-16 sm:size-20 md:size-24 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
              <Sparkles className="size-8 sm:size-10 text-yellow-400 fill-yellow-400" />
              <span>{result.title}</span>
              <Sparkles className="size-8 sm:size-10 text-yellow-400 fill-yellow-400" />
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-purple-600">
              {result.message}
            </p>
          </div>

          {/* Score Display */}
          <div className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="text-7xl sm:text-8xl md:text-9xl mb-4">
              {result.emoji}
            </div>
            <div className="text-5xl sm:text-6xl md:text-7xl mb-2 sm:mb-3 text-purple-600">
              {score} / {totalQuestions}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl text-purple-500">
              {percentage}% Correct!
            </div>
            
            {/* Stars based on score */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-10 sm:size-12 md:size-14 ${
                    i < Math.ceil(percentage / 34)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={onPlayAgain}
              className="flex-1 h-16 sm:h-20 text-lg sm:text-xl bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw className="size-5 sm:size-6 mr-2" />
              Play Again! 🎮
            </Button>
            <Button
              onClick={onChangeLevel}
              className="flex-1 h-16 sm:h-20 text-lg sm:text-xl bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowLeft className="size-5 sm:size-6 mr-2" />
              Change Level 🎯
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
