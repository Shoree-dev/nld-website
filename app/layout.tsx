import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastNotifier from '@/components/ui/ToastNotifier';
import AuroraBackground from '@/components/ui/AuroraBackground';
import { getCurrentUser } from '@/lib/auth/admin';
import { Suspense } from 'react';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'No Licensed Drivers | Official Rocket League Circuit',
  description:
    'The premier competitive and freestyle Rocket League community. Tournaments, Season Leaderboard, and Studios.',
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
      className={`${outfit.variable} ${inter.variable} bg-[#020208] text-white selection:bg-[#ff00ff] selection:text-black`}
    >
      <body className="min-h-screen bg-[#020208] text-white flex flex-col font-sans antialiased overflow-x-hidden">
        {/* Dynamic Animated Aurora / Spotlight Background */}
        <AuroraBackground />

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
