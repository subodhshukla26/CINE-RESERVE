import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Home, Ticket, Heart, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOVIES } from '../utils/constants';
import {
  recordBookingActivity,
  updateBookingDate,
  updateBookingTheatre,
} from '../services/bookingJourneyService';

const formatDateParts = (date) => ({
  day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
  date: new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date),
  iso: [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-'),
});

const buildDateWindow = (pastDays = 3, futureDays = 10) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: pastDays + futureDays + 1 }, (_, index) => {
    const offset = index - pastDays;
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    return {
      ...formatDateParts(date),
      isPast: date < today,
    };
  });
};

// Custom inline SVG logos for theatres to render sharp and pixel-perfect without network assets
const TheatreLogo = ({ type }) => {
  if (type === 'grandview') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" fill="currentColor">
        <rect x="15" y="35" width="70" height="40" rx="4" fill="#2d3748" />
        <path d="M15 25h70v10H15z" fill="#1a202c" />
        <path d="M22 25l6 10h6l-6-10zm14 0l6 10h6l-6-10zm14 0l6 10h6l-6-10zm14 0l6 10h6l-6-10z" fill="#ffffff" />
        <text x="50" y="60" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#ffffff" letterSpacing="0.5">CINEMA</text>
        <line x1="25" y1="46" x2="75" y2="46" stroke="#4a5568" strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'playloft') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-700" fill="currentColor">
        <circle cx="50" cy="45" r="22" fill="none" stroke="#2d3748" strokeWidth="3" />
        <circle cx="42" cy="45" r="4" fill="#2d3748" />
        <circle cx="58" cy="45" r="4" fill="#2d3748" />
        <path d="M36 30l6-6h16l6 6" fill="none" stroke="#2d3748" strokeWidth="3" strokeLinecap="round" />
        <text x="50" y="82" fontSize="9" fontWeight="800" textAnchor="middle" fill="#2d3748" letterSpacing="0.5">CINEMA</text>
      </svg>
    );
  }
  if (type === 'cinemaone') {
    return (
      <svg viewBox="0 0 120 100" className="w-full h-full" fill="currentColor">
        <text x="35" y="55" fontSize="52" fontWeight="900" textAnchor="middle" fill="#005BFF" fontStyle="italic">C</text>
        <text x="75" y="55" fontSize="52" fontWeight="900" textAnchor="middle" fill="#005BFF">1</text>
        <text x="55" y="85" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#005BFF" letterSpacing="1">CINEMAONE</text>
      </svg>
    );
  }
  if (type === 'cinemount') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 55l22-26 18 18 25-24 10 10" stroke="#b45309" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="68" cy="22" r="7" fill="#f59e0b" stroke="none" />
        <path d="M15 60h70" stroke="#b45309" strokeWidth="3" />
        <text x="50" y="78" fontSize="8" fontWeight="900" textAnchor="middle" fill="#78350f" stroke="none" letterSpacing="0.5">CINEMOUNT</text>
        <text x="50" y="88" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#b45309" stroke="none" letterSpacing="0.5">FILM</text>
      </svg>
    );
  }
  // Default fallback if logo URL is provided
  return (
    <div className="w-full h-full bg-indigo-50 flex items-center justify-center rounded-lg text-[#5D4CE8] font-bold text-xs">
      CNM
    </div>
  );
};

const PROTOTYPE_THEATRES = [
  {
    id: '1',
    name: 'PVR Phoenix Palassio',
    location: 'Gomti Nagar, Lucknow',
    priceRange: '₹320 - ₹450',
    logo: 'grandview',
  },
  {
    id: '2',
    name: 'INOX Megaplex',
    location: 'Alambagh, Lucknow',
    priceRange: '₹300 - ₹430',
    logo: 'playloft',
  },
  {
    id: '3',
    name: 'Cinepolis One Awadh Center',
    location: 'Hazratganj, Lucknow',
    priceRange: '₹320',
    logo: 'cinemaone',
  },
  {
    id: '4',
    name: 'Wave Cinemas Lucknow',
    location: 'Sushant Golf City, Lucknow',
    priceRange: '₹350',
    logo: 'cinemount',
  },
];

const SelectTheatre = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Find the selected movie from constants
  const movie =
    location.state?.movie ||
    MOVIES.find((m) => m.slug === slug) ||
    MOVIES.find((m) => m.slug === 'meg-2-the-trench') ||
    MOVIES[0];
  const selectedMovieId = movie?._id || movie?.id;
  const canSyncJourney = typeof selectedMovieId === 'string' && /^[a-f\d]{24}$/i.test(selectedMovieId);

  const DATES = buildDateWindow();
  const todayIso = DATES.find((date) => !date.isPast)?.iso || DATES[0].iso;
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const hasSyncedInitialDate = useRef(false);

  // Selected theatre state for premium highlight interaction
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  const syncDateSelection = useCallback(async (dateValue) => {
    if (!canSyncJourney) {
      toast.error('Movie journey is not ready yet. Please start from Movie Details.');
      return;
    }

    try {
      await updateBookingDate({
        selectedMovieId,
        selectedDate: dateValue,
      });

      await recordBookingActivity({
        selectedMovieId,
        eventName: 'Date Selected',
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to update the selected date.';
      toast.error(message);
    }
  }, [canSyncJourney, selectedMovieId]);

  useEffect(() => {
    if (!canSyncJourney || hasSyncedInitialDate.current) {
      return;
    }

    hasSyncedInitialDate.current = true;
    syncDateSelection(selectedDate);
  }, [canSyncJourney, selectedDate, syncDateSelection]);

  const handleDateClick = (dateValue, isPast) => {
    if (isPast) {
      return;
    }

    setSelectedDate(dateValue);
    syncDateSelection(dateValue);
  };

  const handleTheatreClick = async (theatre) => {
    if (!canSyncJourney) {
      toast.error('Movie journey is not ready yet. Please start from Movie Details.');
      return;
    }

    setSelectedTheatre(theatre.id);

    try {
      await updateBookingTheatre({
        selectedMovieId,
        selectedTheatre: theatre,
      });

      await recordBookingActivity({
        selectedMovieId,
        eventName: 'Theatre Selected',
      });

      navigate('/SelectSchedulePage', {
        state: {
          theatre,
          movie,
          selectedDate,
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to update the selected theatre.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-4">
      {/* Mobile Device Mockup container with 390px x 813px dimensions */}
      <div className="relative w-[390px] h-[813px] bg-[#F7F8FD] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Scrollable Container */}
        <div className="flex-grow overflow-y-auto no-scrollbar pb-24">
          
          {/* Movie Banner Header */}
          <div className="relative h-[220px] w-full flex-shrink-0">
            <img
              src={movie.banner}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/75"></div>
            
            {/* Header Action Buttons */}
            <div className="absolute top-8 left-5 right-5 flex justify-between items-center z-10">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center gap-1.5 text-white font-medium text-[15px] hover:opacity-80 active:scale-95 transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
                <span>Back</span>
              </button>
              
              <button
                onClick={() => navigate('/home')}
                className="text-white font-medium text-[15px] hover:opacity-80 active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Movie Title & Genre */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h1 className="text-[22px] font-extrabold text-white leading-tight drop-shadow-sm mb-1">
                {movie.title}
              </h1>
              <p className="text-[13px] font-medium text-white/80">
                {movie.genre}
              </p>
            </div>
          </div>

          {/* Progress Indicator Bar */}
          <div className="w-full px-6 mt-4 flex justify-center flex-shrink-0">
            <div className="w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
              <div className="w-[30%] h-full bg-[#5D4CE8] rounded-full"></div>
            </div>
          </div>

          {/* Page Heading */}
          <div className="px-6 mt-5 mb-4">
            <h2 className="text-[20px] font-extrabold text-[#111827]">
              Select Movie Theatre
            </h2>
          </div>

          {/* Date Selector Row */}
          <div className="px-6 flex items-center justify-between mb-2">
            <p className="text-[12px] font-semibold text-gray-500">
              Tickets available from today onwards
            </p>
          </div>

          <div className="px-6 flex gap-3 overflow-x-auto no-scrollbar mb-5">
            {DATES.map((d) => {
              const isSelected = selectedDate === d.iso;
              return (
                <button
                  key={d.iso}
                  disabled={d.isPast}
                  onClick={() => handleDateClick(d.iso, d.isPast)}
                  className={`flex flex-col items-center gap-1.5 focus:outline-none group transition-transform ${
                    d.isPast ? 'cursor-not-allowed opacity-45' : 'active:scale-95'
                  }`}
                >
                  <span
                    className={`text-[12px] font-bold transition-colors ${
                      isSelected
                        ? 'text-[#5D4CE8]'
                        : d.isPast
                        ? 'text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {d.day}
                  </span>
                  <div
                    className={`w-[38px] h-[38px] flex items-center justify-center rounded-xl font-bold text-[14px] transition-all duration-200 border ${
                      d.isPast
                        ? 'bg-gray-100 border-gray-200 text-gray-300'
                        : isSelected
                        ? 'bg-[#5D4CE8] border-[#5D4CE8] text-white shadow-sm shadow-[#5D4CE8]/30'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {d.date}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-gray-200/60 mb-6"></div>

          {/* Theatre Cards List */}
          <div className="flex flex-col gap-4 px-6">
            {PROTOTYPE_THEATRES.map((theatre) => {
              const isSelected = selectedTheatre === theatre.id;
              const isSvgLogo = ['grandview', 'playloft', 'cinemaone', 'cinemount'].includes(theatre.logo);
              
              return (
                <div
                  key={theatre.id}
                  onClick={() => handleTheatreClick(theatre)}
                  className={`flex items-center gap-4 p-3 bg-white rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#5D4CE8] shadow-md shadow-[#5D4CE8]/5 scale-[1.01]'
                      : 'border-transparent shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Logo Container */}
                  <div className="flex-shrink-0 w-[64px] h-[64px] bg-white rounded-xl flex items-center justify-center border border-gray-100 p-1 overflow-hidden">
                    {isSvgLogo ? (
                      <TheatreLogo type={theatre.logo} />
                    ) : (
                      <img
                        src={theatre.logo}
                        alt={`${theatre.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Theatre Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-[15px] font-extrabold text-gray-900 mb-0.5 truncate">
                      {theatre.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 mb-1">
                      <MapPin size={12} className="flex-shrink-0 text-gray-400/80" />
                      <span className="text-[11px] font-semibold truncate text-gray-400">
                        {theatre.location}
                      </span>
                    </div>
                    <p className="text-[13px] font-extrabold text-[#5D4CE8]">
                      {theatre.priceRange}
                    </p>
                  </div>
                </div>
              );
            })}
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

export default SelectTheatre;
