'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { VideoItem } from '@/lib/types';
import { Play, Eye, Clock, Sparkles } from 'lucide-react';

interface CreatorsViewProps {
  initialVideos: VideoItem[];
}

export default function CreatorsView({ initialVideos }: CreatorsViewProps) {
  const [selectedCreator, setSelectedCreator] = useState<'Bob' | 'Strazak'>('Bob');

  const creatorVideos = initialVideos.filter((v) => v.creator_name === selectedCreator);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(
    creatorVideos[0] || initialVideos[0]
  );

  const handleSelectCreator = (creator: 'Bob' | 'Strazak') => {
    setSelectedCreator(creator);
    const firstVid = initialVideos.find((v) => v.creator_name === creator);
    if (firstVid) {
      setActiveVideo(firstVid);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 select-none">
      {/* Header */}
      <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fuchsia-950/30 border border-fuchsia-500/30 text-xs font-semibold text-fuchsia-400 uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          NLD Studios
        </span>
        <h1 className="font-['Rajdhani',sans-serif] font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-tight">
          Creator Showcase
        </h1>
        <p className="mt-2 text-sm md:text-base text-neutral-400 max-w-xl">
          Watch high-octane competitive highlights and mechanical freestyle montages by NLD's featured creators.
        </p>
      </div>

      {/* Pill-Shaped Creator Selector Tabs */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button
          onClick={() => handleSelectCreator('Bob')}
          className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 ${
            selectedCreator === 'Bob'
              ? 'bg-cyan-500 text-black shadow-[0_0_25px_rgba(0,255,255,0.6)] scale-105'
              : 'bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:border-cyan-500/50 hover:text-white'
          }`}
        >
          <span>Bob</span>
          <span className="text-[11px] opacity-80 font-normal">Freestyle Specialist</span>
        </button>

        <button
          onClick={() => handleSelectCreator('Strazak')}
          className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 ${
            selectedCreator === 'Strazak'
              ? 'bg-fuchsia-500 text-black shadow-[0_0_25px_rgba(255,0,255,0.6)] scale-105'
              : 'bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:border-fuchsia-500/50 hover:text-white'
          }`}
        >
          <span>Strazak</span>
          <span className="text-[11px] opacity-80 font-normal">Speed & Chaos</span>
        </button>
      </div>

      {/* Main Video Player: Rounded-3xl with Ambient Glow */}
      {activeVideo && (
        <div className="mb-16 rounded-3xl border border-neutral-800 bg-[#070716]/90 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(0,255,255,0.15)]">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtube_video_id}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="mt-6 px-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="min-w-0 max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-semibold text-neutral-400 mb-2">
                <span className="text-cyan-400">{activeVideo.creator_name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {activeVideo.views || '14K views'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeVideo.duration || '04:15'}
                </span>
              </div>
              <h2 className="font-['Rajdhani',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                {activeVideo.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

            <a
              href={activeVideo.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shrink-0"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      )}

      {/* Grid of Older Videos */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6 font-['Rajdhani',sans-serif] uppercase tracking-wider">
          More from {selectedCreator}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatorVideos.map((video) => {
            const isPlaying = activeVideo?.id === video.id;
            return (
              <motion.button
                key={video.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveVideo(video)}
                className={`rounded-2xl border p-4 text-left bg-[#070716]/80 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                  isPlaying
                    ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.25)]'
                    : 'border-neutral-800/80 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]'
                }`}
              >
                <div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-3">
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#00ffff] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.7)]">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-neutral-400 block mb-1">
                    {video.creator_name} • {video.views || '10K views'}
                  </span>
                  <span className="font-['Rajdhani',sans-serif] font-bold text-lg text-white line-clamp-2 uppercase">
                    {video.title}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800/80 flex justify-between items-center text-xs text-neutral-400">
                  <span>{isPlaying ? 'Currently Playing' : 'Watch Montage'}</span>
                  <span>{video.duration || '04:00'}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
