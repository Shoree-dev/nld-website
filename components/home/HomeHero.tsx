'use client';

import Link from 'next/link';
import { VideoItem } from '@/lib/types';
import { Zap, Radio } from 'lucide-react';

interface HomeHeroProps {
  featuredVideo: VideoItem | null;
  discordInviteUrl?: string;
}

export default function HomeHero({
  featuredVideo,
  discordInviteUrl = 'https://discord.gg',
}: HomeHeroProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col items-center text-center select-none">
      {/* 1. Boxed Dynamic Alert Banner (If new montage exists) */}
      {featuredVideo && (
        <div className="mb-10 w-full max-w-2xl">
          <Link
            href="/creators"
            className="block border border-[#0055ff] bg-black p-2.5 text-xs text-neutral-300 hover:border-[#ff00ff] hover:text-[#ff00ff] transition-none group"
          >
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="w-2 h-2 bg-[#ff00ff] inline-block animate-pulse" />
              <span className="text-[#ff00ff] font-bold">[NEW_DROP]:</span>
              <span className="font-bold truncate max-w-md">
                {featuredVideo.creator_name} - {featuredVideo.title}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                [PRESS TO VIEW]
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* 2. Constrained, Centered Title & Brand */}
      <div className="border-2 border-[#ff00ff] p-6 md:p-12 w-full max-w-3xl bg-black mb-10 relative">
        {/* Corner Accent notches */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#ff00ff]" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff00ff]" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#ff00ff]" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#ff00ff]" />

        <div className="flex items-center justify-center gap-2 mb-4 text-xs tracking-widest text-[#0055ff] font-bold">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>RL_UNDERGROUND_SECTOR_01</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none font-mono">
          NO LICENSED
          <br />
          <span className="text-[#ff00ff]">DRIVERS</span>
        </h1>

        <p className="mt-6 text-xs sm:text-sm text-neutral-400 font-mono tracking-wider max-w-xl mx-auto">
          HIGH-OCTANE FREESTYLE // ZERO BRAKING PERMITTED // WEEKLY ARCADE SHOWDOWNS
        </p>
      </div>

      {/* 3. Retro Arcade "INSERT COIN / JOIN DISCORD" Button */}
      <div className="mb-16">
        <a
          href={discordInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 md:px-14 py-4 md:py-5 border-2 border-[#ff00ff] bg-black text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black hover-flicker-magenta transition-none focus:outline-none"
        >
          <div className="flex items-center gap-3 text-base sm:text-xl font-black tracking-widest uppercase font-mono">
            <Zap className="w-5 h-5 fill-current" />
            <span>[INSERT COIN // JOIN DISCORD]</span>
            <span className="animate-cursor inline-block font-black">_</span>
          </div>
        </a>
      </div>

      {/* 4. Structured CSS Grid Micro-Stats (Sharp 1px Borders) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="border border-neutral-800 p-4 bg-black">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            REG_PILOTS
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            1,420+
          </span>
        </div>

        <div className="border border-neutral-800 p-4 bg-black">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            BRACKETS_FREQ
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#0055ff] font-mono">
            WEEKLY
          </span>
        </div>

        <div className="border border-neutral-800 p-4 bg-black">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            HIGH_SCORE
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#ff00ff] font-mono">
            920 PTS
          </span>
        </div>

        <div className="border border-neutral-800 p-4 bg-black">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            BRAKES_ENABLED
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            FALSE
          </span>
        </div>
      </div>
    </div>
  );
}
