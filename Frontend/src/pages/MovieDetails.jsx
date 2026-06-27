import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { MOVIES } from '../utils/constants';
import CastCard from '../components/home/CastCard';
import PrimaryButton from '../components/common/PrimaryButton';
import BottomNav from '../components/common/BottomNav';

const MovieDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find movie by slug, default to first movie if not found
  const movie = MOVIES.find(m => m.slug === slug) || MOVIES[0];

  return (
    <div className="min-h-screen bg-white w-full max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden flex flex-col">
      {/* Banner Section with Hero Image */}
      <div className="relative h-[280px] w-full group overflow-hidden">
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        
        {/* Top Controls Overlay */}
        <div className="absolute top-8 left-6">
          <button 
            onClick={() => navigate('/home')}
            className="text-white font-bold text-[16px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:scale-95 transition-transform"
          >
            Close
          </button>
        </div>
        <button className="absolute top-8 right-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:scale-90 transition-transform">
          <Heart size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Movie Info Container */}
      <div className="flex-grow px-6 py-8 bg-[#F7F8FD] rounded-t-[40px] -mt-10 relative z-10">
        {/* Title and Star Rating Row */}
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-[24px] font-bold text-[#111827] leading-[1.2] w-[75%]">
            {movie.title}
          </h1>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Star size={18} fill="#111827" className="text-[#111827]" />
            <span className="text-[17px] font-bold text-[#111827]">{movie.rating}</span>
          </div>
        </div>

        {/* Genre and PG Rating Badge */}
        <div className="flex items-center gap-4 mb-8">
          <p className="text-[14px] font-medium text-gray-400">
            {movie.genre}
          </p>
          <span className="px-2 py-0.5 border-2 border-[#5D4CE8]/30 text-[#5D4CE8] text-[11px] font-bold rounded-lg uppercase tracking-wider">
            {movie.ratingBadge}
          </span>
        </div>

        {/* Synopsis / Description */}
        <p className="text-[14.5px] text-gray-500 leading-relaxed mb-10 font-medium opacity-90">
          {movie.description}
        </p>

        {/* Format Selection Section */}
        <div className="mb-10">
          <h3 className="text-[17px] font-bold text-[#111827] mb-5">Format Available</h3>
          <div className="flex gap-4">
            {movie.formats.map((format, idx) => (
              <button
                key={format}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-2xl text-[15px] font-extrabold transition-all duration-300 ${
                  idx === 0 
                    ? 'border-[#5D4CE8] text-[#5D4CE8] bg-[#5D4CE8]/5 shadow-sm shadow-[#5D4CE8]/20' 
                    : 'border-gray-200 text-gray-300 hover:border-gray-300'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Release Date Info */}
        <div className="mb-10">
          <h3 className="text-[17px] font-bold text-[#111827] mb-2">Release Date</h3>
          <p className="text-[15px] text-gray-500 font-bold opacity-80">{movie.releaseDate}</p>
        </div>

        {/* Cast Listing (Horizontal Scroll) */}
        <div className="mb-12">
          <h3 className="text-[17px] font-bold text-[#111827] mb-5">Cast</h3>
          <div className="flex overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
            {movie.cast.map(member => (
              <CastCard key={member.id} cast={member} />
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <PrimaryButton 
          onClick={() => navigate(`/select-theatre/${movie.slug}`)}
          className="mb-24 shadow-xl shadow-[#5D4CE8]/30 active:scale-[0.98] transition-all"
        >
          Get Tickets
        </PrimaryButton>
      </div>

      {/* Global Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MovieDetails;
