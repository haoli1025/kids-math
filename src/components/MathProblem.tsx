import { useState, useEffect } from 'react';
import { Plus, Minus, X, Divide } from 'lucide-react';
import { AgeLevel } from './LevelSelector';
import { NumberPad } from './NumberPad';

interface Problem {
  num1: number;
  num2: number;
  operation: '+' | '-' | '*' | '/';
  answer: number;
}

interface MathProblemProps {
  problem: Problem;
  onAnswer: (answer: number) => void;
  disabled: boolean;
  level: AgeLevel;
  feedback?: 'correct' | 'incorrect' | null;
}

export function MathProblem({ problem, onAnswer, disabled, level, feedback }: MathProblemProps) {
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    // Clear input when new problem is generated
    setUserAnswer('');
  }, [problem]);

  function handleNumberClick(num: number) {
    if (disabled) return;
    setUserAnswer(prev => prev + num.toString());
  }

  function handleBackspace() {
    if (disabled) return;
    setUserAnswer(prev => prev.slice(0, -1));
  }

  function handleClear() {
    if (disabled) return;
    setUserAnswer('');
  }

  function handleEnter() {
    if (userAnswer.trim() === '' || disabled) return;
    
    const answer = parseInt(userAnswer);
    if (!isNaN(answer)) {
      onAnswer(answer);
      setUserAnswer('');
    }
  }

  // Show icons for younger kids
  const showIcons = level === '2-4' || level === '4-8';
  
  // Adjust text size based on level - with responsive sizes
  const numberSize = level === '2-4' 
    ? 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl' 
    : level === '4-8' 
    ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' 
    : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl';
  const operationSize = level === '2-4' 
    ? 'text-5xl sm:text-6xl md:text-7xl' 
    : level === '4-8' 
    ? 'text-4xl sm:text-5xl md:text-6xl' 
    : 'text-3xl sm:text-4xl md:text-5xl';

  // Get operation display details
  const getOperationDisplay = () => {
    switch (problem.operation) {
      case '+':
        return {
          Icon: Plus,
          color: 'purple',
          label: 'add'
        };
      case '-':
        return {
          Icon: Minus,
          color: 'pink',
          label: 'take away'
        };
      case '*':
        return {
          Icon: X,
          color: 'blue',
          label: 'times'
        };
      case '/':
        return {
          Icon: Divide,
          color: 'green',
          label: 'divide'
        };
    }
  };

  const operationDisplay = getOperationDisplay();

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 mb-6">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <span className={numberSize}>{problem.num1}</span>
          </div>
          
          {showIcons ? (
            <div className="flex flex-col items-center">
              <operationDisplay.Icon className="size-8 sm:size-10 md:size-12 text-purple-500 text-pink-500 text-blue-500 text-green-500" strokeWidth={3} />
            </div>
          ) : (
            <span className={`${operationSize} text-purple-500 text-pink-500 text-blue-500 text-green-500`}>
              {problem.operation}
            </span>
          )}
          
          <div className="flex items-center gap-2">
            <span className={numberSize}>{problem.num2}</span>
          </div>
        </div>
      </div>

      {/* Answer Display */}
      <div className="mb-6">
        <div className={`rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 ${
          feedback === 'correct' 
            ? 'bg-gradient-to-br from-green-100 to-emerald-100 ring-4 ring-green-400' 
            : feedback === 'incorrect'
            ? 'bg-gradient-to-br from-red-100 to-red-200 ring-4 ring-red-500'
            : 'bg-gradient-to-br from-purple-100 to-pink-100'
        }`}>
          <div className={`text-sm sm:text-base mb-2 transition-colors ${
            feedback === 'correct'
              ? 'text-green-700'
              : feedback === 'incorrect'
              ? 'text-red-700'
              : 'text-purple-600'
          }`}>
            {level === '2-4' ? 'Your Answer:' : 'Enter Your Answer:'}
          </div>
          <div className={`text-4xl sm:text-5xl md:text-6xl min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center transition-colors ${
            feedback === 'correct'
              ? 'text-green-600'
              : feedback === 'incorrect'
              ? 'text-red-600'
              : 'text-purple-600'
          }`}>
            {userAnswer || '–'}
          </div>
        </div>
      </div>

      {/* Number Pad */}
      <NumberPad
        onNumberClick={handleNumberClick}
        onBackspace={handleBackspace}
        onClear={handleClear}
        onEnter={handleEnter}
        disabled={disabled}
      />
    </div>
  );
}