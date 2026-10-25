import React, { useState } from 'react';
import { X, Star, ThumbsUp, Heart } from 'lucide-react';

export const RideRatingModal = ({
  isOpen,
  onClose,
  driver,
  fare = 35,
  onSubmitRating,
  showToast,
}) => {
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['Safe Driving', 'Clean Vehicle']);
  const [comment, setComment] = useState('');
  const [tipAmount, setTipAmount] = useState('₹20');

  if (!isOpen) return null;

  const reviewTags = [
    'Safe Driving',
    'Clean Vehicle',
    'Polite Captain',
    'On Time Arrival',
    'Comfortable Ride',
    'Great Route',
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (onSubmitRating) {
      onSubmitRating({
        stars,
        tags: selectedTags,
        comment,
        tip: tipAmount,
      });
    }
    if (showToast) {
      showToast('⭐ Thank you for rating your Captain!');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base">Rate Your Trip</h3>
            <p className="text-xs text-gray-500">Trip Fare: ₹{fare}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Driver Avatar */}
        {driver && (
          <div className="flex flex-col items-center gap-1.5 py-1">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-500/20"
            />
            <h4 className="font-bold text-gray-900 text-sm">{driver.name}</h4>
            <p className="text-xs text-gray-500">{driver.vehicleName}</p>
          </div>
        )}

        {/* Star Rating Selector */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((starNum) => {
            const isFilled = (hoverStars || stars) >= starNum;
            return (
              <button
                key={starNum}
                type="button"
                onMouseEnter={() => setHoverStars(starNum)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(starNum)}
                className="p-1 focus:outline-none transition-transform hover:scale-125"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    isFilled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Feedback Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {reviewTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Tip Selector */}
        <div className="bg-gray-50 rounded-2xl p-3 flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Add Tip for Captain (Optional)
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {['None', '₹10', '₹20', '₹50'].map((tip) => {
              const isSelected = tipAmount === tip;
              return (
                <button
                  key={tip}
                  type="button"
                  onClick={() => setTipAmount(tip)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tip}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-bold text-xs bg-black hover:bg-gray-900 text-white transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};
