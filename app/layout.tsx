import type { Metadata } from 'next';
import { Rajdhani, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastNotifier from '@/components/ui/ToastNotifier';
import { getCurrentUser } from '@/lib/auth/admin';
import { Suspense } from 'react';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'No Licensed Drivers | Official Rocket League Community',
  description:
    'The premier chaotic Rocket League community. Tournaments, Season Leaderboard, and Freestyle Montages.',
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
      className={`${rajdhani.variable} ${inter.variable} bg-[#020208] text-white selection:bg-[#ff00ff] selection:text-black`}
    >
      <body className="min-h-screen bg-[#020208] text-white flex flex-col font-sans antialiased overflow-x-hidden">
        <Suspense fallback={null}>
          <ToastNotifier />
        </Suspense>

        <Navbar user={user} onlineCount={92} />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
