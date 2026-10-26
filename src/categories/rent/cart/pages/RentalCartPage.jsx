import React from 'react';
import { ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';

export const RentalCartPage = ({ onBack, onGoHome }) => {
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
        <h2 className="text-sm font-black text-slate-900 leading-tight">Rental Cart</h2>
        <div className="w-9" />
      </div>

      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-3xl bg-orange-100 text-[#FF5200] flex items-center justify-center mb-3">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Your Rental Cart is Ready</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Select any vehicle, property, or equipment listing to book with zero brokerage and verified security deposits.
        </p>
        <button
          type="button"
          onClick={onGoHome}
          className="mt-5 px-6 py-3 bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold rounded-2xl shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span>Explore Rentals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
