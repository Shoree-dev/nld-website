import type { Metadata } from 'next';
import { Teko, Rajdhani, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastNotifier from '@/components/ui/ToastNotifier';
import { getCurrentUser } from '@/lib/auth/admin';
import { Suspense } from 'react';

const teko = Teko({
  variable: '--font-teko',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'No Licensed Drivers | NLD Rocket League Community',
  description:
    'The premier chaotic Rocket League community. Weekly tournaments, season leaderboards, and freestyle montages by Bob & Strazak.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${teko.variable} ${rajdhani.variable} ${inter.variable} bg-black text-white selection:bg-[#a855f7] selection:text-black`}
    >
      <body className="min-h-screen bg-black text-white flex flex-col font-['Inter',sans-serif] antialiased overflow-x-hidden">
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
