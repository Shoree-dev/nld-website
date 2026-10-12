'use client';

import { useState } from 'react';
import { LeaderboardEntry } from '@/lib/types';
import { updateLeaderboardPointsAction, addNewVideoAction } from '@/app/actions/admin';
import { Shield, Send, CheckCircle2, Video, Trophy } from 'lucide-react';

interface AdminDashboardProps {
  initialEntries: LeaderboardEntry[];
}

export default function AdminDashboard({ initialEntries }: AdminDashboardProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(
    initialEntries[0]?.discord_id || ''
  );
  const selectedPlayer = initialEntries.find((e) => e.discord_id === selectedPlayerId);

  const [participation, setParticipation] = useState(
    selectedPlayer?.participation_points || 0
  );
  const [placement, setPlacement] = useState(selectedPlayer?.placement_points || 0);
  const [mvp, setMvp] = useState(selectedPlayer?.mvp_points || 0);
  const [announceLeaderboard, setAnnounceLeaderboard] = useState(true);

  // Video Form State
  const [creatorName, setCreatorName] = useState<'Bob' | 'Strazak'>('Bob');
  const [videoTitle, setVideoTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [announceVideo, setAnnounceVideo] = useState(true);

  // Status feedback
  const [leaderboardStatus, setLeaderboardStatus] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlayerChange = (discordId: string) => {
    setSelectedPlayerId(discordId);
    const p = initialEntries.find((e) => e.discord_id === discordId);
    if (p) {
      setParticipation(p.participation_points);
      setPlacement(p.placement_points);
      setMvp(p.mvp_points);
    }
  };

  const handleSaveLeaderboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLeaderboardStatus(null);
    try {
      const formData = new FormData();
      formData.set('discordId', selectedPlayerId);
      formData.set('playerName', selectedPlayer?.player_name || selectedPlayerId);
      formData.set('participation', participation.toString());
      formData.set('placement', placement.toString());
      formData.set('mvp', mvp.toString());
      formData.set('announce', announceLeaderboard ? 'true' : 'false');

      await updateLeaderboardPointsAction(formData);
      setLeaderboardStatus('Saved successfully & announcement processed!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating leaderboard';
      setLeaderboardStatus(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVideoStatus(null);
    try {
      const formData = new FormData();
      formData.set('creatorName', creatorName);
      formData.set('title', videoTitle);
      formData.set('youtubeUrl', youtubeUrl);
      formData.set('description', videoDescription);
      formData.set('isFeatured', isFeatured ? 'true' : 'false');
      formData.set('announce', announceVideo ? 'true' : 'false');

      await addNewVideoAction(formData);
      setVideoStatus('Video added & announced to Discord!');
      setVideoTitle('');
      setYoutubeUrl('');
      setVideoDescription('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error adding video';
      setVideoStatus(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-32 select-none">
      {/* Admin Header floating in void */}
      <div className="mb-20">
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-[#a855f7] mb-2 font-bold">
          <Shield className="w-4 h-4" />
          <span>AUTHORIZED COMMAND CONSOLE</span>
        </div>
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black font-['Teko',sans-serif] uppercase tracking-tighter leading-none text-white">
          ADMIN DASHBOARD
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-neutral-400">
          MANAGE LEADERBOARD SCORES & PUBLISH NLD STUDIOS MONTAGES WITH DISCORD WEBHOOKS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
        {/* 1. LEADERBOARD MANAGER (Zero Containers) */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-[#a855f7]" />
            <h2 className="text-4xl md:text-5xl font-['Teko',sans-serif] font-black uppercase tracking-tight text-white">
              LEADERBOARD MANAGER
            </h2>
          </div>

          <form onSubmit={handleSaveLeaderboard} className="flex flex-col gap-8">
            {/* Player Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                SELECT DRIVER
              </label>
              <select
                value={selectedPlayerId}
                onChange={(e) => handlePlayerChange(e.target.value)}
                className="w-full bg-black text-white font-['Rajdhani',sans-serif] text-2xl font-bold py-3 px-0 border-b-2 border-neutral-800 focus:border-[#a855f7] focus:outline-none cursor-pointer"
              >
                {initialEntries.map((p) => (
                  <option key={p.discord_id} value={p.discord_id} className="bg-black text-white">
                    {p.player_name} (ID: {p.discord_id}) — Total: {p.total_score} pts
                  </option>
                ))}
              </select>
            </div>

            {/* Points Inputs */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  PARTICIPATION
                </label>
                <input
                  type="number"
                  value={participation}
                  onChange={(e) => setParticipation(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-black text-white font-mono text-2xl font-bold py-2 border-b-2 border-neutral-800 focus:border-[#a855f7] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  PLACEMENT
                </label>
                <input
                  type="number"
                  value={placement}
                  onChange={(e) => setPlacement(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-black text-white font-mono text-2xl font-bold py-2 border-b-2 border-neutral-800 focus:border-[#a855f7] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  MVP
                </label>
                <input
                  type="number"
                  value={mvp}
                  onChange={(e) => setMvp(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-black text-white font-mono text-2xl font-bold py-2 border-b-2 border-neutral-800 focus:border-[#a855f7] focus:outline-none"
                />
              </div>
            </div>

            {/* Total Calculated Score */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                COMPUTED TOTAL SCORE
              </span>
              <span className="font-['Teko',sans-serif] text-6xl md:text-7xl font-black text-[#a855f7]">
                {participation + placement + mvp} PTS
              </span>
            </div>

            {/* Webhook Announcement Toggle */}
            <label className="flex items-center gap-3 cursor-pointer py-2">
              <input
                type="checkbox"
                checked={announceLeaderboard}
                onChange={(e) => setAnnounceLeaderboard(e.target.checked)}
                className="w-5 h-5 accent-[#a855f7]"
              />
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                DISPATCH DISCORD EMBED VIA WEBHOOK
              </span>
            </label>

            {/* Save Button with Ferrofluid backing */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="relative group py-4 px-10 text-black font-black uppercase font-mono text-sm tracking-widest focus:outline-none disabled:opacity-50"
              >
                <div
                  className="absolute inset-0 bg-[#a855f7] -z-10 group-hover:scale-105 transition-transform"
                  style={{ borderRadius: '50% 50% 40% 60% / 40% 60% 40% 60%' }}
                />
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  SAVE & PUBLISH STANDINGS
                </span>
              </button>
            </div>

            {leaderboardStatus && (
              <div
                className="font-mono text-xs uppercase tracking-wider text-black bg-[#a855f7] py-2 px-4 inline-flex items-center gap-2"
                style={{ borderRadius: '15px 5px 15px 5px' }}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{leaderboardStatus}</span>
              </div>
            )}
          </form>
        </div>

        {/* 2. CREATORS MANAGER (NLD STUDIOS) */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Video className="w-6 h-6 text-[#06b6d4]" />
            <h2 className="text-4xl md:text-5xl font-['Teko',sans-serif] font-black uppercase tracking-tight text-white">
              CREATORS MANAGER
            </h2>
          </div>

          <form onSubmit={handleAddVideo} className="flex flex-col gap-8">
            {/* Creator Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                SELECT CREATOR
              </label>
              <div className="flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="creator"
                    value="Bob"
                    checked={creatorName === 'Bob'}
                    onChange={() => setCreatorName('Bob')}
                    className="w-5 h-5 accent-[#06b6d4]"
                  />
                  <span className="font-['Rajdhani',sans-serif] text-2xl font-bold uppercase text-white">
                    BOB
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="creator"
                    value="Strazak"
                    checked={creatorName === 'Strazak'}
                    onChange={() => setCreatorName('Strazak')}
                    className="w-5 h-5 accent-[#a855f7]"
                  />
                  <span className="font-['Rajdhani',sans-serif] text-2xl font-bold uppercase text-white">
                    STRAZAK
                  </span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                VIDEO TITLE
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ULTIMATE DOUBLE TAP COMPILATION"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-black text-white font-['Rajdhani',sans-serif] text-2xl font-bold py-2 border-b-2 border-neutral-800 focus:border-[#06b6d4] focus:outline-none placeholder:text-neutral-700"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                YOUTUBE URL
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-black text-white font-mono text-sm py-2 border-b-2 border-neutral-800 focus:border-[#06b6d4] focus:outline-none placeholder:text-neutral-700"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                BRIEF DESCRIPTION
              </label>
              <textarea
                rows={2}
                placeholder="High-octane goals and freestyle rotations..."
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="w-full bg-black text-white font-['Inter',sans-serif] text-sm py-2 border-b-2 border-neutral-800 focus:border-[#06b6d4] focus:outline-none resize-none placeholder:text-neutral-700"
              />
            </div>

            {/* Featured & Webhook Toggles */}
            <div className="flex flex-col gap-3 py-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 accent-[#06b6d4]"
                />
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                  FEATURE AT TOP OF HOME PAGE
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={announceVideo}
                  onChange={(e) => setAnnounceVideo(e.target.checked)}
                  className="w-5 h-5 accent-[#06b6d4]"
                />
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                  PUBLISH & ANNOUNCE DROP ON DISCORD WEBHOOK
                </span>
              </label>
            </div>

            {/* Add Video Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="relative group py-4 px-10 text-black font-black uppercase font-mono text-sm tracking-widest focus:outline-none disabled:opacity-50"
              >
                <div
                  className="absolute inset-0 bg-[#06b6d4] -z-10 group-hover:scale-105 transition-transform"
                  style={{ borderRadius: '40% 60% 50% 50% / 50% 40% 60% 50%' }}
                />
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  PUBLISH VIDEO MONTAGE
                </span>
              </button>
            </div>

            {videoStatus && (
              <div
                className="font-mono text-xs uppercase tracking-wider text-black bg-[#06b6d4] py-2 px-4 inline-flex items-center gap-2"
                style={{ borderRadius: '15px 5px 15px 5px' }}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{videoStatus}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
