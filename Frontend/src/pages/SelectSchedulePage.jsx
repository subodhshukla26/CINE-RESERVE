import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Building2, Home, Ticket, Heart, User } from 'lucide-react';
import { MOVIES } from '../utils/constants';
import toast from 'react-hot-toast';

const SelectSchedulePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const passedMovie = location.state?.movie;
  const passedTheatre = location.state?.theatre;

  // Find the 'Dhurandhar: The Revenge' movie from constants
  const movie =
    passedMovie || MOVIES.find((m) => m.slug === 'dhurandhar-the-revenge') || MOVIES[0];

  // States
  const [selectedFormat, setSelectedFormat] = useState('2D');
  const [selectedSlot, setSelectedSlot] = useState({ screen: 1, time: '10:00 AM' });

  // Movie details overrides / fallback checks
  const movieTitle = movie.title || 'Dhurandhar: The Revenge';
  const theatreName = passedTheatre?.name || 'The Grandview';
  const showDate = "Friday, October 10";

  // Price range mapping based on format selection
  const priceRange = selectedFormat === '2D' ? '₹300 - ₹430' : '₹350 - ₹480';

  // Showtime slots definition
  const showtimes = [
    { time: '10:00 AM', disabled: false },
    { time: '12:00 PM', disabled: false },
    { time: '2:00 PM', disabled: true },
    { time: '4:00 PM', disabled: false },
    { time: '6:00 PM', disabled: false },
    { time: '8:00 PM', disabled: true },
  ];

  const handleSelectSlot = (screen, time, disabled) => {
    if (disabled) return;
    setSelectedSlot({ screen, time });
  };

  const handleGetTickets = () => {
    navigate('/SelectSeatPage', {
      state: {
        movie,
        theatre: passedTheatre,
        selectedSlot,
        selectedFormat,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-4">
      {/* Mobile Device Mockup container with 390px x 813px dimensions */}
      <div className="relative w-[390px] h-[813px] bg-[#F7F8FD] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-slate-200 select-none">
        
        {/* Scrollable Container */}
        <div className="flex-grow overflow-y-auto no-scrollbar pb-24">
          
          {/* Movie Banner Header */}
          <div className="relative h-[220px] w-full flex-shrink-0">
            <img
              src={movie.banner}
              alt={movieTitle}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/75"></div>
            
            {/* Header Action Buttons */}
            <div className="absolute top-8 left-5 right-5 flex justify-between items-center z-10">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-white font-semibold text-[15px] hover:opacity-80 active:scale-95 transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
                <span>Back</span>
              </button>
              
              <button
                onClick={() => navigate('/home')}
                className="text-white font-semibold text-[15px] hover:opacity-80 active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Movie Title, Theatre & Date */}
            <div className="absolute bottom-5 left-6 right-6 z-10 text-white">
              <h1 className="text-[22px] font-extrabold leading-tight drop-shadow-sm mb-1.5">
                {movieTitle}
              </h1>
              <div className="flex items-center gap-4 text-white/90 text-[12px] font-semibold">
                <div className="flex items-center gap-1">
                  <Building2 size={13} className="text-white/80" />
                  <span>{theatreName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={13} className="text-white/80" />
                  <span>{showDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator Bar */}
          <div className="w-full px-6 mt-4 flex justify-center flex-shrink-0">
            <div className="w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
              <div className="w-[45%] h-full bg-[#5D4CE8] rounded-full"></div>
            </div>
          </div>

          {/* Page Heading */}
          <div className="px-6 mt-5 mb-4">
            <h2 className="text-[20px] font-extrabold text-[#111827]">
              Choose Schedule
            </h2>
          </div>

          {/* Format Selector Row */}
          <div className="px-6 flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <span className="text-[15px] font-extrabold text-[#111827]">
                Format
              </span>
              <div className="flex gap-2">
                {['2D', '3D'].map((format) => {
                  const isSelected = selectedFormat === format;
                  return (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`w-[48px] h-[32px] flex items-center justify-center rounded-lg font-bold text-[13px] border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#5D4CE8] border-[#5D4CE8] text-white shadow-sm shadow-[#5D4CE8]/20'
                          : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {format}
                    </button>
                  );
                })}
              </div>
            </div>
            <span className="text-[15px] font-bold text-gray-500">
              {priceRange}
            </span>
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-gray-200/60 mb-5"></div>

          {/* Screen 1 Showtimes */}
          <div className="mb-5">
            <h3 className="text-[15px] font-extrabold text-[#111827] px-6 mb-3">
              Screen 1
            </h3>
            <div className="px-6 grid grid-cols-3 gap-3">
              {showtimes.map((slot) => {
                const isSelected = selectedSlot.screen === 1 && selectedSlot.time === slot.time;
                return (
                  <button
                    key={`s1-${slot.time}`}
                    disabled={slot.disabled}
                    onClick={() => handleSelectSlot(1, slot.time, slot.disabled)}
                    className={`h-[38px] flex items-center justify-center rounded-xl font-bold text-[13px] border transition-all duration-200 ${
                      slot.disabled
                        ? 'bg-transparent border-gray-100 text-gray-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#5D4CE8] border-[#5D4CE8] text-white shadow-sm shadow-[#5D4CE8]/30'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Screen 2 Showtimes */}
          <div className="mb-6">
            <h3 className="text-[15px] font-extrabold text-[#111827] px-6 mb-3">
              Screen 2
            </h3>
            <div className="px-6 grid grid-cols-3 gap-3">
              {showtimes.map((slot) => {
                const isSelected = selectedSlot.screen === 2 && selectedSlot.time === slot.time;
                return (
                  <button
                    key={`s2-${slot.time}`}
                    disabled={slot.disabled}
                    onClick={() => handleSelectSlot(2, slot.time, slot.disabled)}
                    className={`h-[38px] flex items-center justify-center rounded-xl font-bold text-[13px] border transition-all duration-200 ${
                      slot.disabled
                        ? 'bg-transparent border-gray-100 text-gray-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#5D4CE8] border-[#5D4CE8] text-white shadow-sm shadow-[#5D4CE8]/30'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="px-6 mt-8 mb-4">
            <button
              onClick={handleGetTickets}
              className="w-full bg-[#5D4CE8] text-white py-3.5 rounded-2xl font-extrabold text-[15px] hover:bg-[#4B3DBE] active:scale-[0.98] transition-all shadow-md shadow-[#5D4CE8]/20"
            >
              Get Tickets
            </button>
          </div>

        </div>

        {/* Global Bottom Navigation Footer (Fixed inside the mobile container) */}
        <nav className="absolute bottom-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50 px-6">
          <button 
            onClick={() => navigate('/home')}
            className="flex flex-col items-center justify-center w-12 h-12 text-[#5D4CE8] active:scale-90 transition-transform" 
            aria-label="Home"
          >
            <Home size={24} strokeWidth={2.5} />
          </button>
          
          <button 
            className="flex flex-col items-center justify-center w-12 h-12 text-gray-300 hover:text-gray-400 active:scale-90 transition-transform" 
            aria-label="Tickets"
          >
            <Ticket size={24} strokeWidth={2.5} />
          </button>
          
          <button 
            className="flex flex-col items-center justify-center w-12 h-12 text-gray-300 hover:text-gray-400 active:scale-90 transition-transform" 
            aria-label="Favorites"
          >
            <Heart size={24} strokeWidth={2.5} />
          </button>
          
          <button 
            className="flex flex-col items-center justify-center w-12 h-12 text-gray-300 hover:text-gray-400 active:scale-90 transition-transform" 
            aria-label="Profile"
          >
            <User size={24} strokeWidth={2.5} />
          </button>
        </nav>

      </div>
    </div>
  );
};

export default SelectSchedulePage;
