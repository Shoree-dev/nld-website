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
  duration = 6.5, // Zwiększone z 4s na 6.5s (płynniejsza, nieco wolniejsza fala)
}: MovingBorderCardProps) {
  // Dłuższa fala (rozciągnięty ogon od 72% do 100%, zamiast od 88%)
  const conicBeam =
    glowColor === 'magenta'
      ? 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 72%, rgba(255, 0, 255, 0.1) 78%, rgba(255, 0, 255, 0.45) 88%, #ff00ff 96%, #ffffff 99%, transparent 100%)'
      : glowColor === 'cyan'
      ? 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 72%, rgba(0, 255, 255, 0.1) 78%, rgba(0, 255, 255, 0.45) 88%, #00ffff 96%, #ffffff 99%, transparent 100%)'
      : 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, rgba(255, 0, 255, 0.2) 76%, #ff00ff 86%, #00ffff 96%, #ffffff 99%, transparent 100%)';

  return (
    <div
      className={`relative p-[1.5px] rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.8)] bg-neutral-900/60 ${className}`}
    >
      {/* The Travelling Neon Wave Beam */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -inset-[150%] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
        style={{
          background: conicBeam,
        }}
      />

      {/* Inner Solid Card Surface */}
      <div className="relative w-full h-full rounded-[15px] bg-[#070716] p-6 z-10">
        {children}
      </div>
    </div>
  );
}
