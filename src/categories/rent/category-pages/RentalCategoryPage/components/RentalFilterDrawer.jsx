import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { DURATION_UNITS } from '../../../constants/rental.constants';

export const RentalFilterDrawer = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  verifiedOnly,
  setVerifiedOnly,
  durationUnit,
  setDurationUnit,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#FF5200]" />
            <h3 className="text-base font-bold text-slate-900">Filters</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="py-4 space-y-5">
          {/* Price Range */}
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-2">
              Max Price: ₹{priceRange.max?.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min={200}
              max={60000}
              step={500}
              value={priceRange.max || 60000}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full accent-[#FF5200]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>₹200</span>
              <span>₹30,000</span>
              <span>₹60,000+</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((rt) => (
                <button
                  key={rt}
                  type="button"
                  onClick={() => setMinRating(rt)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    minRating === rt
                      ? 'bg-[#FF5200] border-[#FF5200] text-white'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {rt === 0 ? 'Any' : `${rt}+ ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Unit */}
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-2">
              Rental Pricing Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDurationUnit('all')}
                className={`py-1.5 rounded-xl text-xs font-bold border ${
                  durationUnit === 'all'
                    ? 'bg-[#FF5200] border-[#FF5200] text-white'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                All
              </button>
              {DURATION_UNITS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setDurationUnit(u.id)}
                  className={`py-1.5 rounded-xl text-xs font-bold border capitalize ${
                    durationUnit === u.id
                      ? 'bg-[#FF5200] border-[#FF5200] text-white'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-50 border border-orange-100">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Verified Listings Only
              </span>
              <span className="text-[10px] text-slate-500">
                Show only cityOS physically verified properties & gear
              </span>
            </div>
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                verifiedOnly ? 'bg-[#FF5200]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                  verifiedOnly ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold py-3 rounded-2xl shadow-sm transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
