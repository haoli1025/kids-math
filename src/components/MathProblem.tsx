import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Minus, X, Divide } from 'lucide-react';
import { AgeLevel } from './LevelSelector';

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
}

export function MathProblem({ problem, onAnswer, disabled, level }: MathProblemProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clear input when new problem is generated
    setUserAnswer('');
    setShowAnswer(false);
    // Focus input for easy typing
    inputRef.current?.focus();
  }, [problem]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (userAnswer.trim() === '' || disabled) return;
    
    const answer = parseInt(userAnswer);
    if (!isNaN(answer)) {
      const isCorrect = answer === problem.answer;
      if (isCorrect) {
        setShowAnswer(true);
      }
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

  // Get color class based on operation
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'text-purple-500',
      pink: 'text-pink-500',
      blue: 'text-blue-500',
      green: 'text-green-500'
    };
    return colorMap[color] || 'text-purple-500';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <span className={numberSize}>{problem.num1}</span>
          </div>
          
          {showIcons ? (
            <div className="flex flex-col items-center">
              <operationDisplay.Icon className={`size-8 sm:size-10 md:size-12 ${getColorClass(operationDisplay.color)}`} strokeWidth={3} />
            </div>
          ) : (
            <span className={`${operationSize} ${getColorClass(operationDisplay.color)}`}>
              {problem.operation}
            </span>
          )}
          
          <div className="flex items-center gap-2">
            <span className={numberSize}>{problem.num2}</span>
          </div>
          <span className={`${operationSize} text-purple-500`}>=</span>
          <span className={`${numberSize} ${showAnswer ? 'text-green-500' : 'text-gray-300'}`}>
            {showAnswer ? problem.answer : '?'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Input
          ref={inputRef}
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={disabled}
          className="text-2xl sm:text-3xl md:text-4xl text-center h-16 sm:h-20"
          placeholder={level === '2-4' ? "Type your answer" : "Your answer"}
          autoFocus
        />
        <Button 
          type="submit" 
          disabled={disabled || userAnswer.trim() === ''}
          className="h-16 sm:h-20 px-6 sm:px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-base sm:text-lg whitespace-nowrap"
        >
          {level === '2-4' ? 'Check! ✓' : level === '4-8' ? 'Check Answer! ✓' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}