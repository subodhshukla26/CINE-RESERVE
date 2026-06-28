import React from 'react';
import { Clapperboard, Film, Music, Camera, Award, Building } from 'lucide-react';

/**
 * CrewSection — Director, Producer, Writer, Music Director, Cinematographer, Production.
 * Props:
 *  crew – object with crew member fields from movie data
 */

const CREW_ROLES = [
  { key: 'director',        label: 'Director',        Icon: Clapperboard },
  { key: 'producer',        label: 'Producer',        Icon: Film },
  { key: 'writer',          label: 'Writer',          Icon: Award },
  { key: 'musicDirector',   label: 'Music',           Icon: Music },
  { key: 'cinematographer', label: 'Cinematographer', Icon: Camera },
  { key: 'productionHouse', label: 'Production',      Icon: Building },
];

const CrewCard = ({ label, name, Icon }) => (
  <div
    className="bg-white rounded-xl p-3.5 border border-gray-100 flex items-center gap-3 hover:shadow-md hover:border-[#5D4CE8]/20 transition-all duration-200"
    style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
  >
    {/* Icon */}
    <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
      <Icon size={16} className="text-[#5D4CE8]" strokeWidth={2} />
    </div>

    {/* Info */}
    <div className="min-w-0">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-[13px] font-extrabold text-[#111827] leading-tight truncate">
        {name}
      </p>
    </div>
  </div>
);

const CrewSection = ({ crew }) => {
  return (
    <div className="px-5 pb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
        <h2 className="text-[17px] font-extrabold text-[#111827]">Director & Crew</h2>
      </div>

      {/* Grid of crew cards */}
      <div className="grid grid-cols-2 gap-3">
        {CREW_ROLES.map(({ key, label, Icon }) => {
          const name = crew[key];
          if (!name) return null;
          return <CrewCard key={key} label={label} name={name} Icon={Icon} />;
        })}
      </div>
    </div>
  );
};

export default CrewSection;
