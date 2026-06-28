import React from 'react';
import { Search } from 'lucide-react';

const HeroBanner = ({ movie }) => {
  const posterImage = movie?.posterImage || movie?.poster || '';

  return (
    <div className="px-5 pt-5 pb-2">
      <section 
        className="relative w-full h-[220px] overflow-hidden rounded-[32px] shadow-lg border border-white/5 bg-gray-900 cursor-pointer"
      >
        {/* Background Layer (Blurred & Darkened) */}
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
          <img
            src={posterImage}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-50 scale-150 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Foreground Layer (Contained Poster) */}
        <div className="relative w-full h-full flex justify-center items-center py-2">
          <img
            key={movie?._id || movie?.id}
            src={posterImage}
            alt={movie?.title || 'Movie Banner'}
            className="h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out"
          />
        </div>
        
        {/* Search Overlay */}
        <button 
          className="absolute top-5 right-5 p-2.5 text-white bg-white/10 backdrop-blur-xl rounded-full active:scale-90 transition-all hover:bg-white/20 border border-white/10 z-20 shadow-lg"
          aria-label="Search movies"
        >
          <Search size={22} strokeWidth={3} />
        </button>

        {/* Navigation Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <div className="w-6 h-1.5 rounded-full bg-white shadow-sm"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
