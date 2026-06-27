import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Ticket, Heart, User, Building2, Calendar } from 'lucide-react';
import { MOVIES } from '../utils/constants';

const BookingSummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve details from location state with mock fallbacks
  const movie = location.state?.movie || MOVIES.find((m) => m.slug === 'dhurandhar-the-revenge') || MOVIES[0];
  const theatre = location.state?.theatre || { name: 'The Grandview' };
  const selectedSlot = location.state?.selectedSlot || { screen: 1, time: '10:00 AM' };
  const selectedFormat = location.state?.selectedFormat || '2D';
  const seats = location.state?.selectedSeats || ['J9', 'J10'];
  const ticketPrice = location.state?.totalPrice ?? 560; // default for 2 tickets is ₹560

  const movieTitle = movie?.title || 'Dhurandhar: The Revenge';
  const movieBanner = movie?.banner || movie?.poster;
  const theatreName = theatre?.name || 'The Grandview';
  const showDate = 'Friday, October 10'; // Unified default date from schedule and theatre pages
  const bookingFee = 20;
  const totalPrice = ticketPrice + bookingFee;

  const handleProceedPayment = () => {
    navigate('/PaymentPage', {
      state: {
        movie,
        theatre,
        selectedSlot,
        selectedFormat,
        selectedSeats: seats,
        totalPrice: ticketPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-4">
      {/* ── 390 × 844 Mobile Mockup Frame ── */}
      <div className="relative w-[390px] h-[844px] bg-[#F7F8FD] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-slate-200 select-none">
        
        {/* ── Scrollable Body ── */}
        <div className="flex-grow overflow-y-auto no-scrollbar pb-[88px]">
          
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 pt-10 pb-0 bg-[#F7F8FD]">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#111827] font-semibold text-[15px] hover:opacity-70 active:scale-95 transition-all"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
              <span>Back</span>
            </button>
            <button
              onClick={() => navigate('/home')}
              className="text-[#111827] font-semibold text-[15px] hover:opacity-70 active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>

          {/* ── Progress Bar ── */}
          <div className="px-5 mt-4">
            <div className="w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
              {/* Progress: ~85% for booking summary page */}
              <div className="w-[85%] h-full bg-[#5D4CE8] rounded-full" />
            </div>
          </div>

          {/* ── Page Title ── */}
          <div className="px-5 mt-5 mb-4">
            <h1 className="text-[22px] font-extrabold text-[#111827] leading-tight">
              Booking Summary
            </h1>
          </div>

          {/* ── Movie Poster Card ── */}
          <div className="px-5 mb-4">
            <div className="w-full h-[180px] rounded-[16px] overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img
                src={movieBanner}
                alt={movieTitle}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── Movie & Booking Details ── */}
          <div className="px-5">
            <h2 className="text-[20px] font-extrabold text-[#111827] leading-tight mb-2">
              {movieTitle}
            </h2>

            {/* Theatre & Date */}
            <div className="flex flex-col gap-2.5 mb-4">
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-[13px]">
                <Building2 size={16} className="text-[#8E9CAA]" />
                <span>{theatreName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-[13px]">
                <Calendar size={16} className="text-[#8E9CAA]" />
                <span>{showDate}</span>
              </div>
            </div>

            {/* Screen, Time, Format Row */}
            <div className="flex items-center gap-4 text-slate-500 font-semibold text-[14px] mb-3">
              <span>Screen {selectedSlot.screen}</span>
              <span className="text-[#5D4CE8] font-extrabold">{selectedSlot.time}</span>
              <span>{selectedFormat}</span>
            </div>

            {/* Seats Badges */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-slate-500 font-semibold text-[14px]">Seats</span>
              <div className="flex gap-2 flex-wrap">
                {seats.map((seat) => (
                  <span
                    key={seat}
                    className="px-2.5 py-0.5 bg-[#8E9CAA] text-white font-bold text-[12px] rounded-md shadow-sm"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Price Breakdown ── */}
          <div className="px-5 mb-6">
            <div className="flex flex-col gap-3">
              {/* Ticket count & subtotal */}
              <div className="flex justify-between items-center text-slate-500 font-semibold text-[14px]">
                <span>{seats.length}x Tickets</span>
                <span className="text-[#111827]">₹{ticketPrice}</span>
              </div>
              
              {/* Booking Fee */}
              <div className="flex justify-between items-center text-slate-500 font-semibold text-[14px]">
                <span>Booking Fee</span>
                <span className="text-[#111827]">₹{bookingFee}</span>
              </div>
              
              {/* Divider */}
              <div className="w-full border-t border-gray-200/80 my-1" />
              
              {/* Total Price */}
              <div className="flex justify-between items-center text-[#111827] font-extrabold text-[16px]">
                <span>Total</span>
                <span className="text-[17px]">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* ── CTA Button ── */}
          <div className="px-5 mb-4">
            <button
              onClick={handleProceedPayment}
              disabled={!seats || seats.length === 0}
              className="w-full bg-[#5D4CE8] text-white py-4 rounded-2xl font-extrabold text-[15px] hover:bg-[#4B3DBE] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#5D4CE8]/20"
            >
              Proceed to Payment
            </button>
          </div>

        </div>

        {/* ── Bottom Navigation (fixed inside frame) ── */}
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

export default BookingSummaryPage;
