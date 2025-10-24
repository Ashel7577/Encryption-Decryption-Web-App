import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 100;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles?.push({
        x: Math.random() * canvas?.width,
        y: Math.random() * canvas?.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(16, 185, 129, ',
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02
      });
    }
    setParticles(newParticles);

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      // Create gradient background
      const gradient = ctx?.createRadialGradient(
        canvas?.width / 2, 
        canvas?.height / 2, 
        0, 
        canvas?.width / 2, 
        canvas?.height / 2, 
        Math.max(canvas?.width, canvas?.height)
      );
      gradient?.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient?.addColorStop(0.5, 'rgba(15, 23, 42, 0.98)');
      gradient?.addColorStop(1, 'rgba(15, 23, 42, 1)');
      
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Update and draw particles
      newParticles?.forEach((particle, index) => {
        // Update particle position
        particle.x += particle?.vx;
        particle.y += particle?.vy;
        particle.angle += particle?.angleSpeed;

        // Mouse interaction
        const dx = mousePosition?.x - particle?.x;
        const dy = mousePosition?.y - particle?.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        // Boundary check
        if (particle?.x < 0 || particle?.x > canvas?.width) particle.vx *= -1;
        if (particle?.y < 0 || particle?.y > canvas?.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas?.width, particle?.x));
        particle.y = Math.max(0, Math.min(canvas?.height, particle?.y));

        // Draw particle
        ctx?.save();
        ctx?.translate(particle?.x, particle?.y);
        ctx?.rotate(particle?.angle);
        
        const pulseSize = particle?.size + Math.sin(Date.now() * 0.001 + index) * 0.5;
        ctx?.beginPath();
        ctx?.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle?.color + particle?.opacity + ')';
        ctx?.fill();
        
        // Add glow effect
        ctx.shadowColor = particle?.color + '0.8)';
        ctx.shadowBlur = 10;
        ctx?.fill();
        
        ctx?.restore();

        // Draw connections
        newParticles?.slice(index + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx?.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      setMousePosition({ x: e?.clientX, y: e?.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition?.x, mousePosition?.y]);

  return (
    <>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 1) 100%)' }}
      />
      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-accent/10 rounded-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>
      {/* Floating Hexagons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)]?.map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            <div className="w-16 h-16 border border-success/15 rotate-45 rounded-sm backdrop-blur-sm" />
          </motion.div>
        ))}
      </div>
      {/* Pulsing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(4)]?.map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-md"
            style={{
              width: 120 + i * 40,
              height: 120 + i * 40,
              left: `${20 + i * 20}%`,
              top: `${15 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
              filter: ['blur(1px)', 'blur(3px)', 'blur(1px)'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}
      </div>
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0',
          }}
        />
      </div>
      {/* Scanning Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-success/5 to-transparent"
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />
      </div>
    </>
  );
};

export default AnimatedBackground;
