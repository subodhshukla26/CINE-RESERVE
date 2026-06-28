import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    onClick?.(movie);

    const movieId = movie?.slug || movie?._id || movie?.id;

    if (movieId) {
      navigate(`/movie/${movieId}`);
    }
  };

  const posterImage = movie?.posterImage || movie?.poster || '';
  const genres = Array.isArray(movie?.genre)
    ? movie.genre.join(', ')
    : movie?.genre || 'Movie';
  const rating = typeof movie?.rating === 'number' ? movie.rating : 0;

  return (
    <div
      className="flex-shrink-0 w-[145px] group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[2/3] w-full mb-3 overflow-hidden rounded-2xl shadow-sm">
        <img
          src={posterImage}
          alt={movie?.title || 'Movie poster'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[10px] font-bold border border-white/20">
          <Star size={10} fill="currentColor" className="text-white" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="px-0.5">
        <h3 className="text-[14px] font-bold text-gray-900 leading-[1.2] line-clamp-2 mb-1">
          {movie?.title || 'Untitled Movie'}
        </h3>
        <p className="text-[11px] font-medium text-gray-400">{genres}</p>
      </div>
    </div>
  );
};

export default MovieCard;
