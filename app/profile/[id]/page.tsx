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
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-32 select-none">
      {/* Return to Leaderboard Link */}
      <div className="mb-14">
        <Link
          href="/leaderboard"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO LEADERBOARD</span>
        </Link>
      </div>

      {/* Main Dossier Header floating in void */}
      <div className="relative flex flex-col md:flex-row items-start md:items-end gap-10 md:gap-14 pb-16">
        {/* Floating Avatar grounded by solid purple blob */}
        <div className="relative shrink-0">
          <div
            className="absolute -inset-4 bg-[#a855f7] -z-10 animate-ferrofluid"
            style={{ borderRadius: '45% 55% 65% 35% / 50% 45% 55% 50%' }}
          />
          <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-black">
            <Image
              src={profile.avatar_url || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80'}
              alt={profile.username}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* EASTER EGG: Red "LICENSE REVOKED" stamp overlay if banned */}
          {isBanned && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <span className="stamp-revoked text-lg md:text-xl bg-black/95 px-4 py-1.5 shadow-2xl">
                LICENSE REVOKED
              </span>
            </div>
          )}
        </div>

        {/* Name, Roles, and Identification */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              DISCORD ID: {profile.discord_id}
            </span>

            {/* EASTER EGG: Student Driver badge */}
            {isBottomTen && !isBanned && (
              <span
                className="text-xs uppercase font-mono font-black px-3 py-1 bg-yellow-400 text-black tracking-widest inline-flex items-center gap-1.5"
                style={{ borderRadius: '14px 6px 14px 6px' }}
              >
                <AlertTriangle className="w-3.5 h-3.5 stroke-[3]" />
                STUDENT DRIVER
              </span>
            )}

            {isBanned && (
              <span className="text-xs uppercase font-mono font-black px-3 py-1 bg-red-600 text-white tracking-widest inline-flex items-center gap-1.5">
                <ShieldX className="w-3.5 h-3.5" />
                DISQUALIFIED
              </span>
            )}
          </div>

          <h1 className="font-['Teko',sans-serif] font-black text-7xl md:text-9xl text-white uppercase leading-none tracking-tight">
            {profile.username}
          </h1>

          {/* Roles displayed without containers */}
          <div className="flex flex-wrap gap-3 mt-4">
            {profile.roles?.map((role, idx) => (
              <span
                key={idx}
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 text-black font-bold bg-[#06b6d4]"
                style={{ borderRadius: '30px 10px 30px 10px' }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Driver Stats Grid (Zero Containers, Strict Typography Scale) */}
      <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
        <div>
          <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Trophy className="w-4 h-4 text-[#a855f7]" />
            LEADERBOARD RANK
          </span>
          <span className="font-['Teko',sans-serif] text-7xl md:text-8xl font-black text-white leading-none">
            #{rank}
          </span>
        </div>

        <div>
          <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Star className="w-4 h-4 text-[#06b6d4]" />
            TOTAL SCORE
          </span>
          <span className="font-['Teko',sans-serif] text-7xl md:text-8xl font-black text-[#06b6d4] leading-none">
            {leaderboardEntry?.total_score || 0}
          </span>
        </div>

        <div>
          <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Target className="w-4 h-4 text-[#a855f7]" />
            PLACEMENT POINTS
          </span>
          <span className="font-['Teko',sans-serif] text-7xl md:text-8xl font-black text-white leading-none">
            {leaderboardEntry?.placement_points || 0}
          </span>
        </div>

        <div>
          <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Zap className="w-4 h-4 text-[#06b6d4]" />
            MVP POINTS
          </span>
          <span className="font-['Teko',sans-serif] text-7xl md:text-8xl font-black text-white leading-none">
            {leaderboardEntry?.mvp_points || 0}
          </span>
        </div>
      </div>

      {/* Driver Biography & Setup in Void */}
      <div className="mt-24 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 block">
          DRIVER TELEMETRY & BIO
        </span>
        <p className="text-2xl md:text-3xl font-['Rajdhani',sans-serif] font-bold text-neutral-200 leading-relaxed">
          {profile.bio || 'Active competitive driver in the No Licensed Drivers Rocket League circuit.'}
        </p>

        <div className="mt-8 flex flex-wrap gap-12 font-mono text-sm uppercase tracking-wider text-neutral-400">
          <div>
            <span className="text-neutral-400 block text-xs">FAVORITE CHASSIS</span>
            <span className="text-white font-bold">{profile.favorite_car || 'Octane'}</span>
          </div>
          <div>
            <span className="text-neutral-400 block text-xs">RANK TIER</span>
            <span className="text-white font-bold">{profile.rank_tier || 'Grand Champion'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
