'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LeaderboardEntry } from '@/lib/types';
import { Award, AlertTriangle, ShieldX } from 'lucide-react';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardView({ entries }: LeaderboardViewProps) {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Top 3 for the floating podium
  const top1 = entries.find((e) => e.rank === 1) || entries[0];
  const top2 = entries.find((e) => e.rank === 2) || entries[1];
  const top3 = entries.find((e) => e.rank === 3) || entries[2];

  // Determine bottom 10% threshold
  const bottomTenThreshold = Math.max(1, Math.floor(entries.length * 0.9));

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-32 select-none">
      {/* Page Title in massive esports typography */}
      <div className="mb-20">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400">
          SEASON 1 // OFFICIAL STANDINGS
        </span>
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black font-['Teko',sans-serif] uppercase tracking-tighter leading-none text-white">
          THE LEADERBOARD
        </h1>
      </div>

      {/* 1. THE PODIUM: Floating Top 3 (No literal podium box) */}
      <div className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-end justify-center">
        {/* RANK 2 */}
        {top2 && (
          <Link
            href={`/profile/${top2.discord_id}`}
            className="group relative flex flex-col items-center text-center order-2 md:order-1"
          >
            {/* Massive Number Behind */}
            <span className="absolute -top-16 font-['Teko',sans-serif] text-8xl md:text-[12rem] font-black text-neutral-800 -z-20 leading-none select-none group-hover:text-neutral-700 transition-colors">
              2
            </span>
            {/* Grounding Liquid Shape */}
            <div
              className="absolute w-44 h-44 bg-[#06b6d4] -z-10 group-hover:scale-110 transition-transform duration-300"
              style={{ borderRadius: '55% 45% 40% 60% / 60% 50% 50% 40%' }}
            />
            {/* Floating Avatar */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 overflow-hidden rounded-full">
              <Image
                src={top2.avatar_url}
                alt={top2.player_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-xs font-mono tracking-widest text-[#06b6d4] uppercase">
              RUNNER UP
            </span>
            <span className="text-4xl md:text-5xl font-black font-['Teko',sans-serif] text-white uppercase group-hover:text-[#06b6d4] transition-colors">
              {top2.player_name}
            </span>
            <span className="font-mono text-2xl font-bold text-white">
              {top2.total_score}{' '}
              <span className="text-xs text-neutral-400 font-mono">PTS</span>
            </span>
          </Link>
        )}

        {/* RANK 1 (Apex Champion) */}
        {top1 && (
          <Link
            href={`/profile/${top1.discord_id}`}
            className="group relative flex flex-col items-center text-center order-1 md:order-2 -mt-8 md:-mt-12"
          >
            {/* Massive Number Behind */}
            <span className="absolute -top-24 font-['Teko',sans-serif] text-9xl md:text-[15rem] font-black text-neutral-800 -z-20 leading-none select-none group-hover:text-neutral-700 transition-colors">
              1
            </span>
            {/* Grounding Liquid Shape */}
            <div
              className="absolute w-56 h-56 bg-[#a855f7] -z-10 animate-ferrofluid group-hover:scale-115 transition-transform duration-300"
              style={{ borderRadius: '40% 60% 65% 35% / 45% 55% 45% 55%' }}
            />
            {/* Floating Avatar */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 overflow-hidden rounded-full ring-4 ring-black">
              <Image
                src={top1.avatar_url}
                alt={top1.player_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#a855f7] uppercase font-bold">
              <Award className="w-4 h-4" />
              <span>APEX CHAMPION</span>
            </div>
            <span className="text-5xl md:text-7xl font-black font-['Teko',sans-serif] text-white uppercase tracking-tight group-hover:text-[#a855f7] transition-colors">
              {top1.player_name}
            </span>
            <span className="font-mono text-3xl font-black text-white">
              {top1.total_score}{' '}
              <span className="text-sm text-neutral-400 font-mono">PTS</span>
            </span>
          </Link>
        )}

        {/* RANK 3 */}
        {top3 && (
          <Link
            href={`/profile/${top3.discord_id}`}
            className="group relative flex flex-col items-center text-center order-3"
          >
            {/* Massive Number Behind */}
            <span className="absolute -top-16 font-['Teko',sans-serif] text-8xl md:text-[12rem] font-black text-neutral-800 -z-20 leading-none select-none group-hover:text-neutral-700 transition-colors">
              3
            </span>
            {/* Grounding Liquid Shape */}
            <div
              className="absolute w-40 h-40 bg-[#06b6d4] -z-10 group-hover:scale-110 transition-transform duration-300"
              style={{ borderRadius: '50% 50% 35% 65% / 55% 45% 55% 45%' }}
            />
            {/* Floating Avatar */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 overflow-hidden rounded-full">
              <Image
                src={top3.avatar_url}
                alt={top3.player_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-xs font-mono tracking-widest text-[#06b6d4] uppercase">
              PODIUM
            </span>
            <span className="text-4xl md:text-5xl font-black font-['Teko',sans-serif] text-white uppercase group-hover:text-[#06b6d4] transition-colors">
              {top3.player_name}
            </span>
            <span className="font-mono text-2xl font-bold text-white">
              {top3.total_score}{' '}
              <span className="text-xs text-neutral-400 font-mono">PTS</span>
            </span>
          </Link>
        )}
      </div>

      {/* 2. SEASONAL LIST (Zero HTML <table> and Zero Borders) */}
      <div className="w-full">
        {/* Invisible Grid Header */}
        <div className="grid grid-cols-12 gap-4 pb-6 text-xs font-mono uppercase tracking-widest text-neutral-400 px-6">
          <div className="col-span-1">RANK</div>
          <div className="col-span-5 md:col-span-4">DRIVER</div>
          <div className="hidden md:block col-span-2 text-right">PARTICIPATION</div>
          <div className="hidden md:block col-span-2 text-right">PLACEMENT</div>
          <div className="hidden md:block col-span-1 text-right">MVP</div>
          <div className="col-span-6 md:col-span-2 text-right">TOTAL SCORE</div>
        </div>

        {/* Containerless List Items */}
        <div className="flex flex-col gap-3">
          {entries.map((entry, index) => {
            const isHovered = hoveredRowId === entry.id;
            const isBottomTen = (entry.rank ?? index + 1) >= bottomTenThreshold;

            return (
              <div
                key={entry.id}
                onMouseEnter={() => setHoveredRowId(entry.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className="relative py-4 px-6 focus:outline-none"
              >
                {/* Magnetic Ferrofluid Hover Blob using Framer Motion layoutId */}
                {isHovered && (
                  <motion.div
                    layoutId="leaderboard-row-highlight"
                    className="absolute inset-0 bg-[#a855f7] -z-10"
                    style={{
                      borderRadius: '50px 30px 45px 35px / 30px 45px 35px 50px',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 15,
                      mass: 1,
                    }}
                  />
                )}

                <Link
                  href={`/profile/${entry.discord_id}`}
                  className="grid grid-cols-12 gap-4 items-center"
                >
                  {/* Rank */}
                  <div
                    className={`col-span-1 font-['Teko',sans-serif] text-4xl md:text-5xl font-black leading-none ${
                      isHovered ? 'text-black' : 'text-neutral-400'
                    }`}
                  >
                    #{entry.rank ?? index + 1}
                  </div>

                  {/* Player Name & Avatar + Easter Eggs */}
                  <div className="col-span-5 md:col-span-4 flex items-center gap-4 relative">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={entry.avatar_url}
                        alt={entry.player_name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col relative">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-['Rajdhani',sans-serif] font-black text-2xl md:text-3xl leading-tight uppercase tracking-tight ${
                            isHovered ? 'text-black' : 'text-white'
                          }`}
                        >
                          {entry.player_name}
                        </span>

                        {/* EASTER EGG 1: Student Driver Badge (Bottom 10%) */}
                        {isBottomTen && !entry.is_banned && (
                          <span
                            className="text-[10px] uppercase font-mono font-black px-2 py-0.5 bg-yellow-400 text-black tracking-widest inline-flex items-center gap-1"
                            style={{ borderRadius: '12px 6px 12px 6px' }}
                            title="Student Driver: Bottom 10% on the leaderboard"
                          >
                            <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                            <span>STUDENT DRIVER</span>
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-xs font-mono ${
                          isHovered ? 'text-neutral-900' : 'text-neutral-400'
                        }`}
                      >
                        ID: {entry.discord_id}
                      </span>
                    </div>

                    {/* EASTER EGG 2: Banned Player - "License Revoked" Stamp Overlay */}
                    {entry.is_banned && (
                      <div className="absolute left-14 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                        <span className="stamp-revoked flex items-center gap-1.5 text-xs md:text-sm bg-black/90">
                          <ShieldX className="w-4 h-4 stroke-[3]" />
                          LICENSE REVOKED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Points Breakdown */}
                  <div
                    className={`hidden md:block col-span-2 text-right font-mono font-bold text-lg ${
                      isHovered ? 'text-black' : 'text-neutral-400'
                    }`}
                  >
                    {entry.participation_points}
                  </div>

                  <div
                    className={`hidden md:block col-span-2 text-right font-mono font-bold text-lg ${
                      isHovered ? 'text-black' : 'text-neutral-400'
                    }`}
                  >
                    {entry.placement_points}
                  </div>

                  <div
                    className={`hidden md:block col-span-1 text-right font-mono font-bold text-lg ${
                      isHovered ? 'text-black' : 'text-neutral-400'
                    }`}
                  >
                    {entry.mvp_points}
                  </div>

                  {/* Total Score */}
                  <div className="col-span-6 md:col-span-2 text-right">
                    <span
                      className={`font-['Teko',sans-serif] text-4xl md:text-5xl font-black leading-none ${
                        isHovered ? 'text-black' : 'text-white'
                      }`}
                    >
                      {entry.total_score}
                    </span>
                    <span
                      className={`text-xs font-mono ml-1.5 ${
                        isHovered ? 'text-neutral-900' : 'text-neutral-400'
                      }`}
                    >
                      PTS
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
