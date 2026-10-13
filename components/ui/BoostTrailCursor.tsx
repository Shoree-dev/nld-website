'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function BoostTrailCursor() {
  const [hasMouse, setHasMouse] = useState(false);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const countRef = useRef(0);

  // Smooth springs for cursor head
  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse) is present
    if (window.matchMedia('(pointer: fine)').matches) {
      setHasMouse(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Add trail particles when moving
      if (dist > 4) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        countRef.current += 1;
        const color = countRef.current % 2 === 0 ? '#ff00ff' : '#00ffff';

        setTrail((prev) => [
          ...prev.slice(-14), // keep last 14 particles
          {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            color,
          },
        ]);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [cursorX, cursorY]);

  // Gradually clear stationary trail
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 40);
    return () => clearTimeout(timer);
  }, [trail]);

  if (!hasMouse) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Boost Trail Particles */}
      {trail.map((particle, index) => {
        const progress = (index + 1) / trail.length; // 0 to 1
        const size = 3 + progress * 7; // tapering particle size
        return (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.85, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              left: particle.x,
              top: particle.y,
              width: size,
              height: size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${size * 2}px ${particle.color}`,
            }}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        );
      })}

      {/* Main Cursor Core */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 w-3.5 h-3.5 -ml-[7px] -mt-[7px] rounded-full bg-cyan-400 shadow-[0_0_14px_#00ffff,0_0_24px_#ff00ff] mix-blend-screen"
      />
    </div>
  );
}
