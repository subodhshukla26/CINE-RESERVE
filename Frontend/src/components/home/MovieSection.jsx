import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { MOVIES } from '../../utils/constants';

const MovieSection = ({ onMovieClick }) => {
  const [activeTab, setActiveTab] = useState('Now Showing');

  return (
    <section className="mt-2">
      <div className="px-5 flex items-center justify-between mb-4">
        <div className="flex gap-7">
          <button
            onClick={() => setActiveTab('Now Showing')}
            className={`text-[15px] font-bold transition-colors relative py-1 ${
              activeTab === 'Now Showing' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Now Showing
            {activeTab === 'Now Showing' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#5D4CE8] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('Coming Soon')}
            className={`text-[15px] font-bold transition-colors relative py-1 ${
              activeTab === 'Coming Soon' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Coming Soon
            {activeTab === 'Coming Soon' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#5D4CE8] rounded-full"></span>
            )}
          </button>
        </div>
        <button className="text-[13px] font-bold text-[#5D4CE8] hover:opacity-80">
          View All
        </button>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex gap-4 px-5 overflow-x-auto overflow-y-hidden no-scrollbar pb-4 scroll-smooth">
        {MOVIES.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={() => onMovieClick?.(movie)} 
          />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
