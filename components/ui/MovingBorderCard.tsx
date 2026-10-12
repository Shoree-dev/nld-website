'use client';

import React from 'react';

interface MovingBorderCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'magenta' | 'cyan' | 'both';
  duration?: string;
}

export default function MovingBorderCard({
  children,
  className = '',
  glowColor = 'both',
}: MovingBorderCardProps) {
  // Conic gradient beam definition
  const gradientMap = {
    magenta:
      'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #ff00ff 85%, #ff77ff 95%, transparent 100%)',
    cyan:
      'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #00ffff 85%, #77ffff 95%, transparent 100%)',
    both:
      'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 60%, #ff00ff 75%, #00ffff 90%, transparent 100%)',
  };

  return (
    <div
      className={`relative p-[1.5px] rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* Moving Laser Beam around Perimeter */}
      <div
        className="absolute inset-[-150%] animate-spin-slow pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background: gradientMap[glowColor],
        }}
      />

      {/* Inner Card Surface */}
      <div className="relative w-full h-full rounded-[15px] bg-[#070716]/90 backdrop-blur-xl p-6 z-10">
        {children}
      </div>
    </div>
  );
}
