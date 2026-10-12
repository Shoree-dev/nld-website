'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({
  href,
  children,
  className = '',
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#ff00ff] text-black font-extrabold font-['Outfit',sans-serif] tracking-wider uppercase animate-pulse-glow hover:bg-[#ff26ff] transition-colors focus:outline-none cursor-pointer ${className}`}
    >
      {children}
    </motion.a>
  );
}
