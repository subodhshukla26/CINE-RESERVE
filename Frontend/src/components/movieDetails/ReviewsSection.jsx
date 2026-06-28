import React from 'react';
import { Star } from 'lucide-react';

/**
 * ReviewsSection — User review cards + rating summary.
 * Props:
 *  reviews       – array of review objects
 *  ratingSummary – { imdb, userRating, totalReviews }
 */

// ── Star Rating Display ────────────────────────────────────────────────
const StarRating = ({ rating, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        size={11}
        strokeWidth={1.5}
        fill={i < Math.round(rating) ? '#F59E0B' : 'none'}
        className={i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}
      />
    ))}
  </div>
);

// ── Single Review Card ─────────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div
    className="bg-white rounded-2xl p-4 border border-gray-100 flex-shrink-0"
    style={{
      width: '280px',
      boxShadow: '0 2px 16px rgba(93,76,232,0.06)',
    }}
  >
    {/* Reviewer Header */}
    <div className="flex items-center gap-3 mb-3">
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[14px] text-white flex-shrink-0"
        style={{ background: review.avatarColor || 'linear-gradient(135deg, #5D4CE8, #8B5CF6)' }}
      >
        {review.username.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-extrabold text-[#111827] truncate">{review.username}</p>
        <p className="text-[10px] font-medium text-gray-400">{review.date}</p>
      </div>

      {/* Rating Badge */}
      <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2 py-0.5">
        <Star size={10} fill="#F59E0B" className="text-amber-400" />
        <span className="text-amber-600 text-[11px] font-extrabold">{review.rating}</span>
      </div>
    </div>

    {/* Stars Visual */}
    <StarRating rating={review.rating} />

    {/* Review Text */}
    <p className="text-[12.5px] font-medium text-gray-500 leading-relaxed mt-2 line-clamp-3">
      {review.review}
    </p>
  </div>
);

// ── Rating Summary Bar ─────────────────────────────────────────────────
const RatingBar = ({ label, value, max, color }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] font-bold text-gray-400 w-6">{label}</span>
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
    <span className="text-[10px] font-bold text-gray-500 w-6 text-right">{value}</span>
  </div>
);

const ReviewsSection = ({ reviews, ratingSummary }) => {
  return (
    <div className="pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
          <h2 className="text-[17px] font-extrabold text-[#111827]">Reviews</h2>
        </div>
        <button className="text-[12px] font-bold text-[#5D4CE8] hover:opacity-70 active:scale-95 transition-all">
          Write a Review
        </button>
      </div>

      {/* Rating Summary Card */}
      <div className="px-5 mb-5">
        <div
          className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-5"
          style={{ boxShadow: '0 2px 16px rgba(93,76,232,0.06)' }}
        >
          {/* Big IMDb Score */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 bg-amber-50 rounded-2xl px-4 py-3 border border-amber-100">
            <Star size={18} fill="#F59E0B" className="text-amber-400 mb-1" />
            <p className="text-[24px] font-extrabold text-[#111827] leading-none">{ratingSummary.imdb}</p>
            <p className="text-[10px] font-bold text-amber-500 mt-0.5">IMDb</p>
          </div>

          {/* User Rating + Reviews count */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">User Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-[20px] font-extrabold text-[#111827] leading-none">{ratingSummary.userRating}</p>
                <StarRating rating={Math.round(ratingSummary.userRating)} />
              </div>
            </div>
            <div className="border-t border-gray-50 pt-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Total Reviews</p>
              <p className="text-[14px] font-extrabold text-[#5D4CE8]">{ratingSummary.totalReviews.toLocaleString()} reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Reviews */}
      <div className="flex gap-4 px-5 overflow-x-auto no-scrollbar pb-1">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
