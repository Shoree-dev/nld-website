'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VideoItem } from '@/lib/types';
import NeonButton from '@/components/ui/NeonButton';
import { Flame, ArrowUpRight, Disc as DiscordIcon, Trophy, Users, Zap, ShieldAlert } from 'lucide-react';

interface HomeHeroProps {
  featuredVideo: VideoItem | null;
  discordInviteUrl?: string;
}

export default function HomeHero({
  featuredVideo,
  discordInviteUrl = 'https://discord.gg',
}: HomeHeroProps) {
  const [onlineCount, setOnlineCount] = useState<number>(73);
  const [memberCount, setMemberCount] = useState<number>(1420);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/discord-stats');
        if (res.ok) {
          const data = await res.json();
          if (typeof data.approximate_presence_count === 'number') {
            setOnlineCount(data.approximate_presence_count);
          }
          if (typeof data.approximate_member_count === 'number') {
            setMemberCount(data.approximate_member_count);
          }
        }
      } catch (err) {
        console.error('Failed to load stats in HomeHero', err);
      }
    }

    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.35,
        duration: 0.75,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-28 flex flex-col items-center text-center select-none"
    >
      {/* 1. Dynamic Alert Banner (Stagger Item 1) */}
      {featuredVideo && (
        <motion.div variants={itemVariants} className="mb-10 z-20">
          <Link
            href="/creators"
            className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 hover:border-fuchsia-500/50 text-xs md:text-sm font-semibold text-neutral-300 hover:text-white shadow-[0_0_20px_rgba(255,0,255,0.18)] hover:shadow-[0_0_28px_rgba(255,0,255,0.4)] transition-all duration-300"
          >
            <span className="p-1 rounded-full bg-[#ff00ff] text-black">
              <Flame className="w-3.5 h-3.5 fill-black" />
            </span>
            <span>
              New Montage: <strong className="text-white font-bold">{featuredVideo.creator_name}</strong> - {featuredVideo.title}
            </span>
            <ArrowUpRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}

      {/* 2. Hero Title: Outfit Font, Heavy Weight, Flawless Gradient (Stagger Item 2) */}
      <motion.div variants={itemVariants} className="my-4 md:my-8 max-w-5xl flex flex-col items-center">
        <h1 className="font-['Outfit',sans-serif] font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.92] text-white">
          NO LICENSED
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#d946ef] to-[#00ffff] drop-shadow-[0_0_35px_rgba(255,0,255,0.45)]">
            DRIVERS
          </span>
        </h1>
      </motion.div>

      {/* 3. Subtitle: Inter Font, Light Gray text-gray-300, Constrained max-w-2xl (Stagger Item 3) */}
      <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-10">
        <p className="text-base sm:text-lg md:text-xl font-normal text-gray-300 leading-relaxed">
          The premier chaotic Rocket League community. Supersonic speeds, weekly tournaments, and mechanical mastery.
        </p>
      </motion.div>

      {/* 4. UIverse Style Neon Button (Stagger Item 4) */}
      <motion.div variants={itemVariants} className="my-4 z-20">
        <NeonButton href={discordInviteUrl}>
          <DiscordIcon className="w-6 h-6 fill-current" />
          <span>JOIN OUR DISCORD</span>
        </NeonButton>
      </motion.div>

      {/* 5. shadcn/ui Inspired Clean Stats Cards (Stagger Item 5) */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-6xl mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
      >
        <div className="rounded-xl border border-neutral-900 bg-neutral-950/70 p-6 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_22px_rgba(0,255,255,0.22)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-['Outfit',sans-serif]">
              Live Drivers
            </span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            {onlineCount} Online
          </span>
          <span className="block text-sm text-gray-400 mt-1 font-normal">
            {memberCount.toLocaleString()}+ Community Drivers
          </span>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-neutral-950/70 p-6 backdrop-blur-md hover:border-fuchsia-500/40 hover:shadow-[0_0_22px_rgba(255,0,255,0.22)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 font-['Outfit',sans-serif]">
              Tournaments
            </span>
            <Trophy className="w-5 h-5 text-fuchsia-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            Weekly
          </span>
          <span className="block text-sm text-gray-400 mt-1 font-normal">
            04:00 PM EST Brackets
          </span>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-neutral-950/70 p-6 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_22px_rgba(0,255,255,0.22)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-['Outfit',sans-serif]">
              Season Record
            </span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            920 PTS
          </span>
          <span className="block text-sm text-gray-400 mt-1 font-normal">
            Apex Driver High Score
          </span>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-neutral-950/70 p-6 backdrop-blur-md hover:border-fuchsia-500/40 hover:shadow-[0_0_22px_rgba(255,0,255,0.22)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 font-['Outfit',sans-serif]">
              Rules
            </span>
            <ShieldAlert className="w-5 h-5 text-fuchsia-400" />
          </div>
          <span className="block font-['Outfit',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight">
            0% Brakes
          </span>
          <span className="block text-sm text-gray-400 mt-1 font-normal">
            Pure Supersonic Flight
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
