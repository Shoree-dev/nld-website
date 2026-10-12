'use client';

import { useState } from 'react';
import { LeaderboardEntry } from '@/lib/types';
import { updateLeaderboardPointsAction, addNewVideoAction } from '@/app/actions/admin';
import { Shield, Send, CheckCircle2, Video, Trophy, Terminal } from 'lucide-react';

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
      setLeaderboardStatus('[SUCCESS: TELEMETRY UPDATED & ANNOUNCED]');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating leaderboard';
      setLeaderboardStatus(`[ERR: ${msg}]`);
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
      setVideoStatus('[SUCCESS: MONTAGE BROADCASTED TO ARCHIVES]');
      setVideoTitle('');
      setYoutubeUrl('');
      setVideoDescription('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error adding video';
      setVideoStatus(`[ERR: ${msg}]`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 select-none">
      {/* Header */}
      <div className="border-b border-[#ff00ff] pb-6 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ff00ff] uppercase tracking-widest mb-1 font-bold">
          <Terminal className="w-4 h-4" />
          <span>SYS_ADMIN // COMMAND_CONSOLE_v2</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-mono">
          ADMIN DASHBOARD
        </h1>
        <p className="mt-2 text-xs text-neutral-400 font-mono">
          MANAGE LEADERBOARD SCORES & BROADCAST NLD STUDIOS MONTAGES VIA WEBHOOK
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. LEADERBOARD MANAGER */}
        <div className="border-2 border-[#ff00ff] p-6 bg-black">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-3">
            <Trophy className="w-5 h-5 text-[#ff00ff]" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white font-mono">
              [LEADERBOARD_MANAGER]
            </h2>
          </div>

          <form onSubmit={handleSaveLeaderboard} className="flex flex-col gap-5">
            {/* Player Selection */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                SELECT_PILOT:
              </label>
              <select
                value={selectedPlayerId}
                onChange={(e) => handlePlayerChange(e.target.value)}
                className="w-full bg-black text-white font-mono text-sm py-2 px-3 border border-neutral-700 focus:border-[#ff00ff] focus:outline-none"
              >
                {initialEntries.map((p) => (
                  <option key={p.discord_id} value={p.discord_id} className="bg-black text-white">
                    {p.player_name} (ID: {p.discord_id}) — Total: {p.total_score} PTS
                  </option>
                ))}
              </select>
            </div>

            {/* Points Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  PARTICIPATION
                </label>
                <input
                  type="number"
                  value={participation}
                  onChange={(e) => setParticipation(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-black text-white font-mono text-sm py-1.5 px-2.5 border border-neutral-700 focus:border-[#ff00ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  PLACEMENT
                </label>
                <input
                  type="number"
                  value={placement}
                  onChange={(e) => setPlacement(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-black text-white font-mono text-sm py-1.5 px-2.5 border border-neutral-700 focus:border-[#ff00ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  MVP
                </label>
                <input
                  type="number"
                  value={mvp}
                  onChange={(e) => setMvp(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-black text-white font-mono text-sm py-1.5 px-2.5 border border-neutral-700 focus:border-[#ff00ff] focus:outline-none"
                />
              </div>
            </div>

            {/* Computed Score */}
            <div className="border border-neutral-800 p-3 bg-neutral-950 flex justify-between items-baseline">
              <span className="text-xs font-mono text-neutral-400 uppercase">
                COMPUTED_TOTAL:
              </span>
              <span className="text-2xl font-black text-[#ff00ff] font-mono">
                {participation + placement + mvp} PTS
              </span>
            </div>

            {/* Webhook Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={announceLeaderboard}
                onChange={(e) => setAnnounceLeaderboard(e.target.checked)}
                className="accent-[#ff00ff]"
              />
              <span className="text-xs font-mono text-neutral-300">
                [BROADCAST_DISCORD_WEBHOOK]
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 border-2 border-[#ff00ff] bg-black text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black font-mono font-bold text-xs uppercase tracking-widest transition-none flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>[COMMIT_TELEMETRY_RECORD]</span>
            </button>

            {leaderboardStatus && (
              <div className="border border-[#ff00ff] bg-neutral-950 p-2.5 text-xs text-[#ff00ff] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{leaderboardStatus}</span>
              </div>
            )}
          </form>
        </div>

        {/* 2. CREATORS MANAGER */}
        <div className="border-2 border-[#0055ff] p-6 bg-black">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-3">
            <Video className="w-5 h-5 text-[#0055ff]" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white font-mono">
              [CREATORS_MANAGER]
            </h2>
          </div>

          <form onSubmit={handleAddVideo} className="flex flex-col gap-5">
            {/* Creator Radio */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                CREATOR_NAME:
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                  <input
                    type="radio"
                    name="creator"
                    value="Bob"
                    checked={creatorName === 'Bob'}
                    onChange={() => setCreatorName('Bob')}
                    className="accent-[#0055ff]"
                  />
                  <span className="text-white font-bold">[BOB]</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                  <input
                    type="radio"
                    name="creator"
                    value="Strazak"
                    checked={creatorName === 'Strazak'}
                    onChange={() => setCreatorName('Strazak')}
                    className="accent-[#ff00ff]"
                  />
                  <span className="text-white font-bold">[STRAZAK]</span>
                </label>
              </div>
            </div>

            {/* Video Title */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                VIDEO_TITLE:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. GRAND CHAMPION AIR DRIBBLE BUMPS"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-black text-white font-mono text-sm py-2 px-3 border border-neutral-700 focus:border-[#0055ff] focus:outline-none placeholder:text-neutral-700"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                YOUTUBE_URL:
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-black text-white font-mono text-sm py-2 px-3 border border-neutral-700 focus:border-[#0055ff] focus:outline-none placeholder:text-neutral-700"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                DESCRIPTION:
              </label>
              <textarea
                rows={2}
                placeholder="High-octane goals and competitive plays..."
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="w-full bg-black text-white font-mono text-xs py-2 px-3 border border-neutral-700 focus:border-[#0055ff] focus:outline-none resize-none placeholder:text-neutral-700"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-[#0055ff]"
                />
                <span className="text-neutral-300">[PIN_TO_HOME_ALERT]</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                <input
                  type="checkbox"
                  checked={announceVideo}
                  onChange={(e) => setAnnounceVideo(e.target.checked)}
                  className="accent-[#0055ff]"
                />
                <span className="text-neutral-300">[BROADCAST_DISCORD_WEBHOOK]</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 border-2 border-[#0055ff] bg-black text-[#0055ff] hover:bg-[#0055ff] hover:text-black font-mono font-bold text-xs uppercase tracking-widest transition-none flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>[PUBLISH_MONTAGE_ENTRY]</span>
            </button>

            {videoStatus && (
              <div className="border border-[#0055ff] bg-neutral-950 p-2.5 text-xs text-[#0055ff] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{videoStatus}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
