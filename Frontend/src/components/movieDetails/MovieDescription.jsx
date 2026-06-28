import React, { useState } from 'react';

/**
 * MovieDescription — Expandable movie overview description.
 * Props:
 *  description - string
 */
const MovieDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split or truncate by lines/character limit
  const wordLimit = 25;
  const words = description ? description.split(' ') : [];
  const needsTruncation = words.length > wordLimit;

  const displayDescription = isExpanded || !needsTruncation
    ? description
    : `${words.slice(0, wordLimit).join(' ')}...`;

  return (
    <div className="px-5 py-4 bg-white border-t border-b border-[#E5E7EB] my-3">
      <h3 className="text-[15px] font-extrabold text-[#111827] mb-2">
        About Movie
      </h3>
      <p className="text-[13px] font-medium text-[#6B7280] leading-relaxed transition-all duration-300">
        {displayDescription}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#5D4CE8] text-[12px] font-extrabold mt-1.5 focus:outline-none hover:underline active:scale-95 transition-transform"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default MovieDescription;
