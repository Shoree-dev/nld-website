'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto pt-32 pb-16 px-6 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        {/* Massive Void Typography Branding */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-2">
            OFFICIAL ROCKET LEAGUE COMMUNITY
          </span>
          <span className="text-6xl md:text-8xl font-black font-['Teko',sans-serif] tracking-tight leading-none">
            NO LICENSED DRIVERS
          </span>
          <span className="text-sm text-neutral-400 font-mono tracking-widest mt-4">
            EST. 2024 // ALL BRAKES REMOVED // SUPERSONIC ONLY
          </span>
        </div>

        {/* Quick Links Floating in Void */}
        <div className="flex flex-wrap gap-8 md:gap-12 text-sm uppercase tracking-widest font-mono text-neutral-400">
          <Link href="/leaderboard" className="hover:text-[#a855f7] transition-colors">
            LEADERBOARD
          </Link>
          <Link href="/creators" className="hover:text-[#06b6d4] transition-colors">
            NLD STUDIOS
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#06b6d4] transition-colors"
          >
            DISCORD SERVER
          </a>
        </div>
      </div>
    </footer>
  );
}
