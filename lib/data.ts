import { createServerSupabaseClient } from './supabase/server';
import { INITIAL_LEADERBOARD, INITIAL_VIDEOS, INITIAL_PROFILES } from './mock-data';
import { LeaderboardEntry, VideoItem, Profile } from './types';

/**
 * Retrieves the latest featured video, if one exists
 */
export async function getFeaturedVideo(): Promise<VideoItem | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (data) {
      return data as VideoItem;
    }
  }

  // Fallback to initial mock data
  return INITIAL_VIDEOS.find((v) => v.is_featured) || null;
}

/**
 * Retrieves all leaderboard entries ranked by total score
 */
export async function getLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('leaderboard')
      .select('*')
      .order('total_score', { ascending: false });

    if (data && data.length > 0) {
      return data.map((item, index) => ({
        ...item,
        rank: index + 1,
      })) as LeaderboardEntry[];
    }
  }

  // Fallback to initial mock data sorted by total_score descending
  const sorted = [...INITIAL_LEADERBOARD].sort((a, b) => b.total_score - a.total_score);
  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}

/**
 * Retrieves all videos, optionally filtered by creator
 */
export async function getVideos(creator?: 'Bob' | 'Strazak'): Promise<VideoItem[]> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    let query = supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (creator) {
      query = query.eq('creator_name', creator);
    }
    const { data } = await query;
    if (data && data.length > 0) {
      return data as VideoItem[];
    }
  }

  if (creator) {
    return INITIAL_VIDEOS.filter((v) => v.creator_name === creator);
  }
  return INITIAL_VIDEOS;
}

/**
 * Retrieves player profile by Discord ID
 */
export async function getPlayerProfile(discordId: string): Promise<{
  profile: Profile;
  leaderboardEntry: LeaderboardEntry | null;
}> {
  const supabase = await createServerSupabaseClient();
  let profile: Profile | null = null;
  let entry: LeaderboardEntry | null = null;

  if (supabase) {
    const { data: profData } = await supabase
      .from('profiles')
      .select('*')
      .eq('discord_id', discordId)
      .single();
    if (profData) {
      profile = profData as Profile;
    }

    const { data: leadData } = await supabase
      .from('leaderboard')
      .select('*')
      .eq('discord_id', discordId)
      .single();
    if (leadData) {
      entry = leadData as LeaderboardEntry;
    }
  }

  if (!profile) {
    profile = INITIAL_PROFILES[discordId] || {
      id: `p-${discordId}`,
      discord_id: discordId,
      username: `Driver #${discordId}`,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80',
      roles: ['Driver', 'NLD Member'],
      is_banned: false,
      bio: 'Supersonic competitor on the pitch.',
      rank_tier: 'Champion II',
      favorite_car: 'Octane',
    };
  }

  if (!entry) {
    entry = INITIAL_LEADERBOARD.find((e) => e.discord_id === discordId) || null;
  }

  return { profile, leaderboardEntry: entry };
}
