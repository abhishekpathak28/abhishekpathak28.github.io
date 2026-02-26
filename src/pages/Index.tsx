import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarfieldBackground from '@/components/StarfieldBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillTree from '@/components/SkillTree';
import ContactSection from '@/components/ContactSection';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen overflow-x-hidden"
          >
            <StarfieldBackground />
            <Navigation />
            
            <main className="relative z-10">
              <HeroSection />
              <ProjectsSection />
              <SkillTree />
              <ContactSection />
            </main>

            {/* Global decorative elements */}
            <div className="fixed left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none z-30" />
            <div className="fixed right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none z-30" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
