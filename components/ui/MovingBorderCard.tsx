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
  // Ultra-focused travelling beam without static background illumination
  // 90% of the circle is 100% transparent, so only the traveling beam / wave is visible
  const conicBeam =
    glowColor === 'magenta'
      ? 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 88%, rgba(255, 0, 255, 0.4) 93%, #ff00ff 97%, #ffffff 99%, transparent 100%)'
      : glowColor === 'cyan'
      ? 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 88%, rgba(0, 255, 255, 0.4) 93%, #00ffff 97%, #ffffff 99%, transparent 100%)'
      : 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 88%, rgba(255, 0, 255, 0.4) 92%, #ff00ff 95%, #00ffff 98%, #ffffff 99%, transparent 100%)';

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
