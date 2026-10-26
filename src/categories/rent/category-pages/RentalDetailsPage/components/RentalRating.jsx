import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const RentalRating = ({ rating = 4.8, reviewsCount = 0, isVerified = false }) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg font-bold">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>{rating}</span>
        <span className="text-amber-700/80 font-normal">({reviewsCount} reviews)</span>
      </div>

      {isVerified && (
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Physically Verified
        </span>
      )}
    </div>
  );
};
