'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { loginWithDiscord, signOutAction } from '@/app/actions/auth';
import { Shield, LogOut, User, Terminal } from 'lucide-react';

interface NavbarProps {
  user: {
    id: string;
    discordId: string;
    username: string;
    avatarUrl: string | null;
    isAdmin: boolean;
  } | null;
  onlineCount?: number;
}

export default function Navbar({ user, onlineCount = 92 }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { label: '[LEADERBOARD]', href: '/leaderboard' },
    { label: '[NLD_STUDIOS]', href: '/creators' },
  ];

  return (
    <header className="w-full bg-black border-b border-[#ff00ff] select-none sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="text-[#0055ff] font-black text-2xl tracking-tighter">
              //
            </span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-[#ff00ff] group-hover:text-white transition-none">
              NLD.ARCADE
            </span>
          </Link>
          <span className="hidden lg:inline-block text-[11px] text-neutral-500 font-mono tracking-wider">
            [RL_CIRCUIT_v2.0]
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase border transition-none ${
                  isActive
                    ? 'bg-[#ff00ff] text-black border-[#ff00ff]'
                    : 'text-neutral-300 border-transparent hover:border-[#ff00ff] hover:text-[#ff00ff]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: System Status & Auth */}
        <div className="flex items-center gap-4">
          {/* LED Arcade Online Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 border border-neutral-800 text-[11px] font-mono tracking-wider text-neutral-400">
            <span className="w-2 h-2 bg-[#0055ff] inline-block animate-pulse" />
            <span>SYS_ONLINE: {onlineCount}</span>
          </div>

          {/* User Account / Discord Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-2.5 py-1 border border-[#ff00ff] bg-black text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-none focus:outline-none"
              >
                <div className="relative w-5 h-5 overflow-hidden border border-black shrink-0">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-[10px]">
                      {user.username.slice(0, 1)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold tracking-wider uppercase max-w-[100px] truncate">
                  {user.username}
                </span>
                <span className="text-[10px]">▼</span>
              </button>

              {/* Sharp Brutalist Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-black border-2 border-[#ff00ff] p-4 z-50 flex flex-col gap-3">
                  <div className="border-b border-neutral-800 pb-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                      PILOT IDENTIFIER
                    </span>
                    <span className="text-sm font-bold text-white block truncate">
                      {user.username}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      ID: {user.discordId}
                    </span>
                  </div>

                  <Link
                    href={`/profile/${user.discordId}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 p-1.5 text-xs text-neutral-300 hover:bg-[#0055ff] hover:text-white transition-none"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>[PILOT_DOSSIER]</span>
                  </Link>

                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 p-1.5 text-xs text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-none font-bold"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>[SYS_ADMIN_CONSOLE]</span>
                    </Link>
                  )}

                  <form action={signOutAction} className="w-full pt-1 border-t border-neutral-800">
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 p-1.5 text-xs text-red-500 hover:bg-red-600 hover:text-white transition-none text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>[TERMINATE_SESSION]</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <form action={loginWithDiscord}>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase border-2 border-[#0055ff] bg-black text-[#0055ff] hover:bg-[#0055ff] hover:text-black transition-none flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>[CONNECT_DISCORD]</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
