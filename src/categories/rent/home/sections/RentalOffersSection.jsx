import React from 'react';
import { Tag, Sparkles, Copy } from 'lucide-react';
import { RENTAL_COUPONS } from '../../constants/rental.constants';

export const RentalOffersSection = ({ showToast }) => {
  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    if (showToast) showToast(`Coupon code ${code} copied!`);
  };

  return (
    <section className="py-2" aria-label="Rental Offers & Discounts">
      <div className="px-4 flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#FF5200]" />
          <h3 className="text-sm font-black text-slate-900 tracking-tight">
            Rental Offers & Deals
          </h3>
        </div>
      </div>

      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        {RENTAL_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="w-64 shrink-0 rounded-2xl p-3 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/70 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" /> Promo
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="text-[10px] font-bold text-orange-600 hover:text-orange-800 flex items-center gap-0.5"
                >
                  <Copy className="w-2.5 h-2.5" /> Copy
                </button>
              </div>

              <h4 className="text-xs font-black text-slate-900">
                Code: {coupon.code}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                {coupon.description}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-orange-100 text-[10px] text-slate-500 font-medium">
              Min. rental ₹{coupon.minRental?.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
