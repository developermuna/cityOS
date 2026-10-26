import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

export const RentalSearchHeroSection = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedLocation,
  rentalDates,
  onDatesChange,
  onSelectCategory
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <section className="px-4 pt-2 pb-2" aria-label="Rental Search">
      {/* Banner */}
      <div className="w-full rounded-[26px] bg-gradient-to-br from-[#FF5200] via-[#F74C00] to-[#D94100] text-white p-5 shadow-md relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-8xl opacity-15 rotate-12 pointer-events-none select-none">
          🔑
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-black/25 px-2.5 py-0.5 rounded-full border border-white/20">
              CityOS Verified Rentals
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
              0% Brokerage
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-xs">
            Rent Homes, Vehicles, Gear & Assets
          </h1>
          <p className="text-xs text-white/90 mt-1 font-medium">
            Verified owners, safe security deposits, doorstep delivery & instant booking.
          </p>

          {/* Search Inputs Box */}
          <div className="mt-4 bg-white rounded-2xl p-2.5 shadow-lg text-slate-800">
            {/* What to rent */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-slate-100">
              <Search className="w-4 h-4 text-[#FF5200] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit && onSearchSubmit()}
                placeholder="What do you want to rent? (Flat, Activa, Camera...)"
                className="w-full text-xs font-semibold placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex items-center justify-between px-2.5 py-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700 truncate">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate font-semibold">{selectedLocation || 'Rayagada Central'}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[11px] font-bold text-[#FF5200] shrink-0 hover:underline"
              >
                {showAdvanced ? 'Hide Dates' : 'Change Dates'}
              </button>
            </div>

            {/* Date and Duration collapsible */}
            {showAdvanced && (
              <div className="p-2 bg-slate-50 rounded-xl mt-2 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">From</span>
                    <input
                      type="date"
                      value={rentalDates.startDate}
                      onChange={(e) => onDatesChange && onDatesChange({ ...rentalDates, startDate: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">To</span>
                    <input
                      type="date"
                      value={rentalDates.endDate}
                      min={rentalDates.startDate}
                      onChange={(e) => onDatesChange && onDatesChange({ ...rentalDates, endDate: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Search Submit Button */}
            <button
              type="button"
              onClick={onSearchSubmit}
              className="w-full mt-2 bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
            >
              Search Rentals <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
