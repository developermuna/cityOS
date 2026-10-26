import React, { useState } from 'react';
import { ArrowLeft, Tag, Coins, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Banknote, Building2 } from 'lucide-react';
import { RENTAL_COUPONS } from '../../constants/rental.constants';

export const RentalCheckoutPage = ({
  item,
  rentalDates,
  deliveryType,
  deliveryAddress,
  pricing,
  couponCode,
  setCouponCode,
  useCoins,
  setUseCoins,
  paymentMethod,
  setPaymentMethod,
  onBack,
  onConfirmBooking
}) => {
  const [couponInput, setCouponInput] = useState(couponCode || '');

  if (!item || !pricing) return null;

  const paymentOptions = [
    { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)', icon: Smartphone },
    { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'NetBanking', label: 'Net Banking (All Banks)', icon: Building2 },
    { id: 'Cash', label: 'Cash on Handover / Pickup', icon: Banknote }
  ];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponCode(couponInput.trim().toUpperCase());
  };

  return (
    <div className="w-full pb-28 font-sans bg-[#fff8f5] min-h-screen">
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
          <h2 className="text-sm font-black text-slate-900 leading-tight">Rental Summary & Payment</h2>
          <span className="text-[10px] text-slate-500 font-medium">Step 2 of 2: Confirm Order</span>
        </div>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-4">
        {/* Item & Tenure Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
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
              <p className="text-[11px] text-slate-500 mt-0.5">
                {rentalDates.startDate} to {rentalDates.endDate} ({pricing.duration} {pricing.durationUnit})
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
            <span>Handover: <strong className="text-slate-900 capitalize">{deliveryType}</strong></span>
            <span className="truncate max-w-[200px] text-right font-medium">{deliveryAddress}</span>
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2.5">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#FF5200]" /> Apply Promo Coupon
          </label>
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon (e.g. RENTFIRST)"
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold focus:outline-none focus:border-[#FF5200]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Apply
            </button>
          </form>

          {pricing.appliedCoupon && (
            <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
              <span className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {pricing.appliedCoupon.code} Applied (-₹{pricing.discount})
              </span>
              <button
                type="button"
                onClick={() => {
                  setCouponCode('');
                  setCouponInput('');
                }}
                className="text-[10px] font-bold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          {/* Quick coupon suggestions */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {RENTAL_COUPONS.slice(0, 3).map((cp) => (
              <button
                key={cp.code}
                type="button"
                onClick={() => {
                  setCouponCode(cp.code);
                  setCouponInput(cp.code);
                }}
                className="px-2 py-0.5 rounded-md bg-orange-50 text-[10px] font-bold text-orange-700 border border-orange-200 whitespace-nowrap"
              >
                {cp.code}
              </button>
            ))}
          </div>
        </div>

        {/* cityOS Coins Toggle */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Use cityOS Coins (200 Coins available)
              </span>
              <span className="text-[10px] text-slate-500">
                Redeem up to ₹200 on this booking
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setUseCoins(!useCoins)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              useCoins ? 'bg-[#FF5200]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                useCoins ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Complete Pricing Breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 text-xs">
          <h4 className="text-xs font-bold text-slate-900 mb-2.5">Payment Breakdown</h4>
          <div className="flex justify-between text-slate-600">
            <span>Base Rent ({pricing.duration} {pricing.durationUnit}):</span>
            <span className="font-semibold text-slate-900">₹{pricing.rentalSubtotal.toLocaleString('en-IN')}</span>
          </div>
          {pricing.addonCharge > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Driver / Operator Option:</span>
              <span className="font-semibold text-slate-900">+₹{pricing.addonCharge.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Refundable Security Deposit:</span>
            <span className="font-semibold text-emerald-600">₹{pricing.securityDeposit.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Handover & Delivery Fee:</span>
            <span className="font-semibold text-slate-900">
              {pricing.deliveryFee > 0 ? `₹${pricing.deliveryFee}` : 'FREE'}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Platform Fee (Escrow & Insurance):</span>
            <span className="font-semibold text-slate-900">₹{pricing.platformFee}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Taxes (GST 5%):</span>
            <span className="font-semibold text-slate-900">₹{pricing.taxes}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Coupon Discount:</span>
              <span>-₹{pricing.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          {pricing.coinsDiscount > 0 && (
            <div className="flex justify-between text-amber-600 font-bold">
              <span>cityOS Coins Applied:</span>
              <span>-₹{pricing.coinsDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between pt-2.5 border-t border-slate-100 text-sm font-black text-slate-900">
            <span>Final Total Payable:</span>
            <span className="text-xl text-[#FF5200]">₹{pricing.totalPayable.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2.5">
          <h4 className="text-xs font-bold text-slate-900">Select Payment Method</h4>
          <div className="space-y-2">
            {paymentOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#FF5200] bg-orange-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === opt.id ? 'border-[#FF5200]' : 'border-slate-300'
                  }`}>
                    {paymentMethod === opt.id && <div className="w-2 h-2 rounded-full bg-[#FF5200]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-[11px] font-medium leading-tight">
            cityOS Buyer & Tenant Protection: 100% money back guarantee if item does not match listing description.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shadow-xl max-w-md mx-auto">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
            Total Payable
          </span>
          <span className="text-xl font-black text-slate-900">
            ₹{pricing.totalPayable.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          onClick={onConfirmBooking}
          className="bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold px-7 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Pay & Confirm</span>
        </button>
      </div>
    </div>
  );
};
