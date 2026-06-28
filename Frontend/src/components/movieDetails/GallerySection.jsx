import React, { useState } from 'react';

/**
 * GallerySection — Movie stills, posters and promotional images in a masonry-style grid.
 * Props:
 *  gallery – array of { id, image, type: 'poster'|'still'|'promo', alt }
 */

const GALLERY_FILTERS = ['All', 'Posters', 'Stills', 'Promo'];

const GalleryCard = ({ item }) => (
  <div
    className="relative overflow-hidden rounded-xl cursor-pointer group"
    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
  >
    <img
      src={item.image}
      alt={item.alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />
    {/* Type label on hover */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-2">
      <span className="text-white text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#5D4CE8]/80 px-2 py-0.5 rounded-md">
        {item.type}
      </span>
    </div>
  </div>
);

const GallerySection = ({ gallery }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = gallery.filter((item) => {
    if (activeFilter === 'All') return true;
    const map = { 'Posters': 'poster', 'Stills': 'still', 'Promo': 'promo' };
    return item.type === map[activeFilter];
  });

  return (
    <div className="pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
          <h2 className="text-[17px] font-extrabold text-[#111827]">Gallery</h2>
        </div>
        <span className="text-[12px] font-bold text-[#5D4CE8]">{filtered.length} Photos</span>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto no-scrollbar">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold border transition-all duration-200 ${
              activeFilter === f
                ? 'bg-[#5D4CE8] border-[#5D4CE8] text-white shadow-sm shadow-[#5D4CE8]/20'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <div className="px-5 grid grid-cols-3 gap-2">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className={idx === 0 ? 'col-span-2 row-span-2' : ''}
            style={{
              aspectRatio: idx === 0 ? '1/1' : '2/3',
            }}
          >
            <GalleryCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
