import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { ProgressiveImage } from './ProgressiveImage';

export const ProductReviewsSection = ({ 
  rating = '4.6', 
  ratingsCount = '18,450', 
  reviewsCount = '1,420',
  photos = [], 
  reviews = [], 
  showToast 
}) => {
  const [activeTag, setActiveTag] = useState('All');
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const tags = ['All', 'Camera (610)', 'Battery (420)', 'Display (340)', 'Value (190)'];

  const handleHelpful = (id) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    if (showToast) showToast('Marked review as helpful 👍');
  };

  return (
    <div className="bg-white px-4 py-3.5 border-t border-slate-100 select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-black text-slate-900 tracking-tight">
          Ratings and reviews
        </h3>
        <button
          type="button"
          onClick={() => showToast && showToast('Write review dialog opened')}
          className="text-[11.5px] font-bold text-[#800020] hover:underline cursor-pointer"
        >
          Rate Product
        </button>
      </div>

      {/* Rating Score Banner */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
        <div className="flex items-center gap-1 bg-emerald-700 text-white text-base font-black px-2.5 py-1 rounded-xl shadow-xs">
          <span>{rating}</span>
          <Star size={14} className="fill-white" />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-slate-900">Very Good</h4>
          <p className="text-[11px] text-slate-500 font-medium">
            Based on {ratingsCount} ratings &amp; {reviewsCount} verified reviews
          </p>
        </div>
      </div>

      {/* Customer Photo Gallery */}
      {photos.length > 0 && (
        <div className="mb-3">
          <p className="text-[11px] font-bold text-slate-700 mb-1.5">
            Photos by customers ({photos.length})
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {photos.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => showToast && showToast(`Viewing customer photo ${idx + 1}`)}
                className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
              >
                <ProgressiveImage
                  src={img}
                  alt={`Customer review ${idx + 1}`}
                  aspectRatio="aspect-square"
                  className="w-full h-full"
                  objectFit="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tag Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              activeTag === tag
                ? 'bg-[#800020] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Customer Review Cards */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  <span>{r.rating}</span>
                  <span>★</span>
                </span>
                <span className="text-[12px] font-bold text-slate-900">{r.title}</span>
              </div>
              <span className="text-[10px] text-slate-400">{r.date}</span>
            </div>

            <p className="text-[11.5px] text-slate-600 leading-relaxed mb-2">
              {r.comment}
            </p>

            <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-1.5 border-t border-slate-200/50">
              <div className="flex items-center gap-1 text-slate-700 font-bold">
                <span>{r.user}</span>
                {r.verified && (
                  <span className="text-emerald-700 flex items-center gap-0.5 text-[9.5px]">
                    <CheckCircle2 size={11} /> Verified Buyer
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleHelpful(r.id)}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <ThumbsUp size={12} />
                <span>Helpful ({r.helpful + (helpfulVotes[r.id] || 0)})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
