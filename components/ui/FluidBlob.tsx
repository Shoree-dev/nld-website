'use client';

import { motion } from 'framer-motion';

interface FluidBlobProps {
  color?: 'purple' | 'blue' | 'orange';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'pill';
  className?: string;
  isBreathing?: boolean;
  layoutId?: string;
}

export default function FluidBlob({
  color = 'purple',
  size = 'md',
  className = '',
  isBreathing = true,
  layoutId,
}: FluidBlobProps) {
  // Solid matte colors strictly without gradients
  const colorMap = {
    purple: '#a855f7',
    blue: '#06b6d4',
    orange: '#f97316',
  };

  const hexColor = colorMap[color];

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96',
    hero: 'w-[420px] h-[340px] md:w-[680px] md:h-[480px]',
    pill: 'w-full h-full min-h-[48px]',
  };

  return (
    <motion.div
      layoutId={layoutId}
      className={`pointer-events-none select-none ${sizeClasses[size]} ${
        isBreathing ? 'animate-ferrofluid' : ''
      } ${className}`}
      style={{
        backgroundColor: hexColor,
        borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 1,
      }}
      aria-hidden="true"
    />
  );
}
