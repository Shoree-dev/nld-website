'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { loginWithDiscord, signOutAction } from '@/app/actions/auth';
import { Shield, LogOut, User, Disc as DiscordIcon, ChevronDown } from 'lucide-react';

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
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'NLD Studios', href: '/creators' },
  ];

  return (
    <header className="w-full sticky top-0 z-40 bg-[#020208]/75 backdrop-blur-xl border-b border-neutral-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-6">
        {/* Brand / Logo in Outfit font */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <span className="font-['Outfit',sans-serif] font-black text-3xl md:text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff] group-hover:opacity-90 transition-opacity">
            NLD
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800">
            Rocket League
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wider transition-all duration-300 relative py-1 ${
                  isActive
                    ? 'text-cyan-400 drop-shadow-[0_0_12px_rgba(0,255,255,0.7)]'
                    : 'text-neutral-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff00ff] to-[#00ffff] rounded-full shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Status Badge & Auth */}
        <div className="flex items-center gap-5">
          {/* Online Players Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span>{onlineCount} Online</span>
          </div>

          {/* User Profile or Discord Login CTA */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 p-1 rounded-full bg-neutral-900/90 border border-neutral-700/80 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 focus:outline-none"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.4)]">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-white">
                      {user.username.slice(0, 1)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-white pr-1 max-w-[110px] truncate hidden sm:inline">
                  {user.username}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 pr-1 group-hover:rotate-180 transition-transform" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#080814]/95 backdrop-blur-2xl border border-neutral-800 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.9)] z-50 flex flex-col gap-3"
                  >
                    <div className="border-b border-neutral-800/80 pb-3">
                      <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-base font-bold text-white font-['Outfit',sans-serif] truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-neutral-500 font-mono truncate">
                        ID: {user.discordId}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Link
                        href={`/profile/${user.discordId}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
                      >
                        <User className="w-4 h-4 text-cyan-400" />
                        <span>Driver Profile</span>
                      </Link>

                      {user.isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 hover:bg-fuchsia-950/30 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-fuchsia-400" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <form action={signOutAction} className="w-full pt-1">
                        <button
                          type="submit"
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span>Sign Out</span>
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <form action={loginWithDiscord}>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#00ffff] hover:bg-[#33ffff] text-black font-extrabold font-['Outfit',sans-serif] text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
              >
                <DiscordIcon className="w-4 h-4 fill-black" />
                <span>Login with Discord</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
