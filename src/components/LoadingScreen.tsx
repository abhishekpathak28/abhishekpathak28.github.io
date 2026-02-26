import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-12"
          >
            {/* Outer ring */}
            <motion.div
              className="w-32 h-32 rounded-full border-2 border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Inner ring */}
            <motion.div
              className="absolute inset-2 rounded-full border border-secondary/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="font-display text-3xl font-bold text-primary neon-text-cyan"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AP
              </motion.span>
            </div>

            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(180 100% 50% / 0.2) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Initializing Systems
            </p>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress percentage */}
            <p className="mt-3 font-display text-xs text-primary">
              {Math.min(Math.floor(progress), 100)}%
            </p>
          </motion.div>

          {/* Decorative lines */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
