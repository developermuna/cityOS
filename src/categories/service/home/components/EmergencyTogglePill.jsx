import React from 'react';

export const EmergencyTogglePill = ({ isEmergency, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border border-rose-200 shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
          isEmergency ? 'bg-rose-600 text-white animate-pulse' : 'bg-rose-100 text-rose-700'
        }`}>
          🚨
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-black text-rose-950 uppercase tracking-wide">
              Emergency Dispatch
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-200 text-rose-900">
              15-30 Mins
            </span>
          </div>
          <p className="text-[11px] text-rose-800 font-medium">
            Priority electrician, plumber & mechanics for urgent breakdown
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onToggle(!isEmergency)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
          isEmergency ? 'bg-rose-600' : 'bg-slate-300'
        }`}
        role="switch"
        aria-checked={isEmergency}
        aria-label="Toggle emergency dispatch"
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isEmergency ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
