import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const getYouTubeEmbedUrl = (url: string, autoplay = true) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const params = autoplay ? '?autoplay=1&mute=1&loop=1&playlist=' + match[1] + '&controls=0&showinfo=0&rel=0' : '?autoplay=1&rel=0';
  return `https://www.youtube.com/embed/${match[1]}${params}`;
};

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  color: 'cyan' | 'magenta';
  image: string;
  videoUrl: string;
}

const projects: Project[] = [
  {
    id: 'car-dash',
    title: 'Car Dash 3D',
    description: 'High-speed racing game with realistic physics and dynamic obstacles.',
    techStack: ['Unity', 'C#', 'Physics', 'Mobile'],
    color: 'cyan',
    image: '/cardash.png',
    videoUrl: 'https://www.youtube.com/embed/E3h5uP7CM5A',
  },
  {
    id: 'hyper-rally',
    title: 'Hyper Rally 3D',
    description: 'Intense rally racing with procedural tracks and multiplayer support.',
    techStack: ['Unity', 'Cinemachine', 'AI', 'Networking'],
    color: 'magenta',
    image: '/hyperrally.png',
    videoUrl: 'https://youtube.com/watch?v=YOUR_VIDEO_ID',
  },
  {
    id: 'ludo-rally',
    title: 'Ludo Rally',
    description: 'Classic board game reimagined with racing elements and power-ups.',
    techStack: ['Unity', 'C#', 'Multiplayer', 'Mobile'],
    color: 'cyan',
    image: '/ludo.png',
    videoUrl: 'https://www.youtube.com/embed/gdsr-vdW_4M',
  },
  {
    id: 'zombie-game',
    title: 'Zombie Game',
    description: 'Survival horror with intelligent zombie AI and atmospheric environments.',
    techStack: ['Unity', 'FSM', 'AI', 'Horror'],
    color: 'magenta',
    image: '/zombie.png',
    videoUrl: 'https://youtu.be/fnmgU9GMuAs?si=4cPDbXXjIzSjbl3t',
  },
];

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          <span className="text-primary neon-text-cyan">PROJECTS</span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </motion.div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-8">
          {/* Prev button */}
          <motion.button
            onClick={prevProject}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cyber-button p-3 hidden md:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Cards container */}
          <div className="relative w-full md:w-[600px] h-[400px] perspective-1000">
            <AnimatePresence mode="popLayout">
              {[-1, 0, 1].map((offset) => {
                const index = (currentIndex + offset + projects.length) % projects.length;
                const project = projects[index];
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${project.id}-${offset}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      x: offset > 0 ? 200 : offset < 0 ? -200 : 0 
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1 : 0.85,
                      x: offset * 120,
                      rotateY: offset * 15,
                      zIndex: isActive ? 10 : 0,
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      x: offset > 0 ? 250 : -250,
                      transition: { duration: 0.4, ease: "easeInOut" }
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.1, 0.25, 1],
                      opacity: { duration: 0.4 }
                    }}
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => isActive && setSelectedProject(project)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className={`w-full h-full glass-panel p-6 flex flex-col justify-between transition-all duration-300 ${
                        isActive
                          ? project.color === 'cyan'
                            ? 'glow-border-cyan border-primary/50'
                            : 'glow-border-magenta border-secondary/50'
                          : 'border-border/30'
                      }`}
                    >
                      {/* Project video preview */}
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-space-mid">
                        <iframe
                          src={getYouTubeEmbedUrl(project.videoUrl)}
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={project.title}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${
                            project.color === 'cyan'
                              ? 'from-primary/20'
                              : 'from-secondary/20'
                          } to-transparent pointer-events-none`}
                        />
                      </div>

                      {/* Project info */}
                      <div>
                        <h3
                          className={`font-display text-xl font-bold mb-2 ${
                            project.color === 'cyan'
                              ? 'text-primary neon-text-cyan'
                              : 'text-secondary neon-text-magenta'
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 text-xs font-body uppercase tracking-wider rounded border ${
                                project.color === 'cyan'
                                  ? 'border-primary/30 text-primary/70'
                                  : 'border-secondary/30 text-secondary/70'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 ${
                            project.color === 'cyan' ? 'bg-primary' : 'bg-secondary'
                          }`}
                          style={{
                            boxShadow:
                              project.color === 'cyan'
                                ? '0 0 10px hsl(180 100% 50%)'
                                : '0 0 10px hsl(300 100% 50%)',
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Next button */}
          <motion.button
            onClick={nextProject}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cyber-button p-3 hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Mobile navigation */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <motion.button
            onClick={prevProject}
            whileTap={{ scale: 0.9 }}
            className="cyber-button p-3"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextProject}
            whileTap={{ scale: 0.9 }}
            className="cyber-button p-3"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-6 glow-border-cyan'
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`glass-panel p-8 max-w-lg w-full ${
                selectedProject.color === 'cyan' ? 'glow-border-cyan' : 'glow-border-magenta'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3
                  className={`font-display text-2xl font-bold ${
                    selectedProject.color === 'cyan'
                      ? 'text-primary neon-text-cyan'
                      : 'text-secondary neon-text-magenta'
                  }`}
                >
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`transition-colors ${
                    selectedProject.color === 'cyan'
                      ? 'text-muted-foreground hover:text-primary'
                      : 'text-muted-foreground hover:text-secondary'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="aspect-video rounded-lg mb-6 overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(selectedProject.videoUrl, false)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={selectedProject.title}
                />
              </div>

              <p className="text-foreground/80 mb-6">{selectedProject.description}</p>

              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-sm font-body uppercase tracking-wider rounded border ${
                      selectedProject.color === 'cyan'
                        ? 'border-primary/30 text-primary/70'
                        : 'border-secondary/30 text-secondary/70'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
