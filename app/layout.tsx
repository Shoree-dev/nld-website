import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastNotifier from '@/components/ui/ToastNotifier';
import { getCurrentUser } from '@/lib/auth/admin';
import { Suspense } from 'react';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NO LICENSED DRIVERS // CYBERPUNK ARCADE',
  description:
    'NLD Rocket League Underground Circuit. Tournaments, Leaderboard, and Studios.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={`${spaceMono.variable} bg-black text-white`}>
      <body className="min-h-screen bg-black text-white flex flex-col font-mono antialiased overflow-x-hidden selection:bg-[#ff00ff] selection:text-black">
        {/* Retro CRT Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 crt-scanlines" />

        <Suspense fallback={null}>
          <ToastNotifier />
        </Suspense>

        <Navbar user={user} onlineCount={92} />
        <main className="flex-1 w-full bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
