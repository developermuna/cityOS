import React, { useState } from 'react';
import { TIME_SLOTS } from '../../constants/service.constants';

export const ServiceDetailsPage = ({
  service,
  allProviders,
  onBookNow,
  onSelectProvider,
  onBack,
  showToast,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const provider = allProviders.find((p) => p.id === service.providerId) || allProviders[0];

  return (
    <div className="space-y-5 px-4 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Service Details
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            {service.title}
          </h2>
        </div>
      </div>

      {/* Main Hero Image */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm aspect-video">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
          🛡️ {service.warranty}
        </div>
        <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full shadow-xs">
          ★ {service.rating} ({service.reviewsCount})
        </div>
      </div>

      {/* Title & Quick Specs */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-black text-slate-900 leading-tight">
            {service.title}
          </h1>
          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-slate-900">₹{service.price}</span>
            <span className="text-[10px] text-slate-400 block font-medium">Standard Fix</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {service.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl">
            ⏱ {service.duration}
          </span>
          <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-xl">
            ✓ Post-Service Cleanup
          </span>
          {service.isEmergency && (
            <span className="text-[11px] font-bold bg-rose-50 text-rose-800 px-2.5 py-1 rounded-xl">
              🚨 15-Min Emergency Standby
            </span>
          )}
        </div>
      </div>

      {/* What's Included vs What's Not Included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Included */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
            <span className="text-emerald-700 text-sm">✓</span> What's Included
          </h4>
          <ul className="space-y-1.5 text-xs text-emerald-900 font-medium">
            {service.included?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
          <h4 className="text-xs font-black text-rose-950 uppercase tracking-wide flex items-center gap-1.5">
            <span className="text-rose-700 text-sm">✕</span> What's Not Included
          </h4>
          <ul className="space-y-1.5 text-xs text-rose-900 font-medium">
            {service.notIncluded?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assigned Service Provider Card */}
      {provider && (
        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Top Service Professional
            </span>
            <button
              onClick={() => onSelectProvider(provider)}
              className="text-xs font-bold text-[#606C38] hover:underline"
            >
              View Full Profile →
            </button>
          </div>

          <div 
            onClick={() => onSelectProvider(provider)}
            className="flex items-center gap-3 cursor-pointer pt-1"
          >
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-13 h-13 rounded-2xl object-cover border border-slate-200"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900">{provider.name}</h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{provider.experience} • {provider.completedJobs}+ jobs completed</p>
              <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                <span className="font-bold text-amber-600">★ {provider.rating}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{provider.distance} away</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Time Slots Preview */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Select Convenient Time Slot
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                selectedSlot === slot
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Reviews & Ratings */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Verified Customer Reviews ({service.reviews?.length || 0})
          </h4>
          <span className="text-xs font-bold text-amber-600">★ {service.rating} Overall</span>
        </div>

        <div className="space-y-2">
          {service.reviews?.map((rev) => (
            <div key={rev.id} className="p-3 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{rev.user}</span>
                <span className="text-amber-500 font-bold">{'★'.repeat(rev.rating)}</span>
              </div>
              <p className="text-slate-600 font-medium">{rev.comment}</p>
              <span className="text-[10px] text-slate-400 block">{rev.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 z-40 max-w-md mx-auto shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Package</span>
          <span className="text-xl font-black text-slate-900">₹{service.price}</span>
        </div>

        <button
          type="button"
          onClick={() => onBookNow(service)}
          className="px-6 py-3 rounded-2xl bg-[#606C38] hover:bg-[#4A5626] text-white text-xs font-black shadow-lg shadow-[#606C38]/20 active:scale-95 transition-all cursor-pointer"
        >
          Continue to Booking →
        </button>
      </div>
    </div>
  );
};
