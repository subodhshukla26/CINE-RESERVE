import React from 'react';
import { Star } from 'lucide-react';

/**
 * SimilarMovies — Horizontal scrolling list of movie recommendations.
 * Props:
 *  movies - array of similar movie objects { id, title, poster, rating, genre }
 *  onMovieClick - callback when a movie is tapped
 */
const SimilarMovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[120px] cursor-pointer group"
    >
      <div className="relative aspect-[2/3] w-full mb-2 overflow-hidden rounded-xl shadow-sm border border-gray-100">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=150';
          }}
        />
        {/* Rating Badge */}
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-black/75 backdrop-blur-md text-white px-1.5 py-0.5 rounded-lg text-[9px] font-bold border border-white/10">
          <Star size={8} fill="currentColor" className="text-amber-400" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="px-0.5">
        <h4 className="text-[12px] font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-[#5D4CE8] transition-colors">
          {movie.title}
        </h4>
        <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">
          {movie.genre}
        </p>
      </div>
    </div>
  );
};

const SimilarMovies = ({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
          <h2 className="text-[17px] font-extrabold text-[#111827]">You Might Also Like</h2>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-4 px-5 overflow-x-auto no-scrollbar pb-2">
        {movies.map((movie) => (
          <SimilarMovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick?.(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
