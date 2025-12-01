import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Star, Heart, Smile, Sparkles, ThumbsUp, PartyPopper } from 'lucide-react';

interface FeedbackMessageProps {
  feedback: 'correct' | 'incorrect' | null;
}

const encouragingMessages = {
  correct: [
    { text: "You're a Star!", icon: Star },
    { text: "Super Smart!", icon: Sparkles },
    { text: "Way to Go!", icon: ThumbsUp },
    { text: "You Rock!", icon: PartyPopper },
    { text: "Amazing Work!", icon: Heart },
    { text: "You Did It!", icon: Smile },
    { text: "Awesome Job!", icon: CheckCircle },
  ],
  incorrect: [
    { text: "Keep Trying!", icon: Heart },
    { text: "You Can Do It!", icon: ThumbsUp },
    { text: "Try Again!", icon: Smile },
    { text: "Almost There!", icon: Sparkles },
    { text: "Don't Give Up!", icon: Star },
  ]
};

export function FeedbackMessage({ feedback }: FeedbackMessageProps) {
  if (!feedback) return null;

  const messages = encouragingMessages[feedback];
  const messageObj = messages[Math.floor(Math.random() * messages.length)];
  const Icon = messageObj.icon;

  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: -20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center"
        >
          <div
            className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-3xl shadow-xl ${
              feedback === 'correct'
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-orange-400 to-amber-500 text-white'
            }`}
          >
            <Icon className="size-6 sm:size-7 md:size-8 flex-shrink-0" strokeWidth={2.5} />
            <span className="text-xl sm:text-2xl md:text-3xl">{messageObj.text}</span>
            {feedback === 'correct' && <span className="text-2xl sm:text-3xl md:text-4xl">✨</span>}
            {feedback === 'incorrect' && <span className="text-2xl sm:text-3xl md:text-4xl">💪</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}