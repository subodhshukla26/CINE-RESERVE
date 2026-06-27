import React from 'react';
import TheatreCard from './TheatreCard';
import { THEATRES } from '../../utils/constants';

const TheatreSection = () => {
  return (
    <section className="mt-6 mb-28">
      <div className="px-5 flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-bold text-gray-900">
          Movie Theatres
        </h2>
        <button className="text-[13px] font-bold text-[#5D4CE8] hover:opacity-80 transition-opacity">
          View All
        </button>
      </div>

      <div className="flex flex-col">
        {THEATRES.map((theatre) => (
          <TheatreCard key={theatre.id} theatre={theatre} />
        ))}
      </div>
    </section>
  );
};

export default TheatreSection;
