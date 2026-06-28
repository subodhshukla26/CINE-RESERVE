import React from 'react';

/**
 * MovieOverview — Story/plot summary section with a decorative side accent.
 * Props:
 *  movie – movie data object
 */
const MovieOverview = ({ movie }) => {
  return (
    <div className="px-5 py-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
        <h2 className="text-[17px] font-extrabold text-[#111827]">Overview</h2>
      </div>

      {/* Overview Card */}
      <div
        className="bg-white rounded-2xl p-4 border border-gray-100"
        style={{
          boxShadow: '0 2px 16px rgba(93,76,232,0.06)',
        }}
      >
        {/* Plot Summary Label */}
        <p className="text-[11px] font-bold text-[#5D4CE8] uppercase tracking-wider mb-2">
          Plot Summary
        </p>

        {/* Story Text */}
        <p className="text-[13.5px] font-medium text-gray-600 leading-relaxed">
          {movie.description}
        </p>

        {/* Extended story (if provided) */}
        {movie.story && (
          <>
            <div className="border-t border-gray-100 my-3" />
            <p className="text-[11px] font-bold text-[#5D4CE8] uppercase tracking-wider mb-2">
              Story
            </p>
            <p className="text-[13px] font-medium text-gray-500 leading-relaxed">
              {movie.story}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
