import React from 'react';
import { RentalPrice } from '../components/RentalPrice';

export const RentalPricingSection = ({ item, pricing }) => {
  if (!item) return null;

  return (
    <section className="px-4 py-2 space-y-3" aria-label="Rental Pricing Details">
      <RentalPrice item={item} />

      {pricing && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 text-xs">
          <h3 className="text-xs font-bold text-slate-900 mb-2">Estimated Cost Breakdown</h3>
          <div className="flex justify-between text-slate-600">
            <span>Rental ({pricing.duration} {pricing.durationUnit}):</span>
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
            <span>Platform Fee (cityOS Protection):</span>
            <span className="font-semibold text-slate-900">₹{pricing.platformFee}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated Taxes (GST 5%):</span>
            <span className="font-semibold text-slate-900">₹{pricing.taxes}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Coupon Discount:</span>
              <span>-₹{pricing.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
            <span>Total Payable:</span>
            <span className="text-[#FF5200]">₹{pricing.totalPayable.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}
    </section>
  );
};
