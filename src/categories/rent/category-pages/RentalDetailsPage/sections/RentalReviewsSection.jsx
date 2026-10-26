import React from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';

export const RentalReviewsSection = ({ item, onOpenReviewModal }) => {
  if (!item) return null;

  const defaultReviews = [
    {
      id: 'rev-1',
      userName: 'Amitav Mohapatra',
      rating: 5,
      date: '3 days ago',
      text: 'Super smooth handover! Everything was in mint working condition and clean. Zero hassle with deposit refund.'
    },
    {
      id: 'rev-2',
      userName: 'Sneha Rao',
      rating: 5,
      date: '1 week ago',
      text: 'Verified host was punctual and cooperative. Booking through cityOS gave complete peace of mind.'
    }
  ];

  const allReviews = item.userReviews ? [...item.userReviews, ...defaultReviews] : defaultReviews;

  return (
    <section className="px-4 py-2 space-y-3" aria-label="Customer Reviews">
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900">Renter Reviews ({item.reviewsCount})</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base font-black text-slate-900">{item.rating}</span>
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenReviewModal && onOpenReviewModal(item)}
            className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-[#FF5200] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" /> Rate Item
          </button>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          {allReviews.map((rev) => (
            <div key={rev.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">{rev.userName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${
                      s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{rev.text || rev.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
