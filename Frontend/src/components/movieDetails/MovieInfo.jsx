import React from 'react';
import { Star } from 'lucide-react';

const toList = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
};

/**
 * MovieInfo - Display title, rating, duration, languages, genres, and status.
 * Props:
 *  title - string
 *  rating - number
 *  duration - string
 *  languages - array of strings
 *  genres - array of strings
 *  status - string
 */
const MovieInfo = ({ title, rating, duration, languages = [], genres = [], status }) => {
  const languageList = toList(languages);
  const genreList = toList(genres);

  return (
    <div className="px-5 pb-5 text-center bg-[#F7F8FD]">
      <h1 className="text-[22px] font-extrabold text-[#111827] leading-tight mb-2">
        {title}
      </h1>

      <div className="flex items-center justify-center gap-2 mb-3">
        {typeof rating === 'number' && rating > 0 && (
          <div className="flex items-center gap-1 bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg px-2.5 py-0.5">
            <Star size={13} fill="#F59E0B" className="text-amber-500" />
            <span className="text-[#92400E] text-[12px] font-bold">
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        {status && (
          <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded-lg text-[11px] font-bold">
            {status}
          </span>
        )}
      </div>

      <p className="text-[13px] font-semibold text-[#6B7280] mb-1">
        {duration || 'TBA'} <span className="mx-1.5">•</span>{' '}
        {languageList.length > 0 ? languageList.join(' • ') : 'Language TBA'}
      </p>

      <p className="text-[13px] font-extrabold text-[#5D4CE8]">
        {genreList.length > 0 ? genreList.join(' • ') : 'Genre TBA'}
      </p>
    </div>
  );
};

export default MovieInfo;
