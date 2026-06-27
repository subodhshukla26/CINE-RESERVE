import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Ticket, Heart, User } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Seat Layout Data ────────────────────────────────────────────────────────
// Rows A–H: 10 seats each | Rows J–M: 12 seats each (no row I — standard cinema)
const ROW_CONFIG = [
  { row: 'A', seats: 10 },
  { row: 'B', seats: 10 },
  { row: 'C', seats: 10 },
  { row: 'D', seats: 10 },
  { row: 'E', seats: 10 },
  { row: 'F', seats: 10 },
  { row: 'G', seats: 10 },
  { row: 'H', seats: 10 },
  // gap here
  { row: 'J', seats: 12 },
  { row: 'K', seats: 12 },
  { row: 'L', seats: 12 },
  { row: 'M', seats: 12 },
];

// Pre-occupied seats: cannot be selected
const OCCUPIED_SEATS = new Set([
  'J-11', 'J-12',
  'K-11', 'K-12',
  'L-11', 'L-12',
  'M-9', 'M-10', 'M-11', 'M-12',
]);

// Initially selected seats (as shown in Figma)
const INITIAL_SELECTED = new Set(['H-7', 'H-8', 'H-9', 'H-10', 'J-9', 'J-10']);

const PRICE_PER_SEAT = 280; // ₹560 / 2 selected = ₹280 per seat to match Figma pricing

// ─── Seat Component ──────────────────────────────────────────────────────────
const Seat = ({ seatKey, number, status, onToggle }) => {
  const base =
    'flex items-center justify-center rounded-md font-semibold text-[10px] leading-none select-none transition-all duration-150 active:scale-90';

  const styles = {
    available:
      'w-[25px] h-[22px] bg-white border border-gray-200 text-gray-500 cursor-pointer hover:border-[#5D4CE8] hover:text-[#5D4CE8]',
    occupied:
      'w-[25px] h-[22px] bg-gray-200 border border-gray-200 text-gray-400 cursor-not-allowed',
    selected:
      'w-[25px] h-[22px] bg-[#5D4CE8] border border-[#5D4CE8] text-white cursor-pointer shadow-sm shadow-[#5D4CE8]/30',
  };

  return (
    <button
      className={`${base} ${styles[status]}`}
      onClick={() => status !== 'occupied' && onToggle(seatKey)}
      disabled={status === 'occupied'}
      aria-label={`Seat ${seatKey} - ${status}`}
    >
      {number}
    </button>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state passed from SelectSchedulePage
  const movie = location.state?.movie;
  const passedTheatre = location.state?.theatre;
  const selectedSlot = location.state?.selectedSlot || { screen: 1, time: '10:00 AM' };
  const selectedFormat = location.state?.selectedFormat || '2D';

  const [selectedSeats, setSelectedSeats] = useState(new Set(INITIAL_SELECTED));

  const toggleSeat = (seatKey) => {
    setSelectedSeats((prev) => {
      const next = new Set(prev);
      if (next.has(seatKey)) {
        next.delete(seatKey);
      } else {
        next.add(seatKey);
      }
      return next;
    });
  };

  const totalPrice = selectedSeats.size * PRICE_PER_SEAT;

  const handleViewSummary = () => {
    if (selectedSeats.size === 0) {
      toast.error('Please select at least one seat.', {
        style: {
          background: '#1F2937',
          color: '#fff',
          borderRadius: '14px',
          fontWeight: '600',
          fontSize: '14px',
        },
      });
      return;
    }
    
    // Format seats list to display like ["J9", "J10"] instead of ["J-9", "J-10"]
    const formattedSeats = [...selectedSeats].map(s => s.replace('-', ''));
    
    navigate('/BookingSummaryPage', {
      state: {
        movie,
        theatre: passedTheatre,
        selectedSlot,
        selectedFormat,
        selectedSeats: formattedSeats,
        totalPrice,
      },
    });
  };

  const getSeatStatus = (seatKey) => {
    if (OCCUPIED_SEATS.has(seatKey)) return 'occupied';
    if (selectedSeats.has(seatKey)) return 'selected';
    return 'available';
  };

  const GAP_AFTER = 'H'; // visual gap between H and J rows

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
              <div className="w-[65%] h-full bg-[#5D4CE8] rounded-full" />
            </div>
          </div>

          {/* ── Page Title ── */}
          <div className="px-5 mt-5 mb-1">
            <h1 className="text-[22px] font-extrabold text-[#111827] leading-tight">
              Select Seats
            </h1>
          </div>

          {/* ── Screen / Showtime Info Row ── */}
          <div className="px-5 flex items-center gap-2 mb-4">
            <span className="text-[13px] font-semibold text-gray-400">Screen {selectedSlot.screen}</span>
            <span className="text-[13px] font-extrabold text-[#5D4CE8]">{selectedSlot.time}</span>
            <span className="ml-auto text-[13px] font-extrabold text-[#111827]">
              ₹{totalPrice}
            </span>
          </div>

          {/* ── Cinema Screen Arc ── */}
          <div className="px-4 mb-3 flex flex-col items-center">
            <div className="w-full relative flex items-center justify-center">
              {/* Arc SVG */}
              <svg
                viewBox="0 0 320 36"
                className="w-full"
                preserveAspectRatio="none"
                height="36"
              >
                <path
                  d="M 8 32 Q 160 4 312 32"
                  fill="none"
                  stroke="#C8C8D4"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase mt-0.5">
              SCREEN
            </span>
          </div>

          {/* ── Seat Grid ── */}
          <div className="px-4">
            {ROW_CONFIG.map((rowDef, idx) => {
              const isAfterGap = idx > 0 && ROW_CONFIG[idx - 1].row === GAP_AFTER;
              return (
                <React.Fragment key={rowDef.row}>
                  {/* Gap row spacer */}
                  {isAfterGap && <div className="h-4" />}

                  <div className="flex items-center gap-1 mb-[6px]">
                    {/* Row Label */}
                    <span className="w-[14px] text-[11px] font-bold text-gray-400 flex-shrink-0 text-center">
                      {rowDef.row}
                    </span>

                    {/* Seats */}
                    <div className="flex gap-[4px] flex-wrap">
                      {Array.from({ length: rowDef.seats }, (_, i) => {
                        const num = i + 1;
                        const seatKey = `${rowDef.row}-${num}`;
                        const status = getSeatStatus(seatKey);
                        return (
                          <Seat
                            key={seatKey}
                            seatKey={seatKey}
                            number={num}
                            status={status}
                            onToggle={toggleSeat}
                          />
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* ── Divider ── */}
          <div className="mx-5 border-t border-gray-200/70 mt-4 mb-4" />

          {/* ── Legend ── */}
          <div className="px-5 flex items-center justify-center gap-6 mb-5">
            {/* Available */}
            <div className="flex items-center gap-2">
              <div className="w-[18px] h-[16px] rounded-sm border-2 border-gray-300 bg-white" />
              <span className="text-[12px] font-semibold text-gray-500">Available</span>
            </div>
            {/* Occupied */}
            <div className="flex items-center gap-2">
              <div className="w-[18px] h-[16px] rounded-sm bg-gray-300" />
              <span className="text-[12px] font-semibold text-gray-500">Occupied</span>
            </div>
            {/* Selected */}
            <div className="flex items-center gap-2">
              <div className="w-[18px] h-[16px] rounded-sm bg-[#5D4CE8]" />
              <span className="text-[12px] font-semibold text-gray-500">Selected</span>
            </div>
          </div>

          {/* ── CTA Button ── */}
          <div className="px-5 mb-4">
            <button
              onClick={handleViewSummary}
              className="w-full bg-[#5D4CE8] text-white py-4 rounded-2xl font-extrabold text-[15px] hover:bg-[#4B3DBE] active:scale-[0.98] transition-all shadow-md shadow-[#5D4CE8]/20"
            >
              View Booking Summary
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

export default SeatSelectionPage;
