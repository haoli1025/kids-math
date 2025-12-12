import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Star, Heart, Smile, Sparkles, ThumbsUp, PartyPopper } from 'lucide-react';

interface FeedbackMessageProps {
  feedback: 'correct' | 'incorrect' | null;
}

const encouragingMessages = {
  correct: [
    { text: "You're a Star!", icon: Star, emoji: "🌟" },
    { text: "Super Smart!", icon: Sparkles, emoji: "🎉" },
    { text: "Way to Go!", icon: ThumbsUp, emoji: "👏" },
    { text: "You Rock!", icon: PartyPopper, emoji: "🎊" },
    { text: "Amazing Work!", icon: Heart, emoji: "💖" },
    { text: "You Did It!", icon: Smile, emoji: "😊" },
    { text: "Awesome Job!", icon: CheckCircle, emoji: "✨" },
    { text: "Perfect!", icon: Star, emoji: "⭐" },
    { text: "Fantastic!", icon: Sparkles, emoji: "🚀" },
  ],
  incorrect: [
    { text: "Keep Trying!", icon: Heart, emoji: "💪" },
    { text: "You Can Do It!", icon: ThumbsUp, emoji: "👍" },
    { text: "Try Again!", icon: Smile, emoji: "😊" },
    { text: "Almost There!", icon: Sparkles, emoji: "✨" },
    { text: "Don't Give Up!", icon: Star, emoji: "💫" },
    { text: "Good Effort!", icon: Heart, emoji: "❤️" },
  ]
};

export function FeedbackMessage({ feedback }: FeedbackMessageProps) {
  // Get message only if feedback is correct, and memoize it so it doesn't change on re-renders
  const messageObj = useMemo(() => {
    if (feedback === 'correct') {
      const messages = encouragingMessages.correct;
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return null;
  }, [feedback]);

  const Icon = messageObj?.icon;

  return (
    <AnimatePresence mode="wait">
      {feedback === 'correct' && messageObj && Icon && (
        <motion.div 
          key="feedback-correct"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
        {/* Full Screen Overlay for Correct Answers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
        >
          {/* Confetti-like elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: '50%', 
                x: '50%',
                scale: 0,
                rotate: 0 
              }}
              animate={{ 
                y: `${Math.random() * 100 - 50}%`,
                x: `${Math.random() * 100 - 50}%`,
                scale: [0, 1.2],
                rotate: Math.random() * 360,
                opacity: [1, 0]
              }}
              transition={{ 
                duration: 1.2,
                delay: i * 0.02,
                ease: "easeOut"
              }}
              className="absolute text-4xl sm:text-5xl md:text-6xl"
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              {['✨', '⭐', '🌟', '💫', '🎉'][i % 5]}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Feedback Card */}
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ 
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{ scale: 0, opacity: 0, y: -50 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
        >
          <motion.div
            animate={{
              rotate: [0, 5],
              scale: [1, 1.05]
            }}
            transition={{
              duration: 0.5,
              repeat: 2,
              repeatType: "reverse"
            }}
            className="inline-flex flex-col items-center gap-4 sm:gap-6 px-8 sm:px-12 md:px-16 py-6 sm:py-8 md:py-12 rounded-3xl sm:rounded-[3rem] shadow-2xl bg-gradient-to-br from-green-400 via-emerald-400 to-green-500 text-white"
            style={{
              boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.5)'
            }}
          >
            {/* Icon with animation */}
            <motion.div
              animate={{
                scale: [1, 1.2],
                rotate: [0, 360]
              }}
              transition={{
                duration: 0.6,
                repeat: 2,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Icon className="size-16 sm:size-20 md:size-24 lg:size-28" strokeWidth={2.5} />
            </motion.div>

            {/* Message Text */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3"
              >
                {messageObj.text}
              </motion.div>
              
              {/* Emoji */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {messageObj.emoji}
              </motion.div>
            </div>

            {/* Shimmer animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-2 bg-white/30 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1,
                  repeat: 1,
                  ease: "linear"
                }}
                className="h-full w-1/3 bg-white/50"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}