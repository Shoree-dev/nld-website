import { getFeaturedVideo } from '@/lib/data';
import HomeHero from '@/components/home/HomeHero';

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const featuredVideo = await getFeaturedVideo();
  const discordInvite = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg';

  return (
    <div className="w-full bg-black min-h-[calc(100vh-140px)] flex flex-col justify-center">
      <HomeHero
        featuredVideo={featuredVideo}
        discordInviteUrl={discordInvite}
      />
    </div>
  );
}
