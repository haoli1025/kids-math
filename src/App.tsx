import { useState, useEffect, useRef } from 'react';
import { MathProblem } from './components/MathProblem';
import { FeedbackMessage } from './components/FeedbackMessage';
import { LevelSelector, AgeLevel } from './components/LevelSelector';
import { FinalScore } from './components/FinalScore';
import { Sparkles, ArrowLeft } from 'lucide-react';
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
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [usedProblems, setUsedProblems] = useState<Set<string>>(new Set());
  const usedProblemsRef = useRef<Set<string>>(new Set());

  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    if (level && !showFinalScore) {
      // Reset used problems when starting a new level
      usedProblemsRef.current = new Set();
      setUsedProblems(new Set());
      setProblem(generateProblem(level));
    }
  }, [level, showFinalScore]);

  // Create a unique key for a problem (handles commutative operations)
  function getProblemKey(p: Problem): string {
    // For commutative operations (+, *), normalize order
    if (p.operation === '+' || p.operation === '*') {
      const [smaller, larger] = p.num1 <= p.num2 ? [p.num1, p.num2] : [p.num2, p.num1];
      return `${smaller}${p.operation}${larger}`;
    }
    // For non-commutative operations (-, /), order matters
    return `${p.num1}${p.operation}${p.num2}`;
  }

  // Generate a single problem candidate (without checking duplicates)
  function generateProblemCandidate(currentLevel: AgeLevel): Problem {
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

  function generateProblem(currentLevel: AgeLevel): Problem {
    const maxAttempts = 1000; // Prevent infinite loop
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const candidate = generateProblemCandidate(currentLevel);
      const problemKey = getProblemKey(candidate);
      
      // If this problem hasn't been used, mark it and return it
      if (!usedProblemsRef.current.has(problemKey)) {
        usedProblemsRef.current.add(problemKey);
        setUsedProblems(new Set(usedProblemsRef.current));
        return candidate;
      }
      
      attempts++;
    }
    
    // If we've exhausted attempts (very unlikely), return a candidate anyway
    // This handles edge cases where all possible problems have been used
    return generateProblemCandidate(currentLevel);
  }

  function handleAnswer(userAnswer: number) {
    if (!problem) return;
    
    const isCorrect = userAnswer === problem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Generate new problem or show final score after short delay
    setTimeout(() => {
      if (currentQuestion >= TOTAL_QUESTIONS) {
        // Show final score after last question
        setShowFinalScore(true);
      } else {
        // Move to next question
        setCurrentQuestion(prev => prev + 1);
        if (level) {
          setProblem(generateProblem(level));
        }
      }
      setFeedback(null);
    }, 1500);
  }

  function handlePlayAgain() {
    setScore(0);
    setCurrentQuestion(1);
    setShowFinalScore(false);
    usedProblemsRef.current = new Set(); // Reset used problems for new session
    setUsedProblems(new Set());
    if (level) {
      setProblem(generateProblem(level));
    }
    setFeedback(null);
  }

  function handleChangeLevel() {
    setLevel(null);
    setScore(0);
    setCurrentQuestion(1);
    setProblem(null);
    setFeedback(null);
    setShowFinalScore(false);
    usedProblemsRef.current = new Set(); // Reset used problems when changing level
    setUsedProblems(new Set());
  }

  // Show level selector if no level chosen
  if (!level) {
    return <LevelSelector onSelectLevel={setLevel} />;
  }

  // Show final score after completing all questions
  if (showFinalScore) {
    return (
      <FinalScore
        score={score}
        totalQuestions={TOTAL_QUESTIONS}
        onPlayAgain={handlePlayAgain}
        onChangeLevel={handleChangeLevel}
      />
    );
  }

  if (!problem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
            <Sparkles className="size-6 sm:size-8 text-yellow-300 fill-yellow-300" />
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Math Adventure! 
            </h1>
            <Sparkles className="size-6 sm:size-8 text-yellow-300 fill-yellow-300" />
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="text-lg sm:text-xl md:text-2xl text-purple-600">
              Question {currentQuestion} of {TOTAL_QUESTIONS}
            </div>
            <div className="text-lg sm:text-xl md:text-2xl text-purple-600">
              Score: {score}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-purple-200 rounded-full h-3 sm:h-4 overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(currentQuestion / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
          {/* Change Level Button */}
          <Button
            onClick={handleChangeLevel}
            variant="outline"
            className="w-full sm:w-auto text-sm sm:text-base text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            <ArrowLeft className="size-4 mr-2" />
            Change Level
          </Button>
        </div>

        <MathProblem 
          problem={problem}
          onAnswer={handleAnswer}
          disabled={feedback !== null}
          level={level}
          feedback={feedback}
        />

        <FeedbackMessage feedback={feedback} />
      </div>
    </div>
  );
}