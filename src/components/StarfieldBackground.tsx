import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const starCount = 200;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula glow
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        300
      );
      gradient1.addColorStop(0, 'rgba(0, 245, 255, 0.05)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        400
      );
      gradient2.addColorStop(0, 'rgba(255, 0, 255, 0.03)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax offset based on mouse
      const parallaxX = (mouseRef.current.x - canvas.width / 2) * 0.02;
      const parallaxY = (mouseRef.current.y - canvas.height / 2) * 0.02;

      // Draw and animate stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(Date.now() * 0.001 * star.speed + star.x) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX * star.speed,
          star.y + parallaxY * star.speed,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Add glow to larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(
            star.x + parallaxX * star.speed,
            star.y + parallaxY * star.speed,
            star.size * 2,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(0, 245, 255, ${star.opacity * twinkle * 0.2})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      {/* Floating nebula blobs */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, hsl(180 100% 50% / 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, hsl(300 100% 50% / 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
};

export default StarfieldBackground;
