'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { VideoItem } from '@/lib/types';
import { Flame, ArrowUpRight } from 'lucide-react';

interface HomeHeroProps {
  featuredVideo: VideoItem | null;
  discordInviteUrl?: string;
}

export default function HomeHero({
  featuredVideo,
  discordInviteUrl = 'https://discord.gg',
}: HomeHeroProps) {
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-8 pb-32 px-6 md:px-12 select-none overflow-hidden">
      {/* 1. Dynamic Alert Banner: ONLY if a new featured montage exists */}
      {featuredVideo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="mb-14 relative z-30"
        >
          <Link
            href="/creators"
            className="group relative inline-flex items-center gap-3 py-2 px-6 text-black uppercase tracking-wider font-mono text-xs md:text-sm font-bold"
          >
            {/* Solid matte neon blue blob backing */}
            <div
              className="absolute inset-0 bg-[#06b6d4] -z-10 group-hover:scale-105 transition-transform"
              style={{ borderRadius: '50% 50% 45% 55% / 40% 60% 40% 60%' }}
            />
            <Flame className="w-4 h-4 fill-black stroke-black animate-pulse" />
            <span>
              🔥 NEW MONTAGE: {featuredVideo.creator_name} - {featuredVideo.title}
            </span>
            <ArrowUpRight className="w-4 h-4 stroke-[3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}

      {/* 2. Hero Section: Pure Black Void & Massive Kinetic Typography */}
      <div className="relative flex flex-col items-center justify-center text-center my-12 md:my-20">
        {/* Solid Matte Purple Blob Breathing Behind the Text */}
        <motion.div
          className="absolute -z-10 pointer-events-none w-[340px] h-[260px] sm:w-[500px] sm:h-[380px] md:w-[750px] md:h-[520px] bg-[#a855f7] animate-ferrofluid"
          style={{
            borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
          }}
          animate={{
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Massive Kinetic Typography */}
        <h1 className="font-['Teko',sans-serif] font-black text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] leading-[0.82] tracking-tighter uppercase text-white drop-shadow-none">
          NO LICENSED
          <br />
          <span className="text-white hover:text-black transition-colors duration-300">
            DRIVERS
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base md:text-xl font-mono text-neutral-400 uppercase tracking-[0.25em]">
          CHAOTIC FREESTYLE & COMPETITIVE ROCKET LEAGUE LEAGUE
        </p>
      </div>

      {/* 3. CTA: Giant text "Join our Discord" with snapping blue ferrofluid blob */}
      <div className="mt-12 md:mt-20 relative z-20">
        <a
          href={discordInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
          className="relative inline-block py-6 px-12 md:px-20 group focus:outline-none"
        >
          {/* Framer Motion Blue Ferrofluid Blob Snaps Behind with Spring Physics */}
          {isCtaHovered && (
            <motion.div
              layoutId="cta-blob"
              className="absolute inset-0 bg-[#06b6d4] -z-10"
              style={{
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1.08, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 1,
              }}
            />
          )}

          <span
            className={`font-['Teko',sans-serif] font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-wider transition-colors duration-200 ${
              isCtaHovered ? 'text-black' : 'text-white group-hover:text-black'
            }`}
          >
            JOIN OUR DISCORD
          </span>
        </a>
      </div>

      {/* 4. Invisible Grid Alignment Community Micro-Stats (Zero Containers) */}
      <div className="w-full max-w-6xl mt-36 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 text-left">
        <div>
          <span className="block font-['Teko',sans-serif] font-black text-6xl md:text-8xl leading-none text-white">
            1,420+
          </span>
          <span className="block mt-2 font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400">
            REGISTERED DRIVERS
          </span>
        </div>

        <div>
          <span className="block font-['Teko',sans-serif] font-black text-6xl md:text-8xl leading-none text-[#a855f7]">
            04:00
          </span>
          <span className="block mt-2 font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400">
            WEEKLY TOURNAMENTS
          </span>
        </div>

        <div>
          <span className="block font-['Teko',sans-serif] font-black text-6xl md:text-8xl leading-none text-[#06b6d4]">
            920
          </span>
          <span className="block mt-2 font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400">
            SEASON MVP RECORD
          </span>
        </div>

        <div>
          <span className="block font-['Teko',sans-serif] font-black text-6xl md:text-8xl leading-none text-white">
            0%
          </span>
          <span className="block mt-2 font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400">
            BRAKING ENFORCED
          </span>
        </div>
      </div>
    </div>
  );
}
