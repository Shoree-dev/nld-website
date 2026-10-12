'use client';

import { useState } from 'react';
import { LeaderboardEntry } from '@/lib/types';
import { updateLeaderboardPointsAction, addNewVideoAction } from '@/app/actions/admin';
import { Shield, Send, CheckCircle2, Video, Trophy, Sparkles } from 'lucide-react';

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
      setLeaderboardStatus('Leaderboard saved and announcement sent to Discord!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating leaderboard';
      setLeaderboardStatus(`Error: ${msg}`);
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
      setVideoStatus('Video published and broadcasted to Discord!');
      setVideoTitle('');
      setYoutubeUrl('');
      setVideoDescription('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error adding video';
      setVideoStatus(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 select-none">
      {/* Header */}
      <div className="mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fuchsia-950/40 border border-fuchsia-500/40 text-xs font-semibold text-fuchsia-300 uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          Admin Command Console
        </span>
        <h1 className="font-['Rajdhani',sans-serif] font-black text-5xl sm:text-6xl uppercase tracking-tight text-white">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Update player tournament points and publish new NLD Studios creator montages directly to Discord.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. LEADERBOARD MANAGER */}
        <div className="rounded-3xl border border-neutral-800 bg-[#070716]/90 backdrop-blur-2xl p-8 shadow-[0_0_35px_rgba(255,0,255,0.15)]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
            <Trophy className="w-5 h-5 text-fuchsia-400" />
            <h2 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase">
              Leaderboard Manager
            </h2>
          </div>

          <form onSubmit={handleSaveLeaderboard} className="flex flex-col gap-6">
            {/* Player Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Select Driver
              </label>
              <select
                value={selectedPlayerId}
                onChange={(e) => handlePlayerChange(e.target.value)}
                className="w-full bg-neutral-900/90 text-white font-medium text-sm py-3 px-4 rounded-xl border border-neutral-700 focus:border-fuchsia-500 focus:shadow-[0_0_20px_rgba(255,0,255,0.35)] focus:outline-none transition-all"
              >
                {initialEntries.map((p) => (
                  <option key={p.discord_id} value={p.discord_id} className="bg-neutral-900 text-white">
                    {p.player_name} (ID: {p.discord_id}) — Total: {p.total_score} pts
                  </option>
                ))}
              </select>
            </div>

            {/* Points Inputs */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Participation
                </label>
                <input
                  type="number"
                  value={participation}
                  onChange={(e) => setParticipation(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-neutral-900/90 text-white text-base font-bold py-2.5 px-3.5 rounded-xl border border-neutral-700 focus:border-fuchsia-500 focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Placement
                </label>
                <input
                  type="number"
                  value={placement}
                  onChange={(e) => setPlacement(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-neutral-900/90 text-white text-base font-bold py-2.5 px-3.5 rounded-xl border border-neutral-700 focus:border-fuchsia-500 focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  MVP Score
                </label>
                <input
                  type="number"
                  value={mvp}
                  onChange={(e) => setMvp(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-neutral-900/90 text-white text-base font-bold py-2.5 px-3.5 rounded-xl border border-neutral-700 focus:border-fuchsia-500 focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Computed Score */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 flex items-baseline justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase">
                Calculated Total
              </span>
              <span className="font-['Rajdhani',sans-serif] font-black text-3xl text-fuchsia-400">
                {participation + placement + mvp} PTS
              </span>
            </div>

            {/* Webhook Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={announceLeaderboard}
                onChange={(e) => setAnnounceLeaderboard(e.target.checked)}
                className="w-4 h-4 rounded accent-fuchsia-500"
              />
              <span className="text-xs font-medium text-neutral-300">
                Broadcast announcement embed to Discord Webhook
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 rounded-full bg-[#ff00ff] hover:bg-[#ff24ff] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_35px_rgba(255,0,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Save & Publish Standings</span>
            </button>

            {leaderboardStatus && (
              <div className="p-3 rounded-xl bg-fuchsia-950/50 border border-fuchsia-500/40 text-xs text-fuchsia-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-fuchsia-400" />
                <span>{leaderboardStatus}</span>
              </div>
            )}
          </form>
        </div>

        {/* 2. CREATORS MANAGER */}
        <div className="rounded-3xl border border-neutral-800 bg-[#070716]/90 backdrop-blur-2xl p-8 shadow-[0_0_35px_rgba(0,255,255,0.15)]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
            <Video className="w-5 h-5 text-cyan-400" />
            <h2 className="font-['Rajdhani',sans-serif] font-bold text-2xl text-white uppercase">
              Creators Manager
            </h2>
          </div>

          <form onSubmit={handleAddVideo} className="flex flex-col gap-6">
            {/* Creator Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Select Creator
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white">
                  <input
                    type="radio"
                    name="creator"
                    value="Bob"
                    checked={creatorName === 'Bob'}
                    onChange={() => setCreatorName('Bob')}
                    className="accent-cyan-400"
                  />
                  <span>Bob</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white">
                  <input
                    type="radio"
                    name="creator"
                    value="Strazak"
                    checked={creatorName === 'Strazak'}
                    onChange={() => setCreatorName('Strazak')}
                    className="accent-fuchsia-500"
                  />
                  <span>Strazak</span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Video Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grand Champion Flip Resets & Pinches"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-neutral-900/90 text-white font-medium text-sm py-3 px-4 rounded-xl border border-neutral-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.35)] focus:outline-none transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                YouTube URL
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-neutral-900/90 text-white font-medium text-sm py-3 px-4 rounded-xl border border-neutral-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.35)] focus:outline-none transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of highlights..."
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="w-full bg-neutral-900/90 text-white font-medium text-xs py-2.5 px-4 rounded-xl border border-neutral-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.35)] focus:outline-none resize-none transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded accent-cyan-400"
                />
                <span className="text-xs font-medium text-neutral-300">
                  Feature in alert banner on home page
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={announceVideo}
                  onChange={(e) => setAnnounceVideo(e.target.checked)}
                  className="w-4 h-4 rounded accent-cyan-400"
                />
                <span className="text-xs font-medium text-neutral-300">
                  Broadcast drop announcement to Discord Webhook
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 rounded-full bg-[#00ffff] hover:bg-[#33ffff] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_35px_rgba(0,255,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Publish Video Montage</span>
            </button>

            {videoStatus && (
              <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-xs text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>{videoStatus}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
