import React from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, ArrowRight, Home } from 'lucide-react';

export const RentalConfirmationPage = ({
  booking,
  onTrackRental,
  onGoHome
}) => {
  if (!booking) return null;

  return (
    <div className="w-full pb-20 font-sans bg-[#fff8f5] min-h-screen p-4 flex flex-col justify-between">
      <div className="space-y-5 pt-4">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h1 className="text-xl font-black text-slate-900">Rental Confirmed!</h1>
          <p className="text-xs text-slate-500 font-medium">
            Your booking request has been confirmed by the verified host.
          </p>
        </div>

        {/* Security OTP Card */}
        <div className="bg-white rounded-3xl p-5 border-2 border-dashed border-orange-300 shadow-sm text-center space-y-2">
          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block">
            Handover Verification Code
          </span>
          <div className="text-3xl font-black font-mono tracking-widest text-slate-900">
            {booking.otp}
          </div>
          <p className="text-[11px] text-slate-500">
            Share this 4-digit code with the owner during physical key/item handover.
          </p>
        </div>

        {/* Booking Details Summary */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="font-bold text-slate-700">Booking ID:</span>
            <span className="font-mono font-bold text-slate-900">#{booking.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={booking.image}
              alt={booking.itemTitle}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider block">
                {booking.subcategory || booking.category}
              </span>
              <h3 className="text-xs font-bold text-slate-900 truncate">
                {booking.itemTitle}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Total Paid: ₹{booking.totalAmount?.toLocaleString('en-IN')} (incl. ₹{booking.securityDeposit?.toLocaleString('en-IN')} deposit)
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#FF5200] shrink-0" />
              <span>{booking.startDate} to {booking.endDate} ({booking.duration})</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{booking.pickupAddress}</span>
            </div>
          </div>
        </div>

        {/* Owner Info */}
        {booking.owner && (
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={booking.owner.image}
                alt={booking.owner.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Owner / Host</span>
                <span className="text-xs font-bold text-slate-900">{booking.owner.name}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Ready for Handover
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-6">
        <button
          type="button"
          onClick={() => onTrackRental && onTrackRental(booking)}
          className="w-full bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Track Live Rental</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-3.5 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Rentals Home</span>
        </button>
      </div>
    </div>
  );
};
