import { useState, useEffect } from 'react';
import { MathProblem } from './components/MathProblem';
import { ScoreBoard } from './components/ScoreBoard';
import { FeedbackMessage } from './components/FeedbackMessage';
import { LevelSelector, AgeLevel } from './components/LevelSelector';
import { AppTitle } from './components/AppTitle';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from './components/ui/button';

type Operation = '+' | '-' | '*' | '/';

interface Problem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

export default function App() {
  const [level, setLevel] = useState<AgeLevel | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (level) {
      setProblem(generateProblem(level));
    }
  }, [level]);

  function generateProblem(currentLevel: AgeLevel): Problem {
    let operation: Operation;
    let num1: number;
    let num2: number;

    // Adjust difficulty based on age level
    switch (currentLevel) {
      case '2-4':
        // Very simple: numbers under 10, only + and -
        operation = Math.random() > 0.5 ? '+' : '-';
        if (operation === '+') {
          num1 = Math.floor(Math.random() * 8) + 1; // 1-8
          num2 = Math.floor(Math.random() * (9 - num1)) + 1; // Keep sum under 10
        } else {
          num1 = Math.floor(Math.random() * 9) + 1; // 1-9
          num2 = Math.floor(Math.random() * num1) + 1; // ensures positive result
        }
        break;
      
      case '4-8':
        // Medium: numbers under 50, only + and -
        operation = Math.random() > 0.5 ? '+' : '-';
        if (operation === '+') {
          num1 = Math.floor(Math.random() * 40) + 1; // 1-40
          num2 = Math.floor(Math.random() * (49 - num1)) + 1; // Keep sum under 50
        } else {
          num1 = Math.floor(Math.random() * 49) + 1; // 1-49
          num2 = Math.floor(Math.random() * num1) + 1; // ensures positive result
        }
        break;
      
      case '8+':
        // Hard: numbers up to 100, includes * and /
        const operations: Operation[] = ['+', '-', '*', '/'];
        operation = operations[Math.floor(Math.random() * operations.length)];
        
        if (operation === '+') {
          num1 = Math.floor(Math.random() * 80) + 1; // 1-80
          num2 = Math.floor(Math.random() * (99 - num1)) + 1; // Keep sum under 100
        } else if (operation === '-') {
          num1 = Math.floor(Math.random() * 99) + 1; // 1-99
          num2 = Math.floor(Math.random() * num1) + 1; // ensures positive result
        } else if (operation === '*') {
          // Keep multiplication manageable (1-12 times tables)
          num1 = Math.floor(Math.random() * 12) + 1; // 1-12
          num2 = Math.floor(Math.random() * 12) + 1; // 1-12
        } else {
          // Division: ensure whole number results
          num2 = Math.floor(Math.random() * 12) + 1; // divisor 1-12
          const quotient = Math.floor(Math.random() * 12) + 1; // 1-12
          num1 = num2 * quotient; // dividend = divisor × quotient
        }
        break;
    }

    let answer: number;
    if (operation === '+') {
      answer = num1 + num2;
    } else if (operation === '-') {
      answer = num1 - num2;
    } else if (operation === '*') {
      answer = num1 * num2;
    } else {
      answer = num1 / num2;
    }

    return { num1, num2, operation, answer };
  }

  function handleAnswer(userAnswer: number) {
    if (!problem) return;
    
    const isCorrect = userAnswer === problem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Generate new problem after short delay
    setTimeout(() => {
      if (level) {
        setProblem(generateProblem(level));
      }
      setFeedback(null);
    }, 1500);
  }

  function handleReset() {
    setScore(0);
    setTotalAttempts(0);
    setStreak(0);
    if (level) {
      setProblem(generateProblem(level));
    }
    setFeedback(null);
  }

  function handleChangeLevel() {
    setLevel(null);
    setScore(0);
    setTotalAttempts(0);
    setStreak(0);
    setProblem(null);
    setFeedback(null);
  }

  // Show level selector if no level chosen
  if (!level || !problem) {
    return <LevelSelector onSelectLevel={setLevel} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 p-4 sm:p-8 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1">
        <AppTitle
          leftButton={
            <Button
              onClick={handleChangeLevel}
              variant="outline"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-10 w-10 sm:h-12 sm:w-12 p-0 flex-shrink-0"
              aria-label="Change Level"
            >
              <ArrowLeft className="size-5 sm:size-6 text-white" />
            </Button>
          }
          rightButton={
            <Button
              onClick={handleReset}
              variant="outline"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-10 w-10 sm:h-12 sm:w-12 p-0 flex-shrink-0"
              aria-label="Reset"
            >
              <RotateCcw className="size-5 sm:size-6 text-white" />
            </Button>
          }
        />
        
        <div className="flex flex-col flex-1 justify-start pt-4 sm:pt-6 md:pt-8 gap-4 sm:gap-6">
          <ScoreBoard 
            score={score} 
            totalAttempts={totalAttempts}
            streak={streak}
          />

          <MathProblem 
            problem={problem}
            onAnswer={handleAnswer}
            disabled={feedback !== null}
            level={level}
          />

          <div className="flex justify-center min-h-[80px] sm:min-h-[100px] items-center">
            <FeedbackMessage feedback={feedback} />
          </div>
        </div>
      </div>
    </div>
  );
}