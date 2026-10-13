'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MovingBorderCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'magenta' | 'cyan' | 'both';
  duration?: number;
}

export default function MovingBorderCard({
  children,
  className = '',
  glowColor = 'both',
  duration = 4,
}: MovingBorderCardProps) {
  // Aceternity UI style moving beam gradient
  const gradientMap = {
    magenta:
      'radial-gradient(#ff00ff 40%, rgba(255, 0, 255, 0.4) 70%, transparent 100%)',
    cyan:
      'radial-gradient(#00ffff 40%, rgba(0, 255, 255, 0.4) 70%, transparent 100%)',
    both:
      'radial-gradient(#ff00ff 30%, #00ffff 70%, transparent 100%)',
  };

  return (
    <div
      className={`relative p-[1.5px] rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Moving Laser Beam rotating 360deg continuously via Framer Motion */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -inset-[150%] pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 75%, ${
            glowColor === 'magenta'
              ? '#ff00ff 90%, #ffaaff 98%'
              : glowColor === 'cyan'
              ? '#00ffff 90%, #aaffff 98%'
              : '#ff00ff 85%, #00ffff 98%'
          }, transparent 100%)`,
        }}
      />

      {/* Subtle Traveling Radial Glow Point */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -inset-[100%] pointer-events-none opacity-60 group-hover:opacity-100"
        style={{
          background: gradientMap[glowColor],
          filter: 'blur(16px)',
        }}
      />

      {/* Inner Solid Card Surface */}
      <div className="relative w-full h-full rounded-[15px] bg-[#070716]/95 backdrop-blur-xl p-6 z-10 border border-neutral-900/60">
        {children}
      </div>
    </div>
  );
}
