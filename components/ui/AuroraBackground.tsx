'use client';

import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#020208]">
      {/* Top Left Floating Magenta Orb */}
      <motion.div
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#ff00ff]/15 blur-[140px]"
        animate={{
          x: [0, 100, -80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Top Right Floating Cyan Orb */}
      <motion.div
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-[#00ffff]/15 blur-[150px]"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, -90, 70, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center Deep Purple Ambient Glow */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-[#a855f7]/10 blur-[160px]"
        animate={{
          x: [0, 70, -70, 0],
          y: [0, -50, 60, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
