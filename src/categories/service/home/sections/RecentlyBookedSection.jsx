import React from 'react';

export const RecentlyBookedSection = ({ bookings, onTrackBooking, onRebook }) => {
  if (!bookings || bookings.length === 0) return null;

  const latestBooking = bookings[0];
  const statusText = String(latestBooking?.status || latestBooking?.bookingStatus || 'IN PROGRESS')
    .replace(/_/g, ' ')
    .toUpperCase();

  return (
    <section className="px-4" aria-label="Recent Booking Quick Access">
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-300">
              Active Service • {statusText}
            </span>
          </div>
          <h4 className="text-sm font-bold truncate mt-0.5 text-white">
            {latestBooking.serviceTitle}
          </h4>
          <p className="text-[11px] text-slate-400 truncate">
            {latestBooking.provider?.name} • {latestBooking.scheduledTimeSlot}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onTrackBooking(latestBooking)}
          className="ml-3 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shrink-0 transition-all active:scale-95 cursor-pointer"
        >
          Track Live
        </button>
      </div>
    </section>
  );
};
