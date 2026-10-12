'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VideoItem } from '@/lib/types';
import { Play, Eye, Clock, Terminal } from 'lucide-react';

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
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 select-none">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ff00ff] uppercase tracking-widest mb-1">
          <Terminal className="w-4 h-4" />
          <span>NLD_STUDIOS // ARCHIVES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-mono">
          CREATOR SHOWCASE
        </h1>
      </div>

      {/* CREATOR SELECTOR BUTTONS: Sharp Rectangular Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleSelectCreator('Bob')}
          className={`px-6 py-3 font-mono font-bold text-sm tracking-widest uppercase border-2 transition-none flex items-center gap-2 ${
            selectedCreator === 'Bob'
              ? 'border-[#0055ff] bg-[#0055ff] text-black font-black'
              : 'border-neutral-800 bg-black text-neutral-400 hover:border-[#0055ff] hover:text-[#0055ff]'
          }`}
        >
          <span>[CREATOR: BOB]</span>
          <span className="text-[10px] hidden sm:inline opacity-75">
            // FREESTYLE_SPECIALIST
          </span>
        </button>

        <button
          onClick={() => handleSelectCreator('Strazak')}
          className={`px-6 py-3 font-mono font-bold text-sm tracking-widest uppercase border-2 transition-none flex items-center gap-2 ${
            selectedCreator === 'Strazak'
              ? 'border-[#ff00ff] bg-[#ff00ff] text-black font-black'
              : 'border-neutral-800 bg-black text-neutral-400 hover:border-[#ff00ff] hover:text-[#ff00ff]'
          }`}
        >
          <span>[CREATOR: STRAZAK]</span>
          <span className="text-[10px] hidden sm:inline opacity-75">
            // SPEED_&_CHAOS
          </span>
        </button>
      </div>

      {/* MAIN VIDEO PLAYER: Sharp Neon Bordered 16:9 Frame */}
      {activeVideo && (
        <div className="mb-14 border-2 border-[#0055ff] p-2 bg-black">
          <div className="relative w-full aspect-video bg-black overflow-hidden border border-neutral-900">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtube_video_id}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Video Metadata Panel */}
          <div className="p-4 md:p-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-2">
                <span className="text-[#0055ff] font-bold">
                  [{activeVideo.creator_name.toUpperCase()}]
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {activeVideo.views || '12K VIEWS'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeVideo.duration || '04:15'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white font-mono">
                {activeVideo.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-3xl font-mono leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

            <a
              href={activeVideo.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-[#ff00ff] bg-black text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-none text-xs font-bold font-mono tracking-widest uppercase shrink-0"
            >
              [OPEN_YOUTUBE]
            </a>
          </div>
        </div>
      )}

      {/* FLOATING GRID OF OLDER ARCHIVES (Sharp 1px Borders) */}
      <div>
        <div className="border-b border-neutral-800 pb-2 mb-6">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            MONTAGE_REEL // {selectedCreator.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creatorVideos.map((video) => {
            const isPlaying = activeVideo?.id === video.id;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`border p-3 text-left bg-black group transition-none flex flex-col justify-between ${
                  isPlaying
                    ? 'border-[#0055ff] bg-neutral-950'
                    : 'border-neutral-800 hover:border-[#ff00ff]'
                }`}
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden border border-neutral-900 mb-3">
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-none">
                      <div className="w-10 h-10 border border-[#ff00ff] bg-black text-[#ff00ff] flex items-center justify-center">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-neutral-500 font-mono block mb-1 uppercase">
                    {video.creator_name} // {video.views || '10K VIEWS'}
                  </span>
                  <span className="font-mono font-bold text-sm text-white group-hover:text-[#ff00ff] line-clamp-2 uppercase">
                    {video.title}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                  <span>{isPlaying ? '[PLAYING_NOW]' : '[READY]'}</span>
                  <span>{video.duration || '04:00'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
