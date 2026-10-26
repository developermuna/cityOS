import React from 'react';

export const EmergencyBannerSection = ({ onSelectCategory, categories, onToggleEmergency, isEmergency }) => {
  const emergencyCats = categories.filter((c) =>
    ['electrician', 'plumber', 'mechanic', 'ac-repair'].includes(c.id)
  );

  return (
    <section className="px-4" aria-label="Emergency and Urgent Services">
      <div className="p-4 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg relative overflow-hidden">
        {/* Glow & Pattern */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider mb-2 border border-white/25">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              15-30 Min Rapid Dispatch
            </div>
            <h3 className="text-xl font-black tracking-tight leading-tight">
              Emergency Home Services
            </h3>
            <p className="text-xs text-white/90 font-medium mt-1 max-w-md">
              Short circuits, burst water pipes, vehicle breakdowns or urgent lockouts. Verified pros dispatched on priority.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1 md:pt-0">
            <button
              type="button"
              onClick={() => onToggleEmergency(!isEmergency)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                isEmergency 
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-white' 
                  : 'bg-white text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span>🚨</span>
              <span>{isEmergency ? 'Emergency Mode ACTIVE' : 'Activate 15-Min Dispatch'}</span>
            </button>
          </div>
        </div>

        {/* Quick Emergency Category Pills */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5 pt-3 border-t border-white/20">
          {emergencyCats.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onToggleEmergency(true);
                onSelectCategory(cat);
              }}
              className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xs text-left transition-all border border-white/10 active:scale-95 cursor-pointer"
            >
              <span className="text-xl">{cat.icon}</span>
              <div className="min-w-0">
                <span className="text-[11px] font-bold block truncate leading-tight">
                  {cat.name}
                </span>
                <span className="text-[9px] text-amber-200 font-semibold block">
                  Urgent Fix Available
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
