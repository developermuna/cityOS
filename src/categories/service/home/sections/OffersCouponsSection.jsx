import React from 'react';
import { SERVICE_COUPONS } from '../../constants/service.constants';

export const OffersCouponsSection = ({ appliedCoupon, onApplyCoupon, showToast }) => {
  return (
    <section className="px-4" aria-label="Offers and Coupons">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">
            Offers & Coupons
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Exclusive discounts for Rayagada households
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
        {SERVICE_COUPONS.map((coupon) => {
          const isApplied = appliedCoupon === coupon.code;

          return (
            <div
              key={coupon.code}
              className={`snap-start shrink-0 w-64 p-3.5 rounded-2xl border transition-all ${
                isApplied
                  ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-white/90 border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-widest text-[#606C38] bg-[#606C38]/10 px-2.5 py-0.5 rounded-md uppercase border border-[#606C38]/20">
                  {coupon.code}
                </span>
                <span className="text-[11px] font-bold text-amber-600">
                  {coupon.discount}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-semibold mt-2 leading-snug">
                {coupon.desc}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                {coupon.minOrder ? `Min. service order ${coupon.minOrder}` : 'No minimum order required'}
              </p>

              <button
                type="button"
                onClick={() => {
                  onApplyCoupon(coupon.code);
                  if (showToast) showToast(`Coupon ${coupon.code} applied!`);
                }}
                className={`w-full mt-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isApplied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {isApplied ? '✓ Applied' : 'Apply Coupon'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
