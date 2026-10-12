import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlayerProfile, getLeaderboardEntries } from '@/lib/data';
import { ShieldX, AlertTriangle, ArrowLeft, Trophy, Zap, Target, Star } from 'lucide-react';

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
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12 select-none">
      {/* Return Button */}
      <div className="mb-10">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Leaderboard</span>
        </Link>
      </div>

      {/* Main Dossier Card */}
      <div className="rounded-3xl border border-neutral-800 bg-[#070716]/90 backdrop-blur-2xl p-8 md:p-12 mb-10 shadow-[0_0_40px_rgba(0,255,255,0.12)]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Avatar with Glowing Ring */}
          <div className="relative shrink-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-fuchsia-500 shadow-[0_0_30px_rgba(255,0,255,0.5)]">
              <Image
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80'}
                alt={profile.username}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Banned Overlay Badge */}
            {isBanned && (
              <div className="mt-4 text-center">
                <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500 text-red-400 text-xs font-bold inline-flex items-center gap-1 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <ShieldX className="w-3.5 h-3.5" />
                  License Revoked
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h1 className="font-['Rajdhani',sans-serif] font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
                {profile.username}
              </h1>

              {isBottomTen && !isBanned && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)] w-fit mx-auto md:mx-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Student Driver
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-400 font-mono mb-4">
              Discord ID: {profile.discord_id}
            </p>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-2xl mb-6">
              {profile.bio || 'Active competitive driver in the No Licensed Drivers Rocket League circuit.'}
            </p>

            {/* Roles Chips */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
              {profile.roles?.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-xs font-semibold"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl border border-neutral-800/80 bg-[#070716]/80 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-fuchsia-400" />
            <span>Leaderboard Rank</span>
          </div>
          <span className="font-['Rajdhani',sans-serif] font-bold text-4xl text-white">
            #{rank}
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-[#070716]/80 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            <Star className="w-4 h-4 text-cyan-400" />
            <span>Total Points</span>
          </div>
          <span className="font-['Rajdhani',sans-serif] font-bold text-4xl text-cyan-400">
            {leaderboardEntry?.total_score || 0} PTS
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-[#070716]/80 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            <Target className="w-4 h-4 text-neutral-400" />
            <span>Placement Score</span>
          </div>
          <span className="font-['Rajdhani',sans-serif] font-bold text-4xl text-white">
            {leaderboardEntry?.placement_points || 0}
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-[#070716]/80 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-fuchsia-400" />
            <span>MVP Score</span>
          </div>
          <span className="font-['Rajdhani',sans-serif] font-bold text-4xl text-fuchsia-400">
            {leaderboardEntry?.mvp_points || 0}
          </span>
        </div>
      </div>

      {/* Car & Rank specs */}
      <div className="rounded-2xl border border-neutral-800/80 bg-[#070716]/80 backdrop-blur-xl p-6 flex flex-wrap gap-8 text-sm">
        <div>
          <span className="text-neutral-500 block text-xs font-medium">Favorite Car</span>
          <span className="text-white font-bold">{profile.favorite_car || 'Octane'}</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-xs font-medium">Competitive Tier</span>
          <span className="text-white font-bold">{profile.rank_tier || 'Grand Champion'}</span>
        </div>
      </div>
    </div>
  );
}
