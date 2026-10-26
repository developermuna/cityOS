import React, { useState } from 'react';

const RAYAGADA_AREAS = [
  'Gautam Nagar, Near Collectorate, Rayagada',
  'JKPur Colony, Rayagada',
  'Raniguda Farm, Main Road, Rayagada',
  'Ashok Nagar, Near Railway Station, Rayagada',
  'Bari Jhola Industrial Area, Rayagada',
  'Kasturi Nagar, Rayagada'
];

export const ServiceSearchHeader = ({
  searchQuery,
  onSearchChange,
  selectedAddress,
  onAddressSelect,
  isEmergency,
  onEmergencyToggle,
  onOpenHistory
}) => {
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  return (
    <div className="space-y-3 px-4 pt-1">
      {/* Top Address & Quick History/Tracking Row */}
      <div className="flex items-center justify-between gap-2">
        <div 
          onClick={() => setShowAddressPicker(!showAddressPicker)}
          className="flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 transition-colors flex-1 min-w-0"
        >
          <span className="text-sm">📍</span>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-tight">
              Service Location
            </span>
            <span className="text-[12px] font-bold text-slate-800 truncate block">
              {selectedAddress}
            </span>
          </div>
          <span className="text-xs text-slate-400">▼</span>
        </div>

        <button
          type="button"
          onClick={onOpenHistory}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
          title="Booking History"
        >
          <span>📋</span>
          <span className="hidden sm:inline">My</span> Bookings
        </button>
      </div>

      {/* Address Selection Dropdown Modal/Card */}
      {showAddressPicker && (
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Choose Service Address</span>
            <button
              onClick={() => setShowAddressPicker(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1">
            {RAYAGADA_AREAS.map((loc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onAddressSelect(loc);
                  setShowAddressPicker(false);
                }}
                className={`w-full text-left text-xs p-2 rounded-xl transition-colors flex items-center gap-2 ${
                  selectedAddress === loc 
                    ? 'bg-[#606C38]/15 text-[#606C38] font-bold' 
                    : 'hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <span>📍</span>
                <span className="truncate">{loc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search electrician, plumber, AC repair, cleaner..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/95 border border-slate-200/90 text-xs font-semibold placeholder:text-slate-400 text-slate-800 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#606C38] focus:border-[#606C38] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
