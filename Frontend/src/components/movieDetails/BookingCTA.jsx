import React from 'react';

/**
 * BookingCTA — Bottom action container with a full width button.
 * Props:
 *  onBook - Callback when clicked
 */
const BookingCTA = ({ onBook }) => {
  return (
    <div className="w-full bg-[#F7F8FD]/80 backdrop-blur-md border-t border-[#E5E7EB] px-5 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
      <button
        onClick={onBook}
        className="w-full bg-[#5D4CE8] hover:bg-[#4B3DBE] active:scale-[0.98] transition-all duration-150 text-white font-extrabold text-[14px] py-3.5 rounded-xl shadow-md shadow-[#5D4CE8]/20 text-center select-none"
      >
        Get Tickets
      </button>
    </div>
  );
};

export default BookingCTA;
