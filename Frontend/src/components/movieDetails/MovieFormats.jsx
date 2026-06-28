import React from 'react';

/**
 * MovieFormats — Renders available video/theatrical formats as rounded chips.
 * Props:
 *  formats - array of strings
 */
const MovieFormats = ({ formats = [] }) => {
  if (!formats || formats.length === 0) return null;

  return (
    <div className="px-5 py-4 bg-white border-b border-[#E5E7EB] mb-3">
      <h3 className="text-[15px] font-extrabold text-[#111827] mb-2.5">
        Available Formats
      </h3>
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <div
            key={format}
            className="px-3.5 py-1.5 bg-[#F7F8FD] border border-[#E5E7EB] rounded-full text-[12px] font-bold text-[#111827] hover:border-[#5D4CE8] hover:text-[#5D4CE8] transition-all cursor-pointer select-none"
          >
            {format}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieFormats;
