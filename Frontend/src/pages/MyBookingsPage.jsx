import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Ticket, Heart, User, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getUserBookings, cancelBooking } from '../services/bookingJourneyService';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Returns true if the booking's show is still upcoming (in the future).
 * We compare showDate + showTime against the current local time.
 */
const isUpcoming = (booking) => {
  try {
    const rawDate = booking.showDate || '';
    const rawTime = booking.showTime || '';
    // Build a parseable date string, e.g. "Friday, October 10 10:00 AM"
    const combined = `${rawDate} ${rawTime}`;
    const parsed = new Date(combined);
    if (isNaN(parsed.getTime())) {
      // Fallback: compare transactionDate + 1 day as cutoff
      const txDate = new Date(booking.transactionDate || booking.createdAt);
      txDate.setDate(txDate.getDate() + 1);
      return txDate > new Date();
    }
    // Add current year if year is missing (common with month-day only strings)
    const now = new Date();
    if (parsed.getFullYear() < now.getFullYear()) {
      parsed.setFullYear(now.getFullYear());
    }
    return parsed > now;
  } catch {
    return true;
  }
};

const formatTxDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return dateStr;
  }
};

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-[18px] shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="w-full h-[160px] bg-gray-200" />
    <div className="p-4">
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="flex gap-8 mb-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="flex gap-8 mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="flex justify-between">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
        <div className="h-8 bg-gray-200 rounded-lg w-1/4" />
      </div>
    </div>
  </div>
);

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState = ({ tab }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6">
    <div className="w-[72px] h-[72px] rounded-full bg-slate-100 flex items-center justify-center mb-4">
      <Ticket size={32} className="text-slate-300" strokeWidth={1.5} />
    </div>
    <p className="text-[15px] font-bold text-[#111827] mb-1">
      {tab === 'current' ? 'No upcoming bookings' : 'No past bookings'}
    </p>
    <p className="text-[13px] font-medium text-gray-400 text-center leading-snug">
      {tab === 'current'
        ? 'Your confirmed tickets will appear here.'
        : 'Cancelled or past show tickets will appear here.'}
    </p>
  </div>
);

// ─── Booking Card ─────────────────────────────────────────────────────────────
const BookingCard = ({ booking, onCancel, cancelling, showPaymentAction, onProceedPayment }) => {
  const upcoming = isUpcoming(booking) && booking.status !== 'Cancelled';
  const canCancel = upcoming;

  return (
    <div className="bg-white rounded-[18px] shadow-sm border border-gray-100 overflow-hidden">
      {/* Movie Poster */}
      {booking.moviePoster ? (
        <div className="w-full h-[160px] bg-gray-100 overflow-hidden">
          <img
            src={booking.moviePoster}
            alt={booking.movieName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-200', 'to-slate-300');
            }}
          />
        </div>
      ) : (
        <div className="w-full h-[160px] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <Ticket size={40} className="text-slate-400" strokeWidth={1.5} />
        </div>
      )}

      {/* Card Body */}
      <div className="p-4">
        {/* Movie Title */}
        <h2 className="text-[17px] font-extrabold text-[#111827] mb-3 leading-tight">
          {booking.movieName}
        </h2>

        {/* Venue & Screen Row */}
        <div className="flex items-start justify-between mb-1">
          <span className="text-[13px] font-semibold text-slate-500">{booking.theatreName}</span>
          <span className="text-[13px] font-semibold text-slate-500">
            {booking.screenName} – {booking.movieFormat}
          </span>
        </div>

        {/* Date & Time Row */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-[13px] font-semibold text-[#5D4CE8]">{booking.showDate}</span>
          <span className="text-[13px] font-semibold text-[#5D4CE8]">{booking.showTime}</span>
        </div>

        {/* Seats + Amount Row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[13px] font-semibold text-[#111827] mb-2">Seats:</p>
            <div className="flex flex-wrap gap-[6px]">
              {(booking.selectedSeats || []).map((seat, i) => (
                <span
                  key={`${seat}-${i}`}
                  className="px-2.5 py-1 bg-[#4A5568] text-white text-[11px] font-bold rounded-[7px]"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-[13px] font-semibold text-[#111827]">Amount Paid:</p>
            <p className="text-[15px] font-extrabold text-[#111827]">
              ₹{booking.amountPaid}
            </p>
          </div>
        </div>

        {/* Cancel + QR Row */}
        <div className="flex items-end justify-between gap-3">
          {/* Left: Action Buttons + Transaction Date */}
          <div className="flex flex-col gap-2 min-w-0">
            {showPaymentAction && upcoming && (
              <button
                onClick={() => onProceedPayment(booking)}
                className="px-4 py-2 bg-[#5D4CE8] text-white text-[13px] font-bold rounded-[10px] hover:bg-[#4B3DBE] active:scale-95 transition-all self-start"
              >
                Proceed with Payment
              </button>
            )}

            {canCancel ? (
              <button
                onClick={() => onCancel(booking._id)}
                disabled={cancelling === booking._id}
                className="px-4 py-2 border border-[#E53E3E] text-[#E53E3E] text-[13px] font-bold rounded-[10px] hover:bg-red-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed self-start"
              >
                {cancelling === booking._id ? 'Cancelling…' : 'Cancel Booking'}
              </button>
            ) : (
              <span
                className={`px-3 py-1 text-[12px] font-bold rounded-full self-start ${
                  booking.status === 'Cancelled'
                    ? 'bg-red-50 text-[#E53E3E]'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {booking.status === 'Cancelled' ? 'Cancelled' : 'Show Completed'}
              </span>
            )}

            <div>
              <p className="text-[11px] font-semibold text-gray-400">Transaction Date:</p>
              <p className="text-[11px] font-semibold text-gray-500">
                {formatTxDate(booking.transactionDate || booking.createdAt)}
              </p>
            </div>
          </div>

          {/* Right: QR Code */}
          {booking.qrCodeUrl ? (
            <img
              src={booking.qrCodeUrl}
              alt="QR Code"
              className="w-[90px] h-[90px] rounded-[8px] flex-shrink-0 border border-gray-100"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-[90px] h-[90px] rounded-[8px] bg-gray-100 flex-shrink-0 flex items-center justify-center">
              <span className="text-[10px] text-gray-400 font-medium text-center px-1">No QR</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const MyBookingsPage = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [cancelling, setCancelling] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setError('Unable to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleProceedPayment = (booking) => {
    const bookingState = {
      movie: {
        title: booking.movieName,
        banner: booking.moviePoster,
      },
      theatre: {
        name: booking.theatreName,
      },
      selectedSlot: {
        screen: booking.screenName || 1,
        time: booking.showTime,
      },
      selectedFormat: booking.movieFormat,
      selectedSeats: booking.selectedSeats || [],
      totalPrice: Number(booking.amountPaid || 0),
      showDate: booking.showDate,
      booking,
    };

    navigate('/BookingSummaryPage', { state: bookingState });
  };

  const handleCancel = async (bookingId) => {
    setCancelling(bookingId);
    try {
      await cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'Cancelled' } : b))
      );
      toast.success('Booking cancelled successfully.', {
        style: {
          background: '#1F2937',
          color: '#fff',
          borderRadius: '14px',
          fontWeight: '600',
          fontSize: '14px',
        },
      });
    } catch (err) {
      console.error('Cancel booking failed:', err);
      toast.error('Unable to cancel booking. Please try again.', {
        style: {
          background: '#1F2937',
          color: '#fff',
          borderRadius: '14px',
          fontWeight: '600',
          fontSize: '14px',
        },
      });
    } finally {
      setCancelling(null);
    }
  };

  // Split into current (upcoming & confirmed) vs past (cancelled / show passed)
  const currentBookings = bookings.filter(
    (b) => b.status === 'Confirmed' && isUpcoming(b)
  );
  const pastBookings = bookings.filter(
    (b) => b.status === 'Cancelled' || !isUpcoming(b)
  );

  const displayedBookings = activeTab === 'current' ? currentBookings : pastBookings;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-4">
      {/* ── 390 × 844 Mobile Mockup Frame ── */}
      <div className="relative w-[390px] h-[844px] bg-[#F7F8FD] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-slate-200 select-none">

        {/* ── Scrollable Body ── */}
        <div className="flex-grow overflow-y-auto no-scrollbar pb-[88px]">

          {/* ── Header ── */}
          <div className="flex items-center px-5 pt-10 pb-0 bg-[#F7F8FD]">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#111827] font-semibold text-[15px] hover:opacity-70 active:scale-95 transition-all"
              aria-label="Back"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
              <span>Back</span>
            </button>
          </div>

          {/* ── Tab Navigation ── */}
          <div className="flex items-center px-5 mt-4 border-b border-gray-200 gap-0">
            <button
              onClick={() => setActiveTab('current')}
              className={`pb-2 mr-6 text-[14px] font-bold transition-colors relative ${
                activeTab === 'current'
                  ? 'text-[#5D4CE8]'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
              aria-label="My Bookings tab"
            >
              My Bookings
              {activeTab === 'current' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5D4CE8] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-2 text-[14px] font-bold transition-colors relative ${
                activeTab === 'past'
                  ? 'text-[#5D4CE8]'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
              aria-label="Past Bookings tab"
            >
              Past Bookings
              {activeTab === 'past' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5D4CE8] rounded-t-full" />
              )}
            </button>
          </div>

          {/* ── Content Area ── */}
          <div className="px-4 pt-4 pb-4 flex flex-col gap-4">
            {loading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-12 px-4 gap-3">
                <div className="w-[60px] h-[60px] rounded-full bg-red-50 flex items-center justify-center">
                  <AlertCircle size={28} className="text-red-400" />
                </div>
                <p className="text-[14px] font-semibold text-gray-500 text-center">{error}</p>
                <button
                  onClick={fetchBookings}
                  className="mt-1 px-5 py-2 bg-[#5D4CE8] text-white text-[13px] font-bold rounded-xl hover:bg-[#4B3DBE] active:scale-95 transition-all"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && displayedBookings.length === 0 && (
              <EmptyState tab={activeTab} />
            )}

            {!loading && !error && displayedBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
                cancelling={cancelling}
                showPaymentAction={activeTab === 'current'}
                onProceedPayment={handleProceedPayment}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom Navigation ── */}
        <nav className="absolute bottom-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50 px-6">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center justify-center w-12 h-12 text-gray-300 hover:text-gray-400 active:scale-90 transition-transform"
            aria-label="Home"
          >
            <Home size={24} strokeWidth={2.5} />
          </button>
          <button
            className="flex flex-col items-center justify-center w-12 h-12 text-[#5D4CE8] active:scale-90 transition-transform"
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

export default MyBookingsPage;
