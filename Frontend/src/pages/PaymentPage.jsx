import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Ticket, Heart, User } from 'lucide-react';
import toast from 'react-hot-toast';

const BOOKING_FEE = 20;

// ─── Shared input style ───────────────────────────────────────────────────────
const inputBase =
  'w-full px-4 py-3.5 border border-gray-200 rounded-xl text-[13px] text-[#111827] ' +
  'placeholder-gray-300 font-medium bg-white ' +
  'focus:outline-none focus:border-[#5D4CE8] focus:ring-1 focus:ring-[#5D4CE8] transition-colors';

// ─── Radio Button ─────────────────────────────────────────────────────────────
const RadioOption = ({ label, value, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className="flex items-center gap-2.5 group"
  >
    <div
      className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        selected ? 'border-[#5D4CE8]' : 'border-gray-300'
      }`}
    >
      {selected && <div className="w-[10px] h-[10px] rounded-full bg-[#5D4CE8]" />}
    </div>
    <span
      className={`text-[14px] font-semibold transition-colors ${
        selected ? 'text-[#111827]' : 'text-slate-400'
      }`}
    >
      {label}
    </span>
  </button>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ── Booking state (passed from BookingSummaryPage) ──
  const seats         = location.state?.selectedSeats  || ['J9', 'J10'];
  const ticketPrice   = location.state?.totalPrice     ?? 560;
  const movieTitle    = location.state?.movie?.title   || 'Dhurandhar: The Revenge';
  const total         = ticketPrice + BOOKING_FEE;

  // ── Form state ──
  const [selectedMethod,   setSelectedMethod]   = useState('card');
  const [cardHolderName,   setCardHolderName]   = useState('');
  const [cardNumber,       setCardNumber]       = useState('');
  const [expiryDate,       setExpiryDate]       = useState('');
  const [cvv,              setCvv]              = useState('');
  const [saveDetails,      setSaveDetails]      = useState(false);
  const [errors,           setErrors]           = useState({});

  // ── Input handlers ──
  const handleCardNumber = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(raw.match(/.{1,4}/g)?.join(' ') || raw);
    setErrors((p) => ({ ...p, cardNumber: '' }));
  };

  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiryDate(raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw);
    setErrors((p) => ({ ...p, expiryDate: '' }));
  };

  const handleCvv = (e) => {
    setCvv(e.target.value.replace(/\D/g, '').slice(0, 4));
    setErrors((p) => ({ ...p, cvv: '' }));
  };

  // ── Validation ──
  const validate = () => {
    const errs = {};
    if (!cardHolderName.trim())                          errs.cardHolderName = 'Name is required';
    const raw = cardNumber.replace(/\s/g, '');
    if (!raw)                                            errs.cardNumber = 'Card number is required';
    else if (raw.length !== 16)                         errs.cardNumber = 'Must be 16 digits';
    if (!expiryDate)                                    errs.expiryDate = 'Expiry date is required';
    else if (!/^\d{2}\/\d{2}$/.test(expiryDate))       errs.expiryDate = 'Use MM/YY format';
    if (!cvv)                                           errs.cvv = 'CVC is required';
    else if (cvv.length < 3)                            errs.cvv = 'Enter 3 or 4 digits';
    return errs;
  };

  // ── Payment handler ──
  const handleCompletePayment = () => {
    if (selectedMethod === 'card') {
      const errs = validate();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    }
    setErrors({});
    toast.success(
      `Payment of ₹${total} successful! 🎉\n🎬 ${movieTitle}\n🎟️ Seats: ${seats.join(', ')}`,
      {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#1F2937',
          color: '#FFFFFF',
          borderRadius: '16px',
          fontSize: '14px',
          fontWeight: '600',
          padding: '16px 20px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)',
          whiteSpace: 'pre-line',
        },
        iconTheme: { primary: '#5D4CE8', secondary: '#FFFFFF' },
      }
    );
    setTimeout(() => navigate('/home'), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-4">
      {/* ── 390 × 844 Mobile Mockup Frame ── */}
      <div className="relative w-[390px] h-[844px] bg-[#F7F8FD] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-slate-200 select-none">

        {/* ── Scrollable Body ── */}
        <div className="flex-grow overflow-y-auto no-scrollbar pb-[88px]">

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 pt-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#111827] font-semibold text-[15px] hover:opacity-70 active:scale-95 transition-all"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
              <span>Back</span>
            </button>
            <button
              onClick={() => navigate('/home')}
              className="text-gray-400 font-semibold text-[15px] hover:opacity-70 active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>

          {/* ── Progress Bar — 100% complete ── */}
          <div className="px-5 mt-4">
            <div className="w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-[#5D4CE8] rounded-full" />
            </div>
          </div>

          {/* ── Page Title ── */}
          <div className="px-5 mt-5 mb-5">
            <h1 className="text-[22px] font-extrabold text-[#111827] leading-tight">
              Checkout
            </h1>
          </div>

          {/* ── Summary Section ── */}
          <div className="px-5 mb-5">
            <h2 className="text-[16px] font-extrabold text-[#111827] mb-3">Summary</h2>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between text-[14px] font-semibold text-slate-500">
                <span>{seats.length}x Tickets</span>
                <span className="text-[#111827]">₹{ticketPrice}</span>
              </div>
              <div className="flex justify-between text-[14px] font-semibold text-slate-500">
                <span>Booking Fee</span>
                <span className="text-[#111827]">₹{BOOKING_FEE}</span>
              </div>
              <div className="border-t border-gray-200/80 my-0.5" />
              <div className="flex justify-between text-[15px] font-extrabold text-[#111827]">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* ── Payment Method ── */}
          <div className="px-5 mb-5">
            <h2 className="text-[16px] font-extrabold text-[#111827] mb-3">
              Choose payment method
            </h2>
            <div className="flex items-center gap-6">
              <RadioOption
                label="Credit/Debit Card"
                value="card"
                selected={selectedMethod === 'card'}
                onSelect={setSelectedMethod}
              />
              <RadioOption
                label="Mobile Wallet"
                value="wallet"
                selected={selectedMethod === 'wallet'}
                onSelect={setSelectedMethod}
              />
            </div>
          </div>

          {/* ── Card Details Form (shown only when card is selected) ── */}
          {selectedMethod === 'card' && (
            <div className="px-5">
              {/* Name on card */}
              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-[#111827] mb-2">
                  Name on card
                </label>
                <input
                  type="text"
                  placeholder="Name on card"
                  value={cardHolderName}
                  onChange={(e) => {
                    setCardHolderName(e.target.value);
                    setErrors((p) => ({ ...p, cardHolderName: '' }));
                  }}
                  className={`${inputBase} ${errors.cardHolderName ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                />
                {errors.cardHolderName && (
                  <p className="text-red-400 text-[11px] font-semibold mt-1 ml-1">
                    {errors.cardHolderName}
                  </p>
                )}
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-[#111827] mb-2">
                  Card number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumber}
                  className={`${inputBase} tracking-widest ${errors.cardNumber ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-[11px] font-semibold mt-1 ml-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry + CVC — side by side */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#111827] mb-2">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiry}
                    className={`${inputBase} ${errors.expiryDate ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-400 text-[11px] font-semibold mt-1 ml-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#111827] mb-2">
                    CVC/CVV
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="CVC"
                    value={cvv}
                    onChange={handleCvv}
                    className={`${inputBase} ${errors.cvv ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-[11px] font-semibold mt-1 ml-1">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Save Payment Checkbox ── */}
          <div className="px-5 mb-5">
            <button
              type="button"
              onClick={() => setSaveDetails((v) => !v)}
              className="flex items-center gap-3 group active:scale-[0.98] transition-transform"
            >
              <div
                className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  saveDetails ? 'bg-[#5D4CE8] border-[#5D4CE8]' : 'bg-white border-gray-300'
                }`}
              >
                {saveDetails && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-semibold text-slate-500 text-left leading-snug">
                Save payment details for the next purchase
              </span>
            </button>
          </div>

          {/* ── Complete Payment Button ── */}
          <div className="px-5 mb-4">
            <button
              onClick={handleCompletePayment}
              className="w-full bg-[#5D4CE8] text-white py-4 rounded-2xl font-extrabold text-[15px] hover:bg-[#4B3DBE] active:scale-[0.98] transition-all shadow-md shadow-[#5D4CE8]/20"
            >
              Complete Payment
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

export default PaymentPage;
