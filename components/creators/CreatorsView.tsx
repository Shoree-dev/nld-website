'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { VideoItem } from '@/lib/types';
import { Play, Eye, Clock } from 'lucide-react';

interface CreatorsViewProps {
  initialVideos: VideoItem[];
}

export default function CreatorsView({ initialVideos }: CreatorsViewProps) {
  const [selectedCreator, setSelectedCreator] = useState<'Bob' | 'Strazak'>('Bob');
  const [hoveredCreator, setHoveredCreator] = useState<'Bob' | 'Strazak' | null>(null);

  // Active creator's videos
  const activeCreator = hoveredCreator || selectedCreator;
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

  // Determine current ambient blob color based on active creator
  // Blue for Bob, Purple for Strazak
  const blobColor = activeCreator === 'Bob' ? '#06b6d4' : '#a855f7';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-32 select-none relative overflow-hidden">
      {/* Background Ambient Fluid Blob that shifts color dynamically */}
      <motion.div
        key={activeCreator}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -z-30 pointer-events-none w-[500px] h-[400px] md:w-[900px] md:h-[650px] animate-ferrofluid"
        style={{
          backgroundColor: blobColor,
          borderRadius: '45% 55% 60% 40% / 50% 40% 60% 50%',
        }}
      />

      {/* Page Title */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400">
          NLD STUDIOS // CREATOR SHOWCASE
        </span>
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black font-['Teko',sans-serif] uppercase tracking-tighter leading-none text-white">
          MONTAGE ARCHIVES
        </h1>
      </div>

      {/* TWO MASSIVE TYPOGRAPHY TRIGGERS ("BOB" and "STRAZAK") */}
      <div className="flex flex-col md:flex-row items-baseline justify-start gap-8 md:gap-24 mb-16">
        <button
          onClick={() => handleSelectCreator('Bob')}
          onMouseEnter={() => setHoveredCreator('Bob')}
          onMouseLeave={() => setHoveredCreator(null)}
          className="relative group focus:outline-none text-left"
        >
          <span
            className={`font-['Teko',sans-serif] font-black text-8xl sm:text-9xl md:text-[13rem] leading-none tracking-tighter uppercase transition-colors duration-300 ${
              selectedCreator === 'Bob'
                ? 'text-[#06b6d4]'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            BOB
          </span>
          <span className="block font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 -mt-2">
            FREESTYLE MECHANICS & RESETS
          </span>
        </button>

        <button
          onClick={() => handleSelectCreator('Strazak')}
          onMouseEnter={() => setHoveredCreator('Strazak')}
          onMouseLeave={() => setHoveredCreator(null)}
          className="relative group focus:outline-none text-left"
        >
          <span
            className={`font-['Teko',sans-serif] font-black text-8xl sm:text-9xl md:text-[13rem] leading-none tracking-tighter uppercase transition-colors duration-300 ${
              selectedCreator === 'Strazak'
                ? 'text-[#a855f7]'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            STRAZAK
          </span>
          <span className="block font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 -mt-2">
            SPEED, CHAOS & HIGH-RANK LOBBIES
          </span>
        </button>
      </div>

      {/* PORTFOLIO VIEW: Massive, borderless edge-to-edge 16:9 YouTube player */}
      <div className="w-full my-8">
        <AnimatePresence mode="wait">
          {activeVideo && (
            <motion.div
              key={activeVideo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="flex flex-col gap-6"
            >
              {/* Borderless 16:9 Player */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtube_video_id}?autoplay=0&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Video Title and Metadata in Void */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-4">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    <span className="text-white font-bold">{activeVideo.creator_name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {activeVideo.views || '12.4K VIEWS'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeVideo.duration || '04:20'}
                    </span>
                  </div>
                  <h2 className="font-['Rajdhani',sans-serif] font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
                    {activeVideo.title}
                  </h2>
                  <p className="mt-2 text-neutral-400 text-sm md:text-base max-w-3xl font-['Inter',sans-serif]">
                    {activeVideo.description}
                  </p>
                </div>

                <a
                  href={activeVideo.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 relative group py-3 px-8 text-black font-black uppercase font-mono text-xs tracking-widest focus:outline-none"
                >
                  <div
                    className="absolute inset-0 bg-[#06b6d4] -z-10 group-hover:scale-105 transition-transform"
                    style={{ borderRadius: '50% 50% 45% 55% / 40% 60% 40% 60%' }}
                  />
                  <span>WATCH ON YOUTUBE</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING GRID OF OLDER VIDEO THUMBNAILS (Zero Containers) */}
      <div className="mt-28">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 block mb-8">
          ARCHIVES // {selectedCreator.toUpperCase()} MONTAGE REEL
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {creatorVideos.map((video) => {
            const isPlaying = activeVideo?.id === video.id;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative flex flex-col text-left focus:outline-none"
              >
                {/* Floating Thumbnail with hover scale */}
                <div className="relative aspect-video w-full overflow-hidden mb-4">
                  <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  {/* Play trigger overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div
                      className="w-14 h-14 bg-[#06b6d4] flex items-center justify-center text-black"
                      style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                    >
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {video.creator_name} • {video.views || '10K VIEWS'}
                </span>
                <span
                  className={`font-['Rajdhani',sans-serif] font-bold text-xl md:text-2xl uppercase tracking-tight line-clamp-2 transition-colors ${
                    isPlaying
                      ? 'text-[#06b6d4]'
                      : 'text-white group-hover:text-[#a855f7]'
                  }`}
                >
                  {video.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
