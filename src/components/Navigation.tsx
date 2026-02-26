import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 right-0 z-50 p-6"
    >
      <div className="glass-panel px-6 py-3 flex gap-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative px-4 py-2 font-display text-sm uppercase tracking-wider text-foreground/70 transition-colors hover:text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {hoveredIndex === index && (
              <motion.div
                layoutId="navHighlight"
                className="absolute inset-0 rounded border border-primary/50 glow-border-cyan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <motion.span
              className="absolute bottom-0 left-1/2 h-0.5 bg-primary"
              initial={{ width: 0, x: '-50%' }}
              animate={{
                width: hoveredIndex === index ? '80%' : 0,
                x: '-50%',
              }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: '0 0 10px hsl(180 100% 50% / 0.8)',
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
