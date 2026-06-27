import React from 'react';
import { Home, Ticket, Heart, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[72px] bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50">
      <button className="flex flex-col items-center justify-center w-full h-full text-[#5D4CE8]" aria-label="Home">
        <Home size={26} strokeWidth={2} />
      </button>
      <button className="flex flex-col items-center justify-center w-full h-full text-gray-300 hover:text-gray-400 transition-colors" aria-label="Tickets">
        <Ticket size={26} strokeWidth={2} />
      </button>
      <button className="flex flex-col items-center justify-center w-full h-full text-gray-300 hover:text-gray-400 transition-colors" aria-label="Favorites">
        <Heart size={26} strokeWidth={2} />
      </button>
      <button className="flex flex-col items-center justify-center w-full h-full text-gray-300 hover:text-gray-400 transition-colors" aria-label="Profile">
        <User size={26} strokeWidth={2} />
      </button>
    </nav>
  );
};

export default BottomNav;
