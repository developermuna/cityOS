import React from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, UserCheck, ShieldCheck, ArrowRight, Truck, Package } from 'lucide-react';
import { RentalDateRangePicker } from '../../home/components/RentalDateRangePicker';

export const RentalBookingPage = ({
  item,
  rentalDates,
  onDatesChange,
  deliveryType,
  setDeliveryType,
  deliveryAddress,
  setDeliveryAddress,
  hasDriver,
  setHasDriver,
  hasOperator,
  setHasOperator,
  bookingNotes,
  setBookingNotes,
  onBack,
  onProceedToCheckout
}) => {
  if (!item) return null;

  return (
    <div className="w-full pb-24 font-sans bg-[#fff8f5] min-h-screen">
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
        <div className="text-center">
          <h2 className="text-sm font-black text-slate-900 leading-tight">Book Rental</h2>
          <span className="text-[10px] text-slate-500 font-medium">Step 1 of 2: Dates & Pickup</span>
        </div>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-4">
        {/* Item Summary Card */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center gap-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider block">
              {item.subcategory}
            </span>
            <h3 className="text-xs font-bold text-slate-900 truncate">
              {item.title}
            </h3>
            <p className="text-xs font-black text-slate-900 mt-0.5">
              ₹{item.price.toLocaleString('en-IN')}/{item.priceUnit}
            </p>
          </div>
        </div>

        {/* 1. Dates & Duration */}
        <RentalDateRangePicker
          rentalDates={rentalDates}
          onChange={onDatesChange}
        />

        {/* 2. Pickup vs Delivery Mode */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900">Handover Method</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDeliveryType('pickup')}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                deliveryType === 'pickup'
                  ? 'border-[#FF5200] bg-orange-50/50 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Package className="w-5 h-5 text-orange-600 mb-2" />
              <span className="font-bold text-slate-900 block text-xs">Self Pickup</span>
              <span className="text-[10px] text-slate-500 font-medium">From Owner Hub (Free)</span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType('delivery')}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                deliveryType === 'delivery'
                  ? 'border-[#FF5200] bg-orange-50/50 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-5 h-5 text-blue-600 mb-2" />
              <span className="font-bold text-slate-900 block text-xs">Doorstep Dispatch</span>
              <span className="text-[10px] text-slate-500 font-medium">
                {item.deliveryFee > 0 ? `+₹${item.deliveryFee}` : 'Free Delivery'}
              </span>
            </button>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              {deliveryType === 'pickup' ? 'Selected Pickup Hub' : 'Delivery Address'}
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <MapPin className="w-4 h-4 text-[#FF5200] shrink-0" />
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter address or landmark"
                className="bg-transparent w-full font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Specialized Optional Addons */}
        {item.categoryId === 'vehicles' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Professional Driver Option
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Add verified chauffeur (+₹600/day)</p>
            </div>
            <button
              type="button"
              onClick={() => setHasDriver(!hasDriver)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                hasDriver ? 'bg-[#FF5200]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                  hasDriver ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        )}

        {item.categoryId === 'equipment' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-orange-600" /> Certified Machine Operator
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Includes trained operator (+₹500/day)</p>
            </div>
            <button
              type="button"
              onClick={() => setHasOperator(!hasOperator)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                hasOperator ? 'bg-[#FF5200]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                  hasOperator ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        )}

        {/* 4. Special Instructions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
          <label className="text-xs font-bold text-slate-900 block">
            Special Notes for Owner / Handover
          </label>
          <textarea
            value={bookingNotes}
            onChange={(e) => setBookingNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Need extra helmet, call 10 mins before arrival, check-in at 2 PM..."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5200] resize-none"
          />
        </div>

        {/* Security deposit note */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Your ₹{item.securityDeposit?.toLocaleString('en-IN') || 0} deposit is kept securely in cityOS Escrow and automatically refunded after return inspection.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Next Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shadow-xl max-w-md mx-auto">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
            Duration
          </span>
          <span className="text-sm font-bold text-slate-900">
            {rentalDates.duration} {rentalDates.unit || item.priceUnit}{rentalDates.duration > 1 ? 's' : ''}
          </span>
        </div>

        <button
          type="button"
          onClick={onProceedToCheckout}
          className="bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span>Review & Pay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
