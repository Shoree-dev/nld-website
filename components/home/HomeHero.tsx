'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { VideoItem } from '@/lib/types';
import MagneticButton from '@/components/ui/MagneticButton';
import MovingBorderCard from '@/components/ui/MovingBorderCard';
import { Flame, ArrowUpRight, Disc as DiscordIcon, Trophy, Users, Zap, ShieldAlert } from 'lucide-react';

interface HomeHeroProps {
  featuredVideo: VideoItem | null;
  discordInviteUrl?: string;
}

export default function HomeHero({
  featuredVideo,
  discordInviteUrl = 'https://discord.gg',
}: HomeHeroProps) {
  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-32 flex flex-col items-center text-center select-none"
    >
      {/* 1. Dynamic Alert Banner (Stagger Item 1) */}
      {featuredVideo && (
        <motion.div variants={itemVariants} className="mb-10 z-20">
          <Link
            href="/creators"
            className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-fuchsia-500/40 text-xs md:text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:border-fuchsia-400 hover:scale-105 transition-all duration-300"
          >
            <span className="p-1 rounded-full bg-[#ff00ff] text-black">
              <Flame className="w-3.5 h-3.5 fill-black" />
            </span>
            <span className="text-neutral-300">
              New Montage: <strong className="text-white">{featuredVideo.creator_name}</strong> - {featuredVideo.title}
            </span>
            <ArrowUpRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}

      {/* 2. Hero Title: Outfit Font, Heavy Weight, Flawless Gradient (Stagger Item 2) */}
      <motion.div variants={itemVariants} className="my-6 md:my-10 max-w-5xl flex flex-col items-center">
        <h1 className="font-['Outfit',sans-serif] font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.92] text-white">
          NO LICENSED
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#d946ef] to-[#00ffff] drop-shadow-[0_0_35px_rgba(255,0,255,0.4)]">
            DRIVERS
          </span>
        </h1>
      </motion.div>

      {/* 3. Subtitle: Inter Font, Light Gray, Constrained max-w-2xl (Stagger Item 3) */}
      <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-10">
        <p className="text-base sm:text-lg md:text-xl font-normal text-neutral-300 leading-relaxed">
          The premier chaotic Rocket League community. Supersonic speeds, weekly tournaments, and mechanical mastery.
        </p>
      </motion.div>

      {/* 4. Magnetic Spring CTA Button with Pulsing Neon Aura (Stagger Item 4) */}
      <motion.div variants={itemVariants} className="my-4 z-20">
        <MagneticButton
          href={discordInviteUrl}
          className="px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg shadow-[0_0_25px_rgba(255,0,255,0.7)]"
        >
          <div className="flex items-center gap-3.5">
            <DiscordIcon className="w-6 h-6 fill-black" />
            <span>JOIN OUR DISCORD</span>
          </div>
        </MagneticButton>
      </motion.div>

      {/* 5. Moving Border Stats Cards (Aceternity UI Style) (Stagger Item 5) */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-6xl mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
      >
        <MovingBorderCard glowColor="cyan">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-['Outfit',sans-serif]">
              Community
            </span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            1,420+
          </span>
          <span className="block text-sm text-neutral-400 mt-1 font-normal">
            Registered Drivers
          </span>
        </MovingBorderCard>

        <MovingBorderCard glowColor="magenta">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 font-['Outfit',sans-serif]">
              Tournaments
            </span>
            <Trophy className="w-5 h-5 text-fuchsia-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            Weekly
          </span>
          <span className="block text-sm text-neutral-400 mt-1 font-normal">
            04:00 PM EST Brackets
          </span>
        </MovingBorderCard>

        <MovingBorderCard glowColor="both">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-['Outfit',sans-serif]">
              Season Record
            </span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            920 PTS
          </span>
          <span className="block text-sm text-neutral-400 mt-1 font-normal">
            Apex Driver High Score
          </span>
        </MovingBorderCard>

        <MovingBorderCard glowColor="magenta">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 font-['Outfit',sans-serif]">
              Rules
            </span>
            <ShieldAlert className="w-5 h-5 text-fuchsia-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            0% Brakes
          </span>
          <span className="block text-sm text-neutral-400 mt-1 font-normal">
            Pure Supersonic Flight
          </span>
        </MovingBorderCard>
      </motion.div>
    </motion.div>
  );
}
