import React from 'react';
import { RentalRating } from '../components/RentalRating';
import { RentalRuleItem } from '../components/RentalRuleItem';

export const RentalInformationSection = ({ item }) => {
  if (!item) return null;

  const specs = item.specs || {};

  return (
    <section className="px-4 py-2 space-y-4" aria-label="Rental Information">
      {/* Title & Category Badge */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
            {item.subcategory || item.categoryId}
          </span>
          <RentalRating
            rating={item.rating}
            reviewsCount={item.reviewsCount}
            isVerified={item.isVerified}
          />
        </div>

        <h1 className="text-lg font-black text-slate-900 leading-snug">
          {item.title}
        </h1>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 mb-1.5">Overview</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Specifications Grid */}
      {Object.keys(specs).length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 mb-3">Specifications & Key Features</h3>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {Object.entries(specs).map(([key, val]) => (
              <div key={key} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 capitalize block mb-0.5 font-medium">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-bold text-slate-800 break-words leading-tight">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's Included */}
      {item.included && item.included.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 mb-2">Included in this Rental</h3>
          <div className="space-y-1">
            {item.included.map((inc, i) => (
              <RentalRuleItem key={i} rule={inc} type="included" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
