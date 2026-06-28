import React from 'react';

/**
 * CastSection — Horizontal scrolling list of cast members.
 * Props:
 *  cast - array of { name, role, image }
 */
const CastSection = ({ cast = [] }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="px-5 py-4 bg-white border-b border-[#E5E7EB] mb-3">
      <h3 className="text-[15px] font-extrabold text-[#111827] mb-3">
        Cast
      </h3>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {cast.map((actor, idx) => (
          <div
            key={actor.id || idx}
            className="flex flex-col items-center flex-shrink-0 w-[75px]"
          >
            {/* Circular Avatar */}
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-[#E5E7EB] mb-2 shadow-sm">
              <img
                src={actor.image}
                alt={actor.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Text fallback matching placeholder style
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add(
                    'bg-[#5D4CE8]',
                    'text-white',
                    'flex',
                    'items-center',
                    'justify-center',
                    'font-bold',
                    'text-[14px]'
                  );
                  e.target.parentElement.innerText = actor.name
                    ? actor.name.charAt(0).toUpperCase()
                    : '?';
                }}
              />
            </div>

            {/* Names */}
            <p className="text-[11px] font-extrabold text-[#111827] leading-tight text-center line-clamp-1 w-full">
              {actor.name}
            </p>
            {actor.character && (
              <p className="text-[9px] font-medium text-[#6B7280] leading-none text-center line-clamp-1 w-full mt-0.5">
                {actor.character}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
