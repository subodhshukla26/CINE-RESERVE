import React, { useState } from 'react';
import {
  ChevronLeft,
  Heart,
  Star,
  Play,
  Ticket,
  Clock,
  Calendar,
  Globe,
  Shield,
} from 'lucide-react';

/**
 * MovieHero — Full-bleed cinematic banner with poster, ratings, metadata & CTAs.
 * Props:
 *  movie  – movie data object (from placeholder or future GET /api/movies/:id)
 *  onBack – callback to navigate back
 */
const MovieHero = ({ movie, onBack }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [trailerHovered, setTrailerHovered] = useState(false);

  return (
    <div className="relative w-full" style={{ minHeight: '520px' }}>

      {/* ── Cinematic Banner Background ─────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'brightness(0.35) saturate(1.2)' }}
        />
        {/* Multi-stop gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 75%, rgba(15,10,30,0.98) 100%)',
          }}
        />
        {/* Subtle color tint for cinematic feel */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 60% 30%, rgba(93,76,232,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 px-5 pt-10 pb-8 flex flex-col" style={{ minHeight: '520px' }}>

        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-white font-semibold text-[15px] hover:opacity-70 active:scale-95 transition-all"
            aria-label="Go back"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
            <span>Back</span>
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => setWishlisted((v) => !v)}
            className={`p-2.5 rounded-full border transition-all duration-300 active:scale-90 ${
              wishlisted
                ? 'bg-red-500/20 border-red-400/50 text-red-400'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={20}
              strokeWidth={2.2}
              fill={wishlisted ? 'currentColor' : 'none'}
              className="transition-all duration-200"
            />
          </button>
        </div>

        {/* Poster + Core Info Row */}
        <div className="flex gap-4 mt-auto mb-5">
          {/* Poster */}
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ width: '110px', height: '160px' }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title + Metadata */}
          <div className="flex flex-col justify-end gap-2 flex-1 min-w-0">
            {/* IMDb Badge */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-amber-400/20 border border-amber-400/40 rounded-md px-2 py-0.5">
                <Star size={11} fill="#F59E0B" className="text-amber-400" />
                <span className="text-amber-300 text-[11px] font-extrabold">
                  {movie.imdbRating} IMDb
                </span>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-md px-2 py-0.5">
                <span className="text-white/80 text-[11px] font-bold">
                  {movie.certificate}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-white text-[20px] font-extrabold leading-tight drop-shadow-lg">
              {movie.title}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-white/50 text-[11px] font-medium italic leading-snug line-clamp-2">
                "{movie.tagline}"
              </p>
            )}

            {/* Quick Meta Pills */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              <div className="flex items-center gap-1 text-white/70 text-[10px] font-semibold">
                <Clock size={10} className="text-[#5D4CE8]" />
                <span>{movie.duration}</span>
              </div>
              <span className="text-white/30">·</span>
              <div className="flex items-center gap-1 text-white/70 text-[10px] font-semibold">
                <Globe size={10} className="text-[#5D4CE8]" />
                <span>{movie.language}</span>
              </div>
              <span className="text-white/30">·</span>
              <div className="flex items-center gap-1 text-white/70 text-[10px] font-semibold">
                <Calendar size={10} className="text-[#5D4CE8]" />
                <span>{movie.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[11px] font-semibold text-white/80 backdrop-blur-sm"
            >
              {g}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          {/* Book Tickets — Primary */}
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-[#5D4CE8] hover:bg-[#4B3DBE] active:scale-[0.97] transition-all duration-200 text-white font-extrabold text-[14px] py-3.5 rounded-2xl shadow-lg shadow-[#5D4CE8]/30"
            aria-label="Book tickets"
          >
            <Ticket size={16} strokeWidth={2.5} />
            Book Tickets
          </button>

          {/* Watch Trailer */}
          <button
            onMouseEnter={() => setTrailerHovered(true)}
            onMouseLeave={() => setTrailerHovered(false)}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-[0.97] border border-white/20 transition-all duration-200 text-white font-bold text-[13px] px-4 py-3.5 rounded-2xl backdrop-blur-sm"
            aria-label="Watch trailer"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/40 transition-all duration-200 ${
                trailerHovered ? 'bg-white/30' : 'bg-white/10'
              }`}
            >
              <Play size={10} fill="white" className="text-white ml-0.5" />
            </div>
            Trailer
          </button>

          {/* Wishlist Quick Toggle */}
          <button
            onClick={() => setWishlisted((v) => !v)}
            className={`flex items-center justify-center w-[50px] rounded-2xl border transition-all duration-300 active:scale-90 ${
              wishlisted
                ? 'bg-red-500/20 border-red-400/50 text-red-400'
                : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
            }`}
            aria-label="Wishlist"
          >
            <Heart
              size={18}
              strokeWidth={2.2}
              fill={wishlisted ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
