export interface Profile {
  id: string;
  discord_id: string;
  username: string;
  avatar_url: string;
  roles: string[];
  is_banned: boolean;
  created_at?: string;
  bio?: string;
  rank_tier?: string;
  favorite_car?: string;
}

export interface LeaderboardEntry {
  id: string;
  user_id?: string;
  discord_id: string;
  player_name: string;
  avatar_url: string;
  participation_points: number;
  placement_points: number;
  mvp_points: number;
  total_score: number;
  season?: string;
  is_banned?: boolean;
  rank?: number;
}

export interface VideoItem {
  id: string;
  creator_name: 'Bob' | 'Strazak';
  title: string;
  youtube_url: string;
  youtube_video_id: string;
  thumbnail_url: string;
  description: string;
  is_featured: boolean;
  created_at: string;
  views?: string;
  duration?: string;
}

export interface DiscordOnlineStats {
  onlineCount: number;
  totalMembers: number;
  serverName: string;
}
