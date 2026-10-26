import React from 'react';

export const NearbyProviderCard = ({ provider, onSelect, onBookDirect }) => {
  return (
    <div className="flex items-center justify-between p-3.5 bg-white/90 border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all">
      <div 
        onClick={() => onSelect && onSelect(provider)}
        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
      >
        <div className="relative shrink-0">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          {provider.verified && (
            <span 
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] ring-2 ring-white"
              title="Verified Pro"
            >
              ✓
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-[13px] font-bold text-slate-900 truncate">
              {provider.name}
            </h4>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md shrink-0">
              {provider.experience}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
            {provider.skills.slice(0, 2).join(' • ')}
          </p>

          <div className="flex items-center gap-2 mt-1 text-[11px]">
            <span className="font-bold text-amber-600 flex items-center gap-0.5">
              ★ {provider.rating}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium">{provider.completedJobs}+ jobs</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{provider.distance}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
        <span className="text-[10px] font-semibold text-slate-500">
          Avg {provider.pricePerHour}/hr
        </span>
        <button
          type="button"
          onClick={() => onBookDirect ? onBookDirect(provider) : onSelect && onSelect(provider)}
          className="px-3.5 py-1.5 rounded-xl bg-[#606C38] hover:bg-[#4A5626] text-white text-[11px] font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          View Pro
        </button>
      </div>
    </div>
  );
};
