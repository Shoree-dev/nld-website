'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { VideoItem } from '@/lib/types';
import { Flame, ArrowUpRight, Disc as DiscordIcon, Trophy, Users, Zap, ShieldAlert } from 'lucide-react';

interface HomeHeroProps {
  featuredVideo: VideoItem | null;
  discordInviteUrl?: string;
}

export default function HomeHero({
  featuredVideo,
  discordInviteUrl = 'https://discord.gg',
}: HomeHeroProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-28 flex flex-col items-center text-center select-none overflow-hidden">
      {/* 1. Large Intersecting Blurred Depth Glows Behind Hero Text */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[450px] pointer-events-none -z-10 flex justify-center items-center">
        {/* Neon Magenta Left Glow */}
        <div className="w-[360px] md:w-[480px] h-[360px] md:h-[480px] bg-[#ff00ff]/25 rounded-full blur-[130px] -translate-x-20" />
        {/* Neon Cyan Right Glow */}
        <div className="w-[360px] md:w-[480px] h-[360px] md:h-[480px] bg-[#00ffff]/25 rounded-full blur-[130px] translate-x-20" />
      </div>

      {/* 2. Top Alert Banner: Sleek Pill Shape (If new montage exists) */}
      {featuredVideo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 z-20"
        >
          <Link
            href="/creators"
            className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-fuchsia-500/40 text-xs md:text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:border-fuchsia-400 hover:scale-105 transition-all duration-300"
          >
            <span className="p-1 rounded-full bg-fuchsia-500 text-black">
              <Flame className="w-3.5 h-3.5 fill-black" />
            </span>
            <span className="text-neutral-300">
              New Montage: <strong className="text-white">{featuredVideo.creator_name}</strong> - {featuredVideo.title}
            </span>
            <ArrowUpRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}

      {/* 3. Hero Typography: Massive, Clean, and Highly Readable */}
      <div className="my-10 md:my-16 max-w-5xl flex flex-col items-center">
        <h1 className="font-['Rajdhani',sans-serif] font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-[0.9] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          NO LICENSED
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-white to-cyan-300">
            DRIVERS
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl font-medium text-neutral-300 leading-relaxed">
          The premier chaotic Rocket League community. Supersonic speeds, weekly tournaments, and mechanical mastery.
        </p>
      </div>

      {/* 4. Large Pill-Shaped Glowing Magenta "JOIN OUR DISCORD" CTA */}
      <div className="my-8 md:my-12 z-20">
        <motion.a
          href={discordInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-3.5 px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-[#ff00ff] hover:bg-[#ff2bfb] text-black font-extrabold text-base sm:text-lg uppercase tracking-wider shadow-[0_0_25px_rgba(255,0,255,0.65)] hover:shadow-[0_0_45px_rgba(255,0,255,0.95)] transition-shadow duration-300 focus:outline-none"
        >
          <DiscordIcon className="w-6 h-6 fill-black" />
          <span>JOIN OUR DISCORD</span>
        </motion.a>
      </div>

      {/* 5. Modern Floating Stats Cards: Rounded-2xl with Subtle Neon Glows */}
      <div className="w-full max-w-6xl mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        <div className="rounded-2xl border border-neutral-800/80 bg-[#070714]/80 backdrop-blur-xl p-6 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Community
            </span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block font-['Rajdhani',sans-serif] font-bold text-4xl sm:text-5xl text-white">
            1,420+
          </span>
          <span className="block text-sm text-neutral-400 mt-1">
            Registered Drivers
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-[#070714]/80 backdrop-blur-xl p-6 hover:border-fuchsia-500/40 hover:shadow-[0_0_25px_rgba(255,0,255,0.2)] hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">
              Tournaments
            </span>
            <Trophy className="w-5 h-5 text-fuchsia-400" />
          </div>
          <span className="block font-['Rajdhani',sans-serif] font-bold text-4xl sm:text-5xl text-white">
            Weekly
          </span>
          <span className="block text-sm text-neutral-400 mt-1">
            04:00 PM EST Brackets
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-[#070714]/80 backdrop-blur-xl p-6 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Season Record
            </span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block font-['Rajdhani',sans-serif] font-bold text-4xl sm:text-5xl text-white">
            920 PTS
          </span>
          <span className="block text-sm text-neutral-400 mt-1">
            Apex Driver High Score
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-[#070714]/80 backdrop-blur-xl p-6 hover:border-fuchsia-500/40 hover:shadow-[0_0_25px_rgba(255,0,255,0.2)] hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">
              Rules
            </span>
            <ShieldAlert className="w-5 h-5 text-fuchsia-400" />
          </div>
          <span className="block font-['Rajdhani',sans-serif] font-bold text-4xl sm:text-5xl text-white">
            0% Brakes
          </span>
          <span className="block text-sm text-neutral-400 mt-1">
            Pure Supersonic Flight
          </span>
        </div>
      </div>
    </div>
  );
}
