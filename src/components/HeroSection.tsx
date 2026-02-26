import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-10 opacity-30" />

      {/* HUD corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/40" />

      {/* Main content */}
      <div className="relative z-20 text-center px-4">
        {/* Profile placeholder */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto mb-8 w-32 h-32"
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary/50 glow-border-cyan animate-spin-slow" />
          <div
            className="absolute inset-2 rounded-full border border-secondary/30"
            style={{ animationDirection: 'reverse' }}
          />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center">
            <span className="font-display text-2xl text-primary neon-text-cyan">AP</span>
          </div>
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-3 h-3 bg-primary rounded-full glow-border-cyan"
            style={{ top: '50%', left: '50%' }}
            animate={{
              x: [60, 0, -60, 0, 60],
              y: [0, -60, 0, 60, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider">
            <span className="text-foreground neon-text-cyan">ABHISHEK</span>
            <br />
            <span className="text-primary neon-text-cyan">PATHAK</span>
          </h1>
          
          {/* Hologram effect lines */}
          <motion.div
            className="absolute -inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 relative"
        >
          <div className="inline-block glass-panel px-8 py-3">
            <p className="font-display text-lg md:text-xl tracking-[0.3em] text-secondary neon-text-magenta">
              UNITY GAME DEVELOPER
            </p>
          </div>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex justify-center gap-6 text-xs font-body uppercase tracking-wider text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Available for Work</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
            <span>India</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToProjects}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="font-body text-xs uppercase tracking-widest"></span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 group-hover:text-primary transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative hexagon grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.4 24.8,50.6 12.3,43.4 12.3,29.2"
              fill="none"
              stroke="hsl(180 100% 50%)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
