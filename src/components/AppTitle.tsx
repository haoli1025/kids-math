import { Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface AppTitleProps {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

export function AppTitle({ leftButton, rightButton }: AppTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-4">
      <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 flex items-center justify-center">
        {leftButton}
      </div>
      
      <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 shadow-lg flex-1 justify-center min-w-0">
        <Sparkles className="size-5 sm:size-6 md:size-8 text-yellow-300 fill-yellow-300 flex-shrink-0" />
        <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl truncate">
          Math Adventure! 
        </h1>
        <Sparkles className="size-5 sm:size-6 md:size-8 text-yellow-300 fill-yellow-300 flex-shrink-0" />
      </div>

      <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 flex items-center justify-center">
        {rightButton}
      </div>
    </div>
  );
}

