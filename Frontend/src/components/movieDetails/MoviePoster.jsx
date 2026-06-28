import React from 'react';

/**
 * MoviePoster — Simple centered poster component.
 * Props:
 *  src - Image source URL
 *  alt - Alternate text
 */
const MoviePoster = ({ src, alt }) => {
  return (
    <div className="flex justify-center items-center py-6 bg-[#F7F8FD]">
      <div className="w-[200px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E5E7EB] transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={src}
          alt={alt || "Movie Poster"}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // High quality placeholder image fallback
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80';
          }}
        />
      </div>
    </div>
  );
};

export default MoviePoster;
