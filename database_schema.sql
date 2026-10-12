-- ==============================================================================
-- NO LICENSED DRIVERS (NLD) - DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Rocket League Community Platform Schema
-- ==============================================================================

-- 1. Profiles Table (User management synced with Discord Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    discord_id TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    avatar_url TEXT,
    roles TEXT[] DEFAULT ARRAY['Driver']::TEXT[],
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for Discord ID lookups & fast auth checks
CREATE INDEX IF NOT EXISTS idx_profiles_discord_id ON public.profiles(discord_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_banned ON public.profiles(is_banned);

-- 2. Leaderboard Table (Seasonal scoring and rankings)
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    discord_id TEXT NOT NULL,
    player_name TEXT NOT NULL,
    avatar_url TEXT,
    participation_points INTEGER DEFAULT 0 NOT NULL,
    placement_points INTEGER DEFAULT 0 NOT NULL,
    mvp_points INTEGER DEFAULT 0 NOT NULL,
    total_score INTEGER GENERATED ALWAYS AS (participation_points + placement_points + mvp_points) STORED,
    season TEXT DEFAULT 'Season 1' NOT NULL,
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_total_score ON public.leaderboard(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_discord_id ON public.leaderboard(discord_id);

-- 3. Videos Table (NLD Studios - Bob & Strazak Showcase)
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_name TEXT NOT NULL CHECK (creator_name IN ('Bob', 'Strazak')),
    title TEXT NOT NULL,
    youtube_url TEXT NOT NULL,
    youtube_video_id TEXT NOT NULL,
    thumbnail_url TEXT,
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_videos_created_at ON public.videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_creator ON public.videos(creator_name);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- 5. Public Read Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Public leaderboard is viewable by everyone" 
ON public.leaderboard FOR SELECT USING (true);

CREATE POLICY "Public videos are viewable by everyone" 
ON public.videos FOR SELECT USING (true);

-- 6. Insert Initial Seed Data for Instant Functionality
INSERT INTO public.leaderboard (discord_id, player_name, avatar_url, participation_points, placement_points, mvp_points, is_banned)
VALUES 
    ('1001', 'GhostRider', 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80', 250, 480, 190, false),
    ('1002', 'VortexRL', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', 240, 410, 150, false),
    ('1003', 'ApexPredator', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', 220, 390, 130, false),
    ('1004', 'NeonDrift', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', 190, 310, 90, false),
    ('1005', 'TurboTalon', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80', 180, 290, 80, false),
    ('1006', 'SpeedDemon', 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80', 150, 240, 60, false),
    ('1007', 'ShadowPulse', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&auto=format&fit=crop&q=80', 130, 210, 50, false),
    ('1008', 'CrashDummy', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 50, 40, 10, false),
    ('1009', 'RogueBooster', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 220, 350, 100, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.videos (creator_name, title, youtube_url, youtube_video_id, thumbnail_url, description, is_featured)
VALUES 
    ('Bob', 'IMPOSSIBLE FLIP RESETS - NLD MONTAGE #14', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1280&auto=format&fit=crop&q=80', 'Clean mechanical mastery and high-octane freestyle goals from the NLD tournament series.', true),
    ('Strazak', 'SPEED & CHAOS - COMPETITIVE HIGHLIGHTS V2', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1280&auto=format&fit=crop&q=80', 'Pure aggressive offensive rotations, double taps, and pinches in Grand Champion lobbies.', false)
ON CONFLICT DO NOTHING;
