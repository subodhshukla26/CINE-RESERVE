import React from 'react';
import { MapPin } from 'lucide-react';

const TheatreCard = ({ theatre }) => {
  return (
    <div className="flex items-center gap-4 px-5 mb-6 last:mb-0 group cursor-pointer">
      {/* Logo Container */}
      <div className="flex-shrink-0 w-[64px] h-[64px] bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 p-2 overflow-hidden">
        <img
          src={theatre.logo}
          alt={`${theatre.name} logo`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-[15px] font-bold text-gray-900 mb-0.5 truncate">
          {theatre.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 mb-1">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="text-[11px] font-medium truncate">
            {theatre.location}
          </span>
        </div>
        <p className="text-[13.5px] font-bold text-gray-700">
          {theatre.priceRange}
        </p>
      </div>
    </div>
  );
};

export default TheatreCard;
