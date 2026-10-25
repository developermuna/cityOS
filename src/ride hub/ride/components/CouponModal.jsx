import React, { useState } from 'react';
import { X, Tag, Check, Sparkles } from 'lucide-react';
import { AVAILABLE_COUPONS, validateCoupon } from '../services/paymentService';

export const CouponModal = ({
  isOpen,
  onClose,
  appliedCoupon = 'SECOND50',
  onApplyCoupon,
  tripFare = 100,
  showToast,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleApplyCode = (code) => {
    const targetCode = code || couponInput;
    const res = validateCoupon(targetCode, tripFare);
    if (res.valid) {
      if (onApplyCoupon) onApplyCoupon(targetCode.toUpperCase(), res.discount);
      if (showToast) showToast(res.message);
      setErrorMsg('');
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Tag className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Apply Promo Coupon</h3>
              <p className="text-xs text-gray-500">Save more on every ride</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => {
              setCouponInput(e.target.value.toUpperCase());
              setErrorMsg('');
            }}
            placeholder="ENTER PROMO CODE"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
          />
          <button
            type="button"
            onClick={() => handleApplyCode()}
            className="px-4 py-2.5 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Apply
          </button>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
        )}

        {/* Available Coupons List */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {AVAILABLE_COUPONS.map((coupon) => {
            const isApplied = appliedCoupon?.toUpperCase() === coupon.code.toUpperCase();
            return (
              <div
                key={coupon.code}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                  isApplied
                    ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-black text-xs text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                      {coupon.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">{coupon.title}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{coupon.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyCode(coupon.code)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                    isApplied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {isApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
