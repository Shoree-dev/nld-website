'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LeaderboardEntry } from '@/lib/types';
import { Trophy, AlertTriangle, ShieldX, Terminal } from 'lucide-react';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardView({ entries }: LeaderboardViewProps) {
  const top1 = entries.find((e) => e.rank === 1) || entries[0];
  const top2 = entries.find((e) => e.rank === 2) || entries[1];
  const top3 = entries.find((e) => e.rank === 3) || entries[2];

  const bottomTenThreshold = Math.max(1, Math.floor(entries.length * 0.9));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 select-none">
      {/* Page Title Header */}
      <div className="border-b border-neutral-800 pb-6 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#0055ff] uppercase tracking-widest mb-1">
          <Terminal className="w-4 h-4" />
          <span>RL_ARCADE // TELEMETRY_RANKINGS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-mono">
          LEADERBOARD // SEASON_01
        </h1>
      </div>

      {/* 1. TOP 3 PODIUM: Brutalist Rectangular Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {/* RANK 2 */}
        {top2 && (
          <Link
            href={`/profile/${top2.discord_id}`}
            className="border-2 border-[#0055ff] p-5 bg-black hover:bg-[#0055ff] hover:text-black group transition-none flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#0055ff] group-hover:text-black tracking-widest uppercase">
                  [RANK_02]
                </span>
                <span className="text-[10px] text-neutral-400 group-hover:text-black uppercase">
                  RUNNER_UP
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 border border-black overflow-hidden shrink-0">
                  <Image
                    src={top2.avatar_url}
                    alt={top2.player_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-lg font-black uppercase truncate block text-white group-hover:text-black font-mono">
                    {top2.player_name}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-black font-mono block">
                    ID: {top2.discord_id}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-800 group-hover:border-black pt-3 flex justify-between items-baseline">
              <span className="text-xs text-neutral-400 group-hover:text-black uppercase">
                TOTAL_PTS:
              </span>
              <span className="text-2xl font-black text-white group-hover:text-black font-mono">
                {top2.total_score}
              </span>
            </div>
          </Link>
        )}

        {/* RANK 1 (Apex Leader) */}
        {top1 && (
          <Link
            href={`/profile/${top1.discord_id}`}
            className="border-2 border-[#ff00ff] p-5 bg-black hover:bg-[#ff00ff] hover:text-black group transition-none flex flex-col justify-between md:-mt-2"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#ff00ff] group-hover:text-black tracking-widest uppercase flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  [RANK_01 // APEX]
                </span>
                <span className="text-[10px] text-neutral-400 group-hover:text-black uppercase font-bold">
                  CHAMPION
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 border-2 border-black overflow-hidden shrink-0">
                  <Image
                    src={top1.avatar_url}
                    alt={top1.player_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xl font-black uppercase truncate block text-white group-hover:text-black font-mono">
                    {top1.player_name}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-black font-mono block">
                    ID: {top1.discord_id}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-800 group-hover:border-black pt-3 flex justify-between items-baseline">
              <span className="text-xs text-neutral-400 group-hover:text-black uppercase font-bold">
                TOTAL_PTS:
              </span>
              <span className="text-3xl font-black text-[#ff00ff] group-hover:text-black font-mono">
                {top1.total_score}
              </span>
            </div>
          </Link>
        )}

        {/* RANK 3 */}
        {top3 && (
          <Link
            href={`/profile/${top3.discord_id}`}
            className="border-2 border-[#0055ff] p-5 bg-black hover:bg-[#0055ff] hover:text-black group transition-none flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#0055ff] group-hover:text-black tracking-widest uppercase">
                  [RANK_03]
                </span>
                <span className="text-[10px] text-neutral-400 group-hover:text-black uppercase">
                  PODIUM
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 border border-black overflow-hidden shrink-0">
                  <Image
                    src={top3.avatar_url}
                    alt={top3.player_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-lg font-black uppercase truncate block text-white group-hover:text-black font-mono">
                    {top3.player_name}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-black font-mono block">
                    ID: {top3.discord_id}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-800 group-hover:border-black pt-3 flex justify-between items-baseline">
              <span className="text-xs text-neutral-400 group-hover:text-black uppercase">
                TOTAL_PTS:
              </span>
              <span className="text-2xl font-black text-white group-hover:text-black font-mono">
                {top3.total_score}
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* 2. SEASONAL LIST (Sharp Structured CSS Grid) */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2 border border-neutral-800 bg-neutral-950 text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
          <div className="col-span-2 md:col-span-1">[POS]</div>
          <div className="col-span-5 md:col-span-4">[PILOT]</div>
          <div className="hidden md:block col-span-2 text-right">[PARTICIPATION]</div>
          <div className="hidden md:block col-span-2 text-right">[PLACEMENT]</div>
          <div className="hidden md:block col-span-1 text-right">[MVP]</div>
          <div className="col-span-5 md:col-span-2 text-right">[TOTAL]</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-1.5">
          {entries.map((entry, index) => {
            const rankNum = entry.rank ?? index + 1;
            const isBottomTen = rankNum >= bottomTenThreshold;

            return (
              <Link
                key={entry.id}
                href={`/profile/${entry.discord_id}`}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 border border-neutral-800 bg-black hover:border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black group transition-none"
              >
                {/* Rank Number */}
                <div className="col-span-2 md:col-span-1 font-mono font-bold text-sm text-neutral-400 group-hover:text-black">
                  #{rankNum < 10 ? `0${rankNum}` : rankNum}
                </div>

                {/* Pilot Name, Avatar & Status Badges */}
                <div className="col-span-5 md:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="relative w-8 h-8 border border-neutral-700 group-hover:border-black shrink-0 overflow-hidden">
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
                      <span className="font-mono font-bold text-sm sm:text-base uppercase truncate text-white group-hover:text-black">
                        {entry.player_name}
                      </span>

                      {/* EASTER EGG: Student Driver Badge */}
                      {isBottomTen && !entry.is_banned && (
                        <span className="px-1.5 py-0.5 border border-yellow-400 text-yellow-400 group-hover:border-black group-hover:text-black text-[9px] uppercase font-bold inline-flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          STUDENT
                        </span>
                      )}

                      {/* EASTER EGG: Banned Badge */}
                      {entry.is_banned && (
                        <span className="px-1.5 py-0.5 border border-red-500 bg-red-950 text-red-400 group-hover:bg-red-600 group-hover:text-white text-[9px] uppercase font-bold inline-flex items-center gap-1">
                          <ShieldX className="w-2.5 h-2.5" />
                          REVOKED
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 group-hover:text-black font-mono">
                      ID: {entry.discord_id}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <div className="hidden md:block col-span-2 text-right font-mono text-sm text-neutral-400 group-hover:text-black">
                  {entry.participation_points} PTS
                </div>

                <div className="hidden md:block col-span-2 text-right font-mono text-sm text-neutral-400 group-hover:text-black">
                  {entry.placement_points} PTS
                </div>

                <div className="hidden md:block col-span-1 text-right font-mono text-sm text-neutral-400 group-hover:text-black">
                  {entry.mvp_points}
                </div>

                {/* Total Score */}
                <div className="col-span-5 md:col-span-2 text-right font-mono font-black text-base sm:text-lg text-[#0055ff] group-hover:text-black">
                  {entry.total_score} PTS
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
