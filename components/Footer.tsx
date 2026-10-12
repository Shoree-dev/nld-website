'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#020208] border-t border-neutral-800/80 mt-auto py-10 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="font-['Rajdhani',sans-serif] font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            NLD
          </span>
          <span className="text-xs text-neutral-500 font-medium">
            © {new Date().getFullYear()} No Licensed Drivers. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
          <Link href="/leaderboard" className="hover:text-cyan-400 transition-colors">
            Leaderboard
          </Link>
          <Link href="/creators" className="hover:text-fuchsia-400 transition-colors">
            NLD Studios
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Discord Server
          </a>
        </div>
      </div>
    </footer>
  );
}
