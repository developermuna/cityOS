import React from 'react';

export const ServiceAccountPage = ({ onBack, onOpenHistory }) => {
  return (
    <div className="space-y-5 px-4 pb-16 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            User Hub
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            Service Profile & Support
          </h2>
        </div>
      </div>

      {/* Account Wallet Card */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            CityOS Rewards
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">🪙</span>
            <span className="text-xl font-black">150 Coins</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">Worth ₹50 on any upcoming booking</p>
        </div>
        <button
          onClick={onOpenHistory}
          className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20"
        >
          Bookings
        </button>
      </div>

      {/* Warranty & Guarantee */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡️</span>
          <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
            CityOS 30-Day Service Guarantee
          </h4>
        </div>
        <p className="text-xs text-emerald-900 font-medium">
          If any issue reoccurs within 30 days of service completion, a verified technician will revisit and resolve it for free.
        </p>
      </div>

      {/* 24x7 Support */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2.5 shadow-xs">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
          Rayagada Service Control Center
        </h4>
        <div className="flex items-center justify-between text-xs py-1">
          <span className="text-slate-600">Helpline:</span>
          <a href="tel:1800-CITY-OS" className="font-bold text-[#606C38]">1800-CITY-OS (Toll Free)</a>
        </div>
        <div className="flex justify-between text-xs py-1 border-t border-slate-100">
          <span className="text-slate-600">WhatsApp Support:</span>
          <span className="font-bold text-emerald-700">+91 94370 12345</span>
        </div>
        <div className="flex justify-between text-xs py-1 border-t border-slate-100">
          <span className="text-slate-600">Operating Hours:</span>
          <span className="font-semibold text-slate-800">24 Hours / 7 Days</span>
        </div>
      </div>
    </div>
  );
};
