import React from 'react';
import { User } from 'lucide-react';

/**
 * DirectorSection — Display the director name.
 * Props:
 *  director - string
 */
const DirectorSection = ({ director }) => {
  return (
    <div className="px-5 py-4 bg-white border-b border-[#E5E7EB] mb-3">
      <h3 className="text-[15px] font-extrabold text-[#111827] mb-2.5">
        Director
      </h3>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#F7F8FD] flex items-center justify-center border border-[#E5E7EB] text-[#5D4CE8]">
          <User size={16} strokeWidth={2.5} />
        </div>
        <span className="text-[13px] font-extrabold text-[#111827]">
          {director || 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default DirectorSection;
