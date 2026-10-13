'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NeonButton({
  href,
  children,
  className = '',
}: NeonButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className={`relative group inline-flex items-center justify-center rounded-full px-10 py-5 text-base sm:text-lg font-extrabold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: '#09090b',
        border: '1.5px solid rgba(255, 0, 255, 0.7)',
        boxShadow: '0 0 20px rgba(255, 0, 255, 0.35)',
      }}
    >
      {/* Background Fill on Hover (UIverse style smooth fill) */}
      <span
        className="absolute inset-0 rounded-full bg-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          boxShadow: '0 0 45px rgba(255, 0, 255, 0.95), 0 0 80px rgba(255, 0, 255, 0.6)',
        }}
      />

      {/* Subtle Cyan Edge Accent */}
      <span className="absolute -inset-px rounded-full border border-cyan-400/40 opacity-50 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

      {/* Content with color inversion on hover */}
      <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-black font-['Outfit',sans-serif] transition-colors duration-300 font-extrabold">
        {children}
      </span>
    </motion.a>
  );
}
