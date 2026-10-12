import { getLeaderboardEntries } from '@/lib/data';
import LeaderboardView from '@/components/leaderboard/LeaderboardView';

export const revalidate = 30; // Revalidate standings every 30s

export default async function LeaderboardPage() {
  const entries = await getLeaderboardEntries();

  return (
    <div className="w-full bg-black min-h-screen">
      <LeaderboardView entries={entries} />
    </div>
  );
}
