import React from 'react';

export const BookingDetailsPage = ({ booking, onBack, onTrackBooking }) => {
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
            Booking Details
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            Order #{booking.id.toUpperCase()}
          </h2>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900">CityOS Service Invoice</h3>
            <p className="text-[10px] text-slate-400">{booking.createdAt}</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase">
            {booking.status}
          </span>
        </div>

        {/* Service Item */}
        <div className="flex items-center justify-between text-xs py-1">
          <div>
            <h4 className="font-bold text-slate-900">{booking.serviceTitle}</h4>
            <p className="text-[11px] text-slate-500">Scheduled: {booking.scheduledDate} ({booking.scheduledTimeSlot})</p>
          </div>
          <span className="font-black text-slate-900">₹{booking.basePrice}</span>
        </div>

        {/* Assigned Provider */}
        {booking.provider && (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img src={booking.provider.avatar} alt="Pro" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <span className="font-bold text-slate-900 block">{booking.provider.name}</span>
                <span className="text-[10px] text-slate-500">{booking.provider.phone}</span>
              </div>
            </div>
            <span className="text-amber-600 font-bold">★ {booking.provider.rating}</span>
          </div>
        )}

        {/* Breakdown */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Base Fee:</span>
            <span>₹{booking.basePrice}</span>
          </div>
          {booking.emergencyFee > 0 && (
            <div className="flex justify-between text-rose-600">
              <span>Emergency Surcharge:</span>
              <span>+₹{booking.emergencyFee}</span>
            </div>
          )}
          {booking.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount / Coins Applied:</span>
              <span>-₹{booking.discount}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
            <span>Total Paid/Payable:</span>
            <span className="text-[#606C38]">₹{booking.totalAmount}</span>
          </div>
        </div>

        {/* Address */}
        <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
          <span className="font-bold text-slate-800 block text-[11px] uppercase mb-0.5">Service Address:</span>
          <span>{booking.address}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onTrackBooking(booking)}
          className="flex-1 py-3 rounded-2xl bg-[#606C38] text-white text-xs font-black shadow-md cursor-pointer"
        >
          Open Live Tracker
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 text-xs font-bold cursor-pointer"
        >
          Print / PDF
        </button>
      </div>
    </div>
  );
};
