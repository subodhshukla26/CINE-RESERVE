import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * MovieReleaseDate — Display movie release date with calendar icon.
 * Props:
 *  releaseDate - string
 */
const MovieReleaseDate = ({ releaseDate }) => {
  return (
    <div className="px-5 py-4 bg-white border-b border-[#E5E7EB] mb-3">
      <h3 className="text-[15px] font-extrabold text-[#111827] mb-2.5">
        Release Date
      </h3>
      <div className="flex items-center gap-2.5 text-[#6B7280]">
        <Calendar size={18} className="text-[#5D4CE8]" />
        <span className="text-[13px] font-extrabold text-[#111827]">
          {releaseDate || 'TBA'}
        </span>
      </div>
    </div>
  );
};

export default MovieReleaseDate;
