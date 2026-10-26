import React from 'react';
import { ArrowLeft, User, ShieldCheck, Heart, FileText, Bell, HelpCircle } from 'lucide-react';

export const RentalAccountPage = ({ onBack, onOpenHistory, showToast }) => {
  return (
    <div className="w-full pb-20 font-sans bg-[#fff8f5] min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-black text-slate-900 leading-tight">Rental Account</h2>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-orange-100 text-[#FF5200] flex items-center justify-center text-xl font-black">
            JD
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900">John Doe</h3>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5" /> Aadhaar Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">+91 98765 12340 • john@cityos.in</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Security Deposit Balance: ₹36,000 in Escrow</p>
          </div>
        </div>

        {/* Account Menu */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-50 text-xs">
          <button
            type="button"
            onClick={onOpenHistory}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-slate-800 font-semibold"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#FF5200]" />
              <span>Rental Bookings & Invoices</span>
            </div>
            <span className="text-slate-400">→</span>
          </button>

          <button
            type="button"
            onClick={() => showToast && showToast('Your Saved Rentals are active in your Wishlist')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-slate-800 font-semibold"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Saved Rentals & Wishlist</span>
            </div>
            <span className="text-slate-400">→</span>
          </button>

          <button
            type="button"
            onClick={() => showToast && showToast('Government ID & Driving License Verified')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-slate-800 font-semibold"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>KYC & Identity Documents</span>
            </div>
            <span className="text-emerald-600 font-bold text-[10px]">VERIFIED ✓</span>
          </button>

          <button
            type="button"
            onClick={() => showToast && showToast('Connecting to 24/7 Rental Dispute Support...')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-slate-800 font-semibold"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>24/7 Rental Mediation & Help</span>
            </div>
            <span className="text-slate-400">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
