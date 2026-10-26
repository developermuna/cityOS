import React, { useState } from 'react';
import { X, Star, Upload, CheckCircle2 } from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';

export const RentalReviewModal = ({ item, onClose, showToast }) => {
  const [rating, setRating] = useState(5);
  const [conditionRating, setConditionRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [accuracyRating, setAccuracyRating] = useState(5);
  const [providerRating, setProviderRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      if (showToast) showToast('Please write a brief review');
      return;
    }

    rentalMarketplaceService.submitReview(item.id, {
      rating,
      conditionRating,
      cleanlinessRating,
      accuracyRating,
      providerRating,
      reviewText
    });

    setSubmitted(true);
    if (showToast) showToast('Review submitted successfully! Thank you.');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const StarSelector = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-b-0">
      <span className="text-xs text-slate-700 font-medium">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 focus:outline-none"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Rate & Review Rental</h3>
            <p className="text-xs text-slate-500 truncate max-w-[280px]">{item.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-2" />
            <h4 className="text-base font-bold text-slate-900">Thank you for reviewing!</h4>
            <p className="text-xs text-slate-500 mt-1">Your feedback helps fellow renters on cityOS.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Overall Rating */}
            <div className="text-center py-2 bg-orange-50 rounded-2xl border border-orange-100">
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider block mb-1">
                Overall Experience
              </span>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Parameters */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1">
              <StarSelector label="Item Condition" value={conditionRating} onChange={setConditionRating} />
              <StarSelector label="Cleanliness" value={cleanlinessRating} onChange={setCleanlinessRating} />
              <StarSelector label="Listing Accuracy" value={accuracyRating} onChange={setAccuracyRating} />
              <StarSelector label="Owner / Provider Behavior" value={providerRating} onChange={setProviderRating} />
            </div>

            {/* Written Review */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                placeholder="Share your experience regarding usability, pickup, handover, and condition..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5200] resize-none"
              />
            </div>

            {/* Photo upload mock */}
            <div className="flex items-center gap-2 p-3 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500 cursor-pointer hover:bg-slate-50">
              <Upload className="w-4 h-4 text-[#FF5200]" />
              <span>Attach Photos (Optional)</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5200] hover:bg-[#E64A00] text-white text-sm font-bold py-3 rounded-2xl shadow-sm transition-all active:scale-95"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
