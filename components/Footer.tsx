'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-[#ff00ff] mt-auto py-8 px-4 md:px-8 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#0055ff] font-bold">//</span>
          <span className="text-[#ff00ff] font-black tracking-widest">NLD.ARCADE</span>
          <span className="text-neutral-500">
            [OFFICIAL_RL_CIRCUIT_EST.2024]
          </span>
        </div>

        <div className="flex items-center gap-6 text-neutral-400">
          <Link href="/leaderboard" className="hover:text-[#ff00ff] transition-none">
            [LEADERBOARD]
          </Link>
          <Link href="/creators" className="hover:text-[#0055ff] transition-none">
            [NLD_STUDIOS]
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff00ff] transition-none"
          >
            [DISCORD_SERVER]
          </a>
        </div>
      </div>
    </footer>
  );
}
