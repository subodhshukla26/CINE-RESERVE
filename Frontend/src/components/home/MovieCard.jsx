import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Original behavior: update hero banner on home page
    onClick?.(movie);
  };

  const handlePosterClick = (e) => {
    e.stopPropagation();
    // Navigate to details page
    navigate(`/movie/${movie.slug}`);
  };

  return (
    <div 
      className="flex-shrink-0 w-[145px] group cursor-pointer"
      onClick={handleCardClick}
    >
      <div 
        className="relative aspect-[2/3] w-full mb-3 overflow-hidden rounded-2xl shadow-sm"
        onClick={handlePosterClick}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Rating Badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[10px] font-bold border border-white/20">
          <Star size={10} fill="currentColor" className="text-white" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="px-0.5">
        <h3 className="text-[14px] font-bold text-gray-900 leading-[1.2] line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <p className="text-[11px] font-medium text-gray-400">
          {movie.genre}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
