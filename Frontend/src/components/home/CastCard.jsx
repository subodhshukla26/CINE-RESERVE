import React from 'react';

const CastCard = ({ cast }) => {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 pr-4">
      <img
        src={cast.image}
        alt={cast.name}
        className="w-12 h-12 rounded-xl object-cover shadow-sm"
      />
      <div className="flex flex-col min-w-0">
        <h4 className="text-[14px] font-bold text-gray-900 leading-tight truncate">
          {cast.name}
        </h4>
        <p className="text-[11px] font-medium text-gray-400 truncate">
          {cast.role}
        </p>
      </div>
    </div>
  );
};

export default CastCard;
