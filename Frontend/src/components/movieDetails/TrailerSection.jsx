import React, { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * TrailerSection — Trailer thumbnail with animated play button overlay.
 * Does NOT embed YouTube. UI-only with placeholder thumbnail.
 * Props:
 *  trailer – { thumbnail, title, duration }
 */
const TrailerSection = ({ trailer }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="px-5 pb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
        <h2 className="text-[17px] font-extrabold text-[#111827]">Trailer</h2>
      </div>

      {/* Trailer Card */}
      <div
        className="relative w-full overflow-hidden rounded-2xl cursor-pointer group"
        style={{ aspectRatio: '16/9', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        aria-label="Play trailer"
        tabIndex={0}
      >
        {/* Thumbnail */}
        <img
          src={trailer.thumbnail}
          alt={`${trailer.title} Trailer`}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            hovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Dark Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            hovered ? 'bg-black/60' : 'bg-black/40'
          }`}
        />

        {/* Animated Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex items-center justify-center rounded-full border-2 border-white/80 transition-all duration-300 ${
              hovered
                ? 'w-16 h-16 bg-[#5D4CE8]/90 border-[#5D4CE8] shadow-lg shadow-[#5D4CE8]/40'
                : 'w-14 h-14 bg-black/50'
            }`}
          >
            <Play
              size={hovered ? 24 : 20}
              fill="white"
              className="text-white ml-1 transition-all duration-300"
            />
          </div>
        </div>

        {/* Duration Badge */}
        {trailer.duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
            {trailer.duration}
          </div>
        )}

        {/* Official Trailer Label */}
        <div className="absolute top-3 left-3 bg-[#5D4CE8]/80 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-lg">
          Official Trailer
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-16">
          <p className="text-white text-[12px] font-bold truncate drop-shadow">
            {trailer.title}
          </p>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-[11px] text-gray-400 font-medium text-center mt-2">
        Tap to watch the official trailer
      </p>
    </div>
  );
};

export default TrailerSection;
