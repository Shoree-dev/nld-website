'use client';

import { useState } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { loginWithDiscord, signOutAction, simulateUserSwitch } from '@/app/actions/auth';
import { Shield, LogOut, Disc as DiscordIcon, User, ChevronDown } from 'lucide-react';

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

export default function Navbar({ user, onlineCount = 84 }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { label: 'LEADERBOARD', href: '/leaderboard' },
    { label: 'STUDIOS', href: '/creators' },
  ];

  return (
    <header className="w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between z-40 bg-black">
      {/* 1. Floating Logo in the Void */}
      <div className="relative group">
        <NextLink href="/" className="relative inline-block py-2">
          {/* Subtle fluid blob behind logo on hover */}
          <motion.div
            className="absolute -inset-2 bg-[#a855f7] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          />
          <span className="font-extrabold tracking-tighter text-4xl md:text-5xl font-['Rajdhani',sans-serif] uppercase text-white group-hover:text-black transition-colors duration-200">
            NLD
          </span>
        </NextLink>
      </div>

      {/* 2. Navigation Links & Discord Widget */}
      <nav className="flex items-center gap-8 md:gap-14">
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div
                key={item.href}
                className="relative py-2"
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {/* Magnetic fluid blob on hover/active */}
                {(hoveredNav === item.href || isActive) && (
                  <motion.div
                    layoutId="navbar-blob"
                    className="absolute inset-0 bg-[#06b6d4] -z-10"
                    style={{
                      borderRadius: '50% 50% 45% 55% / 40% 60% 40% 60%',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 15,
                      mass: 1,
                    }}
                  />
                )}
                <NextLink
                  href={item.href}
                  className={`text-lg md:text-xl font-bold tracking-wider font-['Rajdhani',sans-serif] uppercase transition-colors duration-200 px-4 py-1.5 ${
                    hoveredNav === item.href || isActive
                      ? 'text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </NextLink>
              </div>
            );
          })}
        </div>

        {/* Discord Online Players Widget */}
        <div className="hidden sm:flex items-center gap-3 py-1 px-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#06b6d4]"></span>
          </span>
          <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-400 font-mono">
            {onlineCount} DRIVERS ONLINE
          </span>
        </div>

        {/* 3. Auth CTA or User Avatar Dropdown */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative flex items-center gap-3 py-1 group focus:outline-none"
              aria-expanded={dropdownOpen}
            >
              {/* Fluid blob behind active avatar */}
              <div
                className="absolute -inset-1.5 bg-[#a855f7] -z-10 group-hover:scale-110 transition-transform duration-300"
                style={{
                  borderRadius: '45% 55% 60% 40% / 50% 60% 40% 50%',
                }}
              />
              <div className="relative w-10 h-10 md:w-11 md:h-11 overflow-hidden" style={{ borderRadius: '50%' }}>
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.username}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold text-white">
                    {user.username.slice(0, 1)}
                  </div>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Liquid Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                  className="absolute right-0 mt-4 w-64 bg-black p-5 z-50 flex flex-col gap-4 text-left"
                  style={{
                    borderRadius: '35% 65% 50% 50% / 50% 40% 60% 50%',
                    backgroundColor: '#0a0a0a',
                  }}
                >
                  <div className="px-2 pt-1">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                      IDENTIFIED DRIVER
                    </p>
                    <p className="text-xl font-bold font-['Rajdhani',sans-serif] text-white truncate">
                      {user.username}
                    </p>
                    <p className="text-xs text-neutral-400 font-mono truncate">
                      ID: {user.discordId}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <NextLink
                      href={`/profile/${user.discordId}`}
                      onClick={() => setDropdownOpen(false)}
                      className="group/item flex items-center gap-3 px-3 py-2 text-sm font-semibold tracking-wider text-neutral-300 hover:text-black relative"
                    >
                      <motion.div
                        className="absolute inset-0 bg-[#06b6d4] -z-10 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        style={{ borderRadius: '40% 60% 50% 50% / 50% 50% 50% 50%' }}
                      />
                      <User className="w-4 h-4" />
                      <span>DRIVER DOSSIER</span>
                    </NextLink>

                    {/* ADMIN DASHBOARD: Render ONLY if user passes Admin Check */}
                    {user.isAdmin && (
                      <NextLink
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="group/item flex items-center gap-3 px-3 py-2 text-sm font-black tracking-widest text-[#a855f7] hover:text-black relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-[#a855f7] -z-10 opacity-0 group-hover/item:opacity-100 transition-opacity"
                          style={{ borderRadius: '50% 50% 60% 40% / 40% 60% 50% 50%' }}
                        />
                        <Shield className="w-4 h-4 stroke-[2.5]" />
                        <span>ADMIN DASHBOARD</span>
                      </NextLink>
                    )}

                    <form action={signOutAction} className="w-full">
                      <button
                        type="submit"
                        className="group/item w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold tracking-wider text-neutral-400 hover:text-black relative text-left"
                      >
                        <motion.div
                          className="absolute inset-0 bg-neutral-200 -z-10 opacity-0 group-hover/item:opacity-100 transition-opacity"
                          style={{ borderRadius: '50% 50% 50% 50%' }}
                        />
                        <LogOut className="w-4 h-4" />
                        <span>SIGN OUT</span>
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
              className="relative group py-2 px-5 inline-flex items-center gap-2.5 overflow-visible focus:outline-none"
            >
              {/* Solid matte neon blue blob morphing behind CTA */}
              <motion.div
                className="absolute inset-0 bg-[#06b6d4] -z-10 group-hover:scale-105 transition-transform"
                style={{
                  borderRadius: '45% 55% 65% 35% / 50% 45% 55% 50%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                  mass: 1,
                }}
              />
              <DiscordIcon className="w-5 h-5 text-black" />
              <span className="text-sm md:text-base font-black tracking-wider uppercase text-black font-['Rajdhani',sans-serif]">
                LOGIN WITH DISCORD
              </span>
            </button>
          </form>
        )}
      </nav>
    </header>
  );
}
