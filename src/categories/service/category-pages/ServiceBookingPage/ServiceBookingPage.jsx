import React, { useState } from 'react';
import { TIME_SLOTS, SERVICE_COUPONS } from '../../constants/service.constants';

const RAYAGADA_AREAS = [
  'Gautam Nagar, Near Collectorate, Rayagada',
  'JKPur Colony, Rayagada',
  'Raniguda Farm, Main Road, Rayagada',
  'Ashok Nagar, Near Railway Station, Rayagada',
  'Bari Jhola Industrial Area, Rayagada',
  'Kasturi Nagar, Rayagada'
];

export const ServiceBookingPage = ({
  service,
  isEmergencyMode,
  selectedAddress,
  setSelectedAddress,
  bookingDate,
  setBookingDate,
  bookingTimeSlot,
  setBookingTimeSlot,
  problemDescription,
  setProblemDescription,
  uploadedPhotos,
  setUploadedPhotos,
  appliedCoupon,
  setAppliedCoupon,
  useCityOsCoins,
  setUseCityOsCoins,
  paymentMethod,
  setPaymentMethod,
  pricingSummary,
  onConfirmBooking,
  onBack,
  showToast,
}) => {
  const [customAddress, setCustomAddress] = useState('');
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // Simulated photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const simulatedUrl = URL.createObjectURL(file);
      setUploadedPhotos((prev) => [...prev, simulatedUrl]);
      if (showToast) showToast('Photo attached for technician');
    }
  };

  const removePhoto = (idx) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-5 px-4 pb-28 animate-in fade-in duration-300">
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
            Checkout & Schedule
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            Book Service Appointment
          </h2>
        </div>
      </div>

      {/* Selected Service Card */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <img
          src={service.image}
          alt={service.title}
          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900 truncate">{service.title}</h4>
            {isEmergencyMode && (
              <span className="text-[9px] bg-rose-100 text-rose-800 font-black px-1.5 py-0.5 rounded-sm">
                URGENT
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">⏱ Duration: {service.duration}</p>
          <span className="text-sm font-black text-slate-900 mt-1 block">₹{service.price}</span>
        </div>
      </div>

      {/* 1. Address Selection */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
            <span>📍</span> Service Address
          </label>
          <button
            type="button"
            onClick={() => setShowAddressDropdown(!showAddressDropdown)}
            className="text-xs font-bold text-[#606C38]"
          >
            Change
          </button>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
          {selectedAddress}
        </div>

        {showAddressDropdown && (
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            {RAYAGADA_AREAS.map((loc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSelectedAddress(loc);
                  setShowAddressDropdown(false);
                }}
                className="w-full text-left text-xs p-2 rounded-lg hover:bg-slate-100 text-slate-700 block transition-colors"
              >
                {loc}
              </button>
            ))}
            <div className="pt-2 flex gap-1.5">
              <input
                type="text"
                placeholder="Or type custom address/landmark..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (customAddress.trim()) {
                    setSelectedAddress(customAddress.trim());
                    setShowAddressDropdown(false);
                  }
                }}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Set
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Date & Time Selection (disabled when Emergency mode is on) */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
        <label className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
          <span>📅</span> Schedule Slot
        </label>

        {isEmergencyMode ? (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-bold flex items-center gap-2">
            <span className="text-base">🚨</span>
            <div>
              <span>Emergency 15-30 Min Rapid Dispatch Active</span>
              <p className="text-[11px] text-rose-700 font-medium">Technician assigned immediately upon confirmation</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Date Pills */}
            <div className="grid grid-cols-3 gap-2">
              {['Today', 'Tomorrow', 'In 2 Days'].map((dateOption) => (
                <button
                  key={dateOption}
                  type="button"
                  onClick={() => setBookingDate(dateOption)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    bookingDate === dateOption
                      ? 'bg-[#606C38] text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {dateOption}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setBookingTimeSlot(slot)}
                  className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                    bookingTimeSlot === slot
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Problem Description & Photo Upload */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
        <label className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
          <span>📝</span> Describe Issue & Attach Photo
        </label>
        <textarea
          rows={3}
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="e.g. Switchboard sparking, AC leaking water, tap dripping continuously..."
          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#606C38]"
        />

        {/* Uploaded Photos Preview */}
        {uploadedPhotos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {uploadedPhotos.map((url, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                <img src={url} alt="upload preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-4 h-4 bg-slate-900/80 text-white rounded-full text-[9px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors">
          <span>📷</span> Attach Photo of Issue
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </label>
      </div>

      {/* 4. Coupons & CityOS Coins */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
            <span>🏷️</span> Apply Discount Coupon
          </label>
        </div>

        <div className="flex gap-1.5">
          <select
            value={appliedCoupon}
            onChange={(e) => setAppliedCoupon(e.target.value)}
            className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-hidden"
          >
            <option value="">No Coupon</option>
            {SERVICE_COUPONS.map((cp) => (
              <option key={cp.code} value={cp.code}>
                {cp.code} ({cp.discount})
              </option>
            ))}
          </select>
          {appliedCoupon && (
            <button
              type="button"
              onClick={() => setAppliedCoupon('')}
              className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Remove
            </button>
          )}
        </div>

        {/* CityOS Coins Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Use cityOS Coins</h4>
              <p className="text-[11px] text-slate-500">Balance: 150 Coins (Save ₹50)</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={useCityOsCoins}
            onChange={(e) => setUseCityOsCoins(e.target.checked)}
            className="w-5 h-5 accent-[#606C38] rounded-md cursor-pointer"
          />
        </div>
      </div>

      {/* 5. Payment Options */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2.5 shadow-xs">
        <label className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
          <span>💳</span> Payment Method
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'Cash', label: 'Cash after Service', icon: '💵' },
            { id: 'UPI', label: 'UPI / QR Code', icon: '📱' },
            { id: 'Online', label: 'Cards / Netbanking', icon: '💳' },
          ].map((pm) => (
            <button
              key={pm.id}
              type="button"
              onClick={() => setPaymentMethod(pm.id)}
              className={`p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                paymentMethod === pm.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg block">{pm.icon}</span>
              <span className="text-[11px] font-bold block mt-1">{pm.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Pricing Summary Breakdown */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
        <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px]">
          Price Breakdown
        </h4>
        <div className="flex justify-between text-slate-600">
          <span>Service Base Package:</span>
          <span className="font-semibold">₹{pricingSummary.basePrice}</span>
        </div>
        {pricingSummary.emergencyCost > 0 && (
          <div className="flex justify-between text-rose-700 font-medium">
            <span>Urgent 15-Min Dispatch Fee:</span>
            <span>+₹{pricingSummary.emergencyCost}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>CityOS Safety & Platform Fee:</span>
          <span className="font-semibold">+₹{pricingSummary.platformFee}</span>
        </div>
        {pricingSummary.discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-bold">
            <span>Coupon Discount ({appliedCoupon}):</span>
            <span>-₹{pricingSummary.discount}</span>
          </div>
        )}
        {pricingSummary.coinsDiscount > 0 && (
          <div className="flex justify-between text-amber-600 font-bold">
            <span>cityOS Coins Applied:</span>
            <span>-₹{pricingSummary.coinsDiscount}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
          <span>Total Payable:</span>
          <span className="text-base text-[#606C38]">₹{pricingSummary.total}</span>
        </div>
      </div>

      {/* Sticky Bottom Confirm CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 z-40 max-w-md mx-auto shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Due</span>
          <span className="text-xl font-black text-slate-900">₹{pricingSummary.total}</span>
        </div>

        <button
          type="button"
          onClick={onConfirmBooking}
          className="px-6 py-3 rounded-2xl bg-[#606C38] hover:bg-[#4A5626] text-white text-xs font-black shadow-lg shadow-[#606C38]/20 active:scale-95 transition-all cursor-pointer"
        >
          Confirm & Book Service →
        </button>
      </div>
    </div>
  );
};
