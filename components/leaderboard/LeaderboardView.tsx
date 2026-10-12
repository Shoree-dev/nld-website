'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LeaderboardEntry } from '@/lib/types';
import { Trophy, AlertTriangle, ShieldX, Award, Sparkles } from 'lucide-react';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardView({ entries }: LeaderboardViewProps) {
  const top1 = entries.find((e) => e.rank === 1) || entries[0];
  const top2 = entries.find((e) => e.rank === 2) || entries[1];
  const top3 = entries.find((e) => e.rank === 3) || entries[2];

  const bottomTenThreshold = Math.max(1, Math.floor(entries.length * 0.9));

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 select-none">
      {/* Header */}
      <div className="mb-14 text-center md:text-left flex flex-col items-center md:items-start">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Season 1 Standings
        </span>
        <h1 className="font-['Rajdhani',sans-serif] font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-tight">
          Tournament Leaderboard
        </h1>
        <p className="mt-2 text-sm md:text-base text-neutral-400 max-w-xl">
          Weekly participation, tournament placements, and MVP awards combined into official season rankings.
        </p>
      </div>

      {/* 1. TOP 3 PODIUM: Sleek Rounded-2xl Glowing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end">
        {/* RANK 2 */}
        {top2 && (
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="order-2 md:order-1">
            <Link
              href={`/profile/${top2.discord_id}`}
              className="block rounded-2xl border border-cyan-500/50 bg-[#070716]/90 backdrop-blur-xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.25)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-bold text-cyan-300">
                  Rank 2
                </span>
                <span className="text-xs text-neutral-400 font-medium">Runner Up</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)] shrink-0">
                  <Image
                    src={top2.avatar_url}
                    alt={top2.player_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white truncate">
                    {top2.player_name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">ID: {top2.discord_id}</p>
                </div>
              </div>

              <div className="border-t border-neutral-800/80 pt-4 flex items-baseline justify-between">
                <span className="text-xs font-medium text-neutral-400">Total Score</span>
                <span className="font-['Rajdhani',sans-serif] font-bold text-3xl text-cyan-400">
                  {top2.total_score} <span className="text-sm text-neutral-500">PTS</span>
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* RANK 1 (Apex Leader) */}
        {top1 && (
          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.2 }} className="order-1 md:order-2 md:-mt-8">
            <Link
              href={`/profile/${top1.discord_id}`}
              className="block rounded-3xl border-2 border-fuchsia-500 bg-[#09071a]/95 backdrop-blur-2xl p-7 shadow-[0_0_35px_rgba(255,0,255,0.45)] hover:shadow-[0_0_55px_rgba(255,0,255,0.7)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-fuchsia-950/70 border border-fuchsia-400 text-xs font-bold text-fuchsia-300 shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                  <Trophy className="w-3.5 h-3.5 text-fuchsia-300" />
                  Apex Champion
                </span>
                <span className="text-xs text-fuchsia-400 font-semibold">Rank 1</span>
              </div>

              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-fuchsia-500 shadow-[0_0_20px_rgba(255,0,255,0.6)] shrink-0">
                  <Image
                    src={top1.avatar_url}
                    alt={top1.player_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Rajdhani',sans-serif] font-black text-3xl text-white truncate">
                    {top1.player_name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">ID: {top1.discord_id}</p>
                </div>
              </div>

              <div className="border-t border-fuchsia-500/30 pt-4 flex items-baseline justify-between">
                <span className="text-xs font-medium text-neutral-400">Total Score</span>
                <span className="font-['Rajdhani',sans-serif] font-black text-4xl text-fuchsia-400 text-glow-magenta">
                  {top1.total_score} <span className="text-base text-neutral-400">PTS</span>
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* RANK 3 */}
        {top3 && (
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="order-3">
            <Link
              href={`/profile/${top3.discord_id}`}
              className="block rounded-2xl border border-cyan-500/50 bg-[#070716]/90 backdrop-blur-xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.25)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-bold text-cyan-300">
                  Rank 3
                </span>
                <span className="text-xs text-neutral-400 font-medium">Podium</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)] shrink-0">
                  <Image
                    src={top3.avatar_url}
                    alt={top3.player_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white truncate">
                    {top3.player_name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">ID: {top3.discord_id}</p>
                </div>
              </div>

              <div className="border-t border-neutral-800/80 pt-4 flex items-baseline justify-between">
                <span className="text-xs font-medium text-neutral-400">Total Score</span>
                <span className="font-['Rajdhani',sans-serif] font-bold text-3xl text-cyan-400">
                  {top3.total_score} <span className="text-sm text-neutral-500">PTS</span>
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* 2. SEASONAL LIST: Clean Modern Cards */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5 md:col-span-4">Driver</div>
          <div className="hidden md:block col-span-2 text-right">Participation</div>
          <div className="hidden md:block col-span-2 text-right">Placement</div>
          <div className="hidden md:block col-span-1 text-right">MVP</div>
          <div className="col-span-6 md:col-span-2 text-right">Total Score</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-2.5">
          {entries.map((entry, index) => {
            const rankNum = entry.rank ?? index + 1;
            const isBottomTen = rankNum >= bottomTenThreshold;

            return (
              <motion.div
                key={entry.id}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={`/profile/${entry.discord_id}`}
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 rounded-xl border border-neutral-800/80 bg-[#060614]/70 backdrop-blur-md hover:border-cyan-400/50 hover:bg-[#0b0b22] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300"
                >
                  {/* Rank */}
                  <div className="col-span-1 font-['Rajdhani',sans-serif] font-bold text-xl text-neutral-300">
                    #{rankNum}
                  </div>

                  {/* Driver Name & Avatar + Badges */}
                  <div className="col-span-5 md:col-span-4 flex items-center gap-3.5 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-neutral-700 shrink-0">
                      <Image
                        src={entry.avatar_url}
                        alt={entry.player_name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0 flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Rajdhani',sans-serif] font-bold text-lg text-white truncate">
                          {entry.player_name}
                        </span>

                        {/* EASTER EGG: Student Driver Badge */}
                        {isBottomTen && !entry.is_banned && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-300 text-[11px] font-semibold flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                            <AlertTriangle className="w-3 h-3" />
                            Student Driver
                          </span>
                        )}

                        {/* EASTER EGG: Banned Badge */}
                        {entry.is_banned && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-400 text-[11px] font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                            <ShieldX className="w-3 h-3" />
                            License Revoked
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 font-mono">ID: {entry.discord_id}</span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="hidden md:block col-span-2 text-right text-sm font-semibold text-neutral-300">
                    {entry.participation_points} <span className="text-xs text-neutral-500">pts</span>
                  </div>

                  <div className="hidden md:block col-span-2 text-right text-sm font-semibold text-neutral-300">
                    {entry.placement_points} <span className="text-xs text-neutral-500">pts</span>
                  </div>

                  <div className="hidden md:block col-span-1 text-right text-sm font-semibold text-neutral-300">
                    {entry.mvp_points}
                  </div>

                  {/* Total Score */}
                  <div className="col-span-6 md:col-span-2 text-right">
                    <span className="font-['Rajdhani',sans-serif] font-bold text-2xl text-cyan-400">
                      {entry.total_score}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 ml-1">PTS</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
