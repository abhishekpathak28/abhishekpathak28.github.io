import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Skill {
  id: string;
  label: string;
  description: string;
  tools: string[];
  projects: string[];
  angle: number;
  distance: number;
}

const skills: Skill[] = [
  {
    id: 'gameplay',
    label: 'Gameplay Systems',
    description: 'Design and implementation of core game mechanics, player controllers, and interactive systems.',
    tools: ['C#', 'Unity Input System', 'Physics', 'Animation'],
    projects: ['Car Dash 3D', 'Hyper Rally 3D'],
    angle: 0,
    distance: 180,
  },
  {
    id: 'ai',
    label: 'AI & State Machines',
    description: 'Intelligent enemy behavior, pathfinding, and finite state machine implementations.',
    tools: ['FSM', 'Behavior Trees', 'NavMesh', 'A* Pathfinding'],
    projects: ['Zombie Game', 'Hyper Rally 3D'],
    angle: 60,
    distance: 180,
  },
  {
    id: 'camera',
    label: 'Cinemachine & Cameras',
    description: 'Dynamic camera systems, cinematic sequences, and smooth transitions.',
    tools: ['Cinemachine', 'Timeline', 'Virtual Cameras', 'Dolly Tracks'],
    projects: ['Car Dash 3D', 'Zombie Game'],
    angle: 120,
    distance: 180,
  },
  {
    id: 'systems',
    label: 'Game Systems',
    description: 'Save systems, inventory management, progression, and game architecture.',
    tools: ['Addressables', 'ScriptableObjects', 'Dependency Injection', 'Events'],
    projects: ['Ludo Rally', 'Zombie Game'],
    angle: 180,
    distance: 180,
  },
  {
    id: 'mobile',
    label: 'Mobile Optimization',
    description: 'Performance optimization, battery efficiency, and mobile-specific implementations.',
    tools: ['Object Pooling', 'LOD', 'Profiler', 'Texture Compression'],
    projects: ['Car Dash 3D', 'Ludo Rally'],
    angle: 240,
    distance: 180,
  },
  {
    id: 'unreal',
    label: 'Unreal Engine',
    description: 'Currently expanding skills in Unreal Engine for AAA-quality projects.',
    tools: ['Blueprints', 'C++', 'Learning'],
    projects: ['Personal Projects'],
    angle: 300,
    distance: 180,
  },
];

const SkillTree = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [floatOffsets, setFloatOffsets] = useState<{ [key: string]: { x: number; y: number } }>({});

  // Zero gravity floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      const newOffsets: { [key: string]: { x: number; y: number } } = {};
      skills.forEach((skill) => {
        newOffsets[skill.id] = {
          x: Math.sin(Date.now() * 0.001 + skill.angle) * 5,
          y: Math.cos(Date.now() * 0.0008 + skill.angle) * 8,
        };
      });
      setFloatOffsets(newOffsets);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getNodePosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
    };
  };

  return (
    <section id="skills" className="relative min-h-screen py-24 px-4 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          <span className="text-secondary neon-text-magenta">SKILL TREE</span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        <p className="mt-4 text-muted-foreground font-body">Click on nodes to explore skills</p>
      </motion.div>

      {/* Skill Tree Container */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative w-full aspect-square max-w-[600px] mx-auto">
          {/* SVG for everything - lines and nodes */}
          <svg className="absolute inset-0 w-full h-full" viewBox="-300 -300 600 600">
            <defs>
              <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-magenta" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Energy lines from center to each skill */}
            {skills.map((skill) => {
              const pos = getNodePosition(skill.angle, skill.distance);
              const offset = floatOffsets[skill.id] || { x: 0, y: 0 };
              const isHighlighted = hoveredSkill === skill.id || selectedSkill?.id === skill.id;

              return (
                <g key={`line-${skill.id}`}>
                  {/* Dashed line */}
                  <line
                    x1="0"
                    y1="0"
                    x2={pos.x + offset.x}
                    y2={pos.y + offset.y}
                    stroke="hsl(180, 100%, 50%)"
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeDasharray="8 4"
                    strokeOpacity={isHighlighted ? 0.8 : 0.3}
                    style={{
                      animation: 'energy-flow 2s linear infinite',
                    }}
                  />
                  {/* Glow effect */}
                  {isHighlighted && (
                    <line
                      x1="0"
                      y1="0"
                      x2={pos.x + offset.x}
                      y2={pos.y + offset.y}
                      stroke="hsl(180, 100%, 50%)"
                      strokeWidth="6"
                      strokeOpacity="0.3"
                      filter="url(#glow-cyan)"
                    />
                  )}
                </g>
              );
            })}

            {/* Center decorative rings */}
            <circle
              cx="0"
              cy="0"
              r="55"
              fill="none"
              stroke="hsl(300, 100%, 50%)"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 2"
            />
            <circle
              cx="0"
              cy="0"
              r="100"
              fill="none"
              stroke="hsl(180, 100%, 50%)"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />

            {/* Center node - Unity Developer */}
            <g 
              className="cursor-pointer"
              filter="url(#glow-magenta)"
            >
              {/* Hexagon shape */}
              <polygon
                points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25"
                fill="url(#center-gradient)"
                stroke="hsl(300, 100%, 50%)"
                strokeWidth="2"
                strokeOpacity="0.8"
              />
              <defs>
                <linearGradient id="center-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(300, 100%, 50%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Text */}
              <text
                x="0"
                y="-5"
                textAnchor="middle"
                fill="hsl(300, 100%, 50%)"
                fontSize="14"
                fontFamily="Orbitron, sans-serif"
                fontWeight="bold"
              >
                UNITY
              </text>
              <text
                x="0"
                y="12"
                textAnchor="middle"
                fill="hsl(0, 0%, 80%)"
                fontSize="10"
                fontFamily="Orbitron, sans-serif"
              >
                DEVELOPER
              </text>
            </g>

            {/* Skill nodes */}
            {skills.map((skill, index) => {
              const pos = getNodePosition(skill.angle, skill.distance);
              const offset = floatOffsets[skill.id] || { x: 0, y: 0 };
              const isSelected = selectedSkill?.id === skill.id;
              const isHovered = hoveredSkill === skill.id;
              const nodeX = pos.x + offset.x;
              const nodeY = pos.y + offset.y;

              return (
                <g
                  key={skill.id}
                  transform={`translate(${nodeX}, ${nodeY})`}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="cursor-pointer"
                  style={{ opacity: 1 }}
                  filter={isSelected || isHovered ? 'url(#glow-cyan)' : undefined}
                >
                  {/* Hexagon shape */}
                  <polygon
                    points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                    fill={isSelected || isHovered 
                      ? 'rgba(0, 255, 255, 0.2)' 
                      : 'rgba(0, 255, 255, 0.1)'
                    }
                    stroke="hsl(180, 100%, 50%)"
                    strokeWidth={isSelected || isHovered ? 2 : 1}
                    strokeOpacity={isSelected || isHovered ? 0.9 : 0.4}
                    className="transition-all duration-300"
                  />
                  {/* Skill label - split into multiple lines if needed */}
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected || isHovered ? 'hsl(180, 100%, 60%)' : 'hsl(0, 0%, 70%)'}
                    fontSize="9"
                    fontFamily="Orbitron, sans-serif"
                    fontWeight="600"
                    className="transition-all duration-300 pointer-events-none"
                  >
                    {skill.label.split(' ').map((word, i, arr) => (
                      <tspan
                        key={i}
                        x="0"
                        dy={i === 0 ? `${-(arr.length - 1) * 5}px` : '12px'}
                      >
                        {word}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Skill detail panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 w-80 max-w-[90vw]"
          >
            <div className="glass-panel glow-border-cyan p-6 m-4">
              <h3 className="font-display text-lg font-bold text-primary neon-text-cyan mb-3">
                {selectedSkill.label}
              </h3>
              
              <p className="text-foreground/80 text-sm mb-4 font-body">
                {selectedSkill.description}
              </p>

              <div className="mb-4">
                <h4 className="font-display text-xs text-secondary uppercase tracking-wider mb-2">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-xs font-body rounded border border-primary/30 text-primary/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-xs text-secondary uppercase tracking-wider mb-2">
                  Related Projects
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSkill.projects.map((project) => (
                    <span
                      key={project}
                      className="px-2 py-0.5 text-xs font-body rounded border border-secondary/30 text-secondary/80"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="mt-4 w-full cyber-button text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkillTree;
