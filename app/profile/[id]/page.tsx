import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlayerProfile, getLeaderboardEntries } from '@/lib/data';
import { ShieldX, AlertTriangle, ArrowLeft, Trophy, Zap, Target, Star, Terminal } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const { profile, leaderboardEntry } = await getPlayerProfile(id);
  const allEntries = await getLeaderboardEntries();

  if (!profile) {
    notFound();
  }

  const isBanned = profile.is_banned || leaderboardEntry?.is_banned || false;
  const rank = leaderboardEntry?.rank || 99;
  const bottomTenThreshold = Math.max(1, Math.floor(allEntries.length * 0.9));
  const isBottomTen = rank >= bottomTenThreshold;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-10 select-none">
      {/* Return Link */}
      <div className="mb-8">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-[#ff00ff] transition-none border border-neutral-800 px-3 py-1.5 bg-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[RETURN_TO_LEADERBOARD]</span>
        </Link>
      </div>

      {/* Main Dossier Card (Sharp 2px Neon Border) */}
      <div className="border-2 border-[#ff00ff] p-6 md:p-8 bg-black mb-8 relative">
        {/* Corner notches */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#ff00ff]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff00ff]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#ff00ff]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#ff00ff]" />

        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0055ff] tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>PILOT_DOSSIER // SECTOR_RECORD</span>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            DISCORD_ID: {profile.discord_id}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          {/* Avatar with Sharp Frame */}
          <div className="relative shrink-0">
            <div className="relative w-28 h-28 md:w-36 md:h-36 border-2 border-white overflow-hidden bg-neutral-900">
              <Image
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80'}
                alt={profile.username}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* EASTER EGG: Banned Stamp */}
            {isBanned && (
              <div className="mt-2 text-center">
                <span className="px-2 py-1 border border-red-500 bg-red-950 text-red-400 font-bold text-[10px] uppercase font-mono block">
                  [REVOKED // DISQUALIFIED]
                </span>
              </div>
            )}
          </div>

          {/* Pilot Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl sm:text-4xl font-black uppercase text-white font-mono tracking-tight">
                {profile.username}
              </h1>

              {isBottomTen && !isBanned && (
                <span className="px-2 py-0.5 border border-yellow-400 bg-black text-yellow-400 text-xs font-bold font-mono inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  [STUDENT_DRIVER]
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-mono mb-4 leading-relaxed">
              {profile.bio || 'Active competitive driver in the No Licensed Drivers Rocket League circuit.'}
            </p>

            {/* Roles Chips */}
            <div className="flex flex-wrap gap-2">
              {profile.roles?.map((role, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 border border-neutral-700 bg-black text-[#0055ff] text-[11px] font-mono uppercase font-bold"
                >
                  [{role}]
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Stats Grid (Sharp 1px Borders) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-neutral-800 p-4 bg-black">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
            <Trophy className="w-3.5 h-3.5 text-[#ff00ff]" />
            CURRENT_RANK
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            #{rank}
          </span>
        </div>

        <div className="border border-neutral-800 p-4 bg-black">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
            <Star className="w-3.5 h-3.5 text-[#0055ff]" />
            TOTAL_SCORE
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#0055ff] font-mono">
            {leaderboardEntry?.total_score || 0} PTS
          </span>
        </div>

        <div className="border border-neutral-800 p-4 bg-black">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
            <Target className="w-3.5 h-3.5 text-neutral-400" />
            PLACEMENT_PTS
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            {leaderboardEntry?.placement_points || 0}
          </span>
        </div>

        <div className="border border-neutral-800 p-4 bg-black">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
            <Zap className="w-3.5 h-3.5 text-[#ff00ff]" />
            MVP_POINTS
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#ff00ff] font-mono">
            {leaderboardEntry?.mvp_points || 0}
          </span>
        </div>
      </div>

      {/* Specs Panel */}
      <div className="border border-neutral-800 p-4 bg-black flex flex-wrap gap-8 text-xs font-mono">
        <div>
          <span className="text-neutral-500 block text-[10px]">CHASSIS_SPEC</span>
          <span className="text-white font-bold">{profile.favorite_car || 'Octane'}</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px]">TIER_CLASSIFICATION</span>
          <span className="text-white font-bold">{profile.rank_tier || 'Grand Champion'}</span>
        </div>
      </div>
    </div>
  );
}
