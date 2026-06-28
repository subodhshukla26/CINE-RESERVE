import React, { useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

/**
 * MovieHeader — Minimal header with back button and favorite toggle.
 * Props:
 *  onBack - callback to navigate back
 */
const MovieHeader = ({ onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-[#F7F8FD] border-b border-[#E5E7EB] z-10 sticky top-0">
      <button
        onClick={onBack}
        className="p-1.5 rounded-full hover:bg-gray-200/50 active:scale-95 transition-all text-[#111827]"
        aria-label="Go back"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      <h2 className="text-[15px] font-extrabold text-[#111827]">Movie Details</h2>

      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="p-1.5 rounded-full hover:bg-gray-200/50 active:scale-95 transition-all text-[#111827]"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={22}
          strokeWidth={2.2}
          fill={isFavorite ? "#EF4444" : "none"}
          className={isFavorite ? "text-[#EF4444] transition-all scale-110" : "text-[#111827] transition-all"}
        />
      </button>
    </header>
  );
};

export default MovieHeader;
