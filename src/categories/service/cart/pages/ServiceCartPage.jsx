import React from 'react';

export const ServiceCartPage = ({
  selectedService,
  onProceedToBooking,
  onBack,
}) => {
  return (
    <div className="space-y-5 px-4 pb-20 animate-in fade-in duration-300">
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
            Review Basket
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            Selected Service Cart
          </h2>
        </div>
      </div>

      {selectedService ? (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">{selectedService.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">⏱ Duration: {selectedService.duration}</p>
              <span className="text-sm font-black text-slate-900 mt-1 block">₹{selectedService.price}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Included in package:</h4>
            <ul className="space-y-1 text-slate-600">
              {selectedService.included?.map((inc, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> {inc}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onProceedToBooking(selectedService)}
            className="w-full py-3 rounded-2xl bg-[#606C38] hover:bg-[#4A5626] text-white text-xs font-black shadow-lg shadow-[#606C38]/20 transition-all cursor-pointer"
          >
            Schedule Slot & Checkout (₹{selectedService.price}) →
          </button>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <span className="text-3xl block mb-2">🛒</span>
          <p className="text-sm font-bold text-slate-800">Your service cart is empty</p>
          <button
            onClick={onBack}
            className="mt-3 px-4 py-2 bg-[#606C38] text-white text-xs font-bold rounded-xl"
          >
            Browse Services
          </button>
        </div>
      )}
    </div>
  );
};
