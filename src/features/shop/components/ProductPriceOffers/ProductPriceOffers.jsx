import React, { useState } from 'react';
import { ChevronRight, CreditCard, RefreshCw, CheckCircle2, ChevronDown } from 'lucide-react';

export const ProductPriceOffers = ({ 
  product, 
  selectedVariant, 
  showToast 
}) => {
  const [showAllOffers, setShowAllOffers] = useState(false);

  const price = selectedVariant.dealPrice || product.dealPrice;
  const original = selectedVariant.originalPrice || product.originalPrice;
  const discountPercent = Math.round(((original - price) / original) * 100);

  return (
    <div className="bg-white px-4 py-3.5 border-t border-slate-100 select-none">
      {/* Brand & View Store Link */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
          {product.brand}
        </span>
        <button
          type="button"
          onClick={() => showToast && showToast('Visiting official Samsung Store')}
          className="text-[11.5px] font-bold text-[#800020] hover:underline flex items-center cursor-pointer"
        >
          <span>View Store</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Main Title */}
      <h1 className="text-[15.5px] font-bold text-slate-900 leading-snug">
        {product.title}
      </h1>

      {/* Ratings & Reviews Small Star Row */}
      <div className="flex items-center gap-2 mt-1.5 mb-2.5">
        <span className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[10.5px] font-black px-2 py-0.5 rounded-md shadow-2xs">
          <span>{product.rating}</span>
          <span className="text-[9px]">★</span>
        </span>
        <span className="text-[11.5px] text-slate-500 font-medium">
          {product.ratingsCount} ratings & {product.reviewsCount} reviews
        </span>
      </div>

      {/* Price Details */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[14px] font-black text-emerald-700">
          {discountPercent}% off
        </span>
        <span className="text-[13px] font-bold text-slate-400 line-through">
          ₹{original.toLocaleString('en-IN')}
        </span>
        <span className="text-[22px] font-black text-slate-950">
          ₹{price.toLocaleString('en-IN')}
        </span>
      </div>
      <p className="text-[11px] text-slate-500 font-medium">
        + ₹99 Secured Packaging & Delivery fee
      </p>

      {/* Featured "Buy at ₹52,299" Offer Card */}
      <div className="mt-4 rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/70 to-blue-50/30 p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black text-sky-900 uppercase tracking-tight bg-sky-100 px-2 py-0.5 rounded">
              BANK OFFER
            </span>
            <span className="text-[13.5px] font-black text-slate-900">
              Buy at ₹{(price - 4750).toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[11px] font-bold text-sky-700">
            View T&C
          </span>
        </div>

        {/* Bank Card Discounts List */}
        <div className="space-y-2 mt-2">
          {product.bankOffers.slice(0, showAllOffers ? product.bankOffers.length : 2).map((offer) => (
            <div 
              key={offer.id} 
              className="flex items-start gap-2.5 text-[11.5px] text-slate-700 bg-white/90 p-2 rounded-xl border border-sky-100"
            >
              <CreditCard size={15} className="text-sky-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-slate-900 mr-1">{offer.bank}:</span>
                <span className="font-black text-emerald-700 mr-1">{offer.discount}</span>
                <span className="text-slate-500 font-normal">{offer.detail}</span>
              </div>
              {offer.applied && (
                <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  Applied
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Show more offers toggle */}
        {product.bankOffers.length > 2 && (
          <button
            type="button"
            onClick={() => setShowAllOffers(!showAllOffers)}
            className="mt-2 text-[11px] font-bold text-sky-800 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>{showAllOffers ? 'Show fewer offers' : `+${product.bankOffers.length - 2} more offers available`}</span>
            <ChevronDown size={13} className={showAllOffers ? 'rotate-180' : ''} />
          </button>
        )}
      </div>

      {/* Exchange Offer Card */}
      <div 
        onClick={() => showToast && showToast('Checking old phone exchange value... 📱')}
        className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <RefreshCw size={17} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-800">
              SMARTPHONE EXCHANGE
            </span>
            <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">
              Up to ₹27,000 off on exchange
            </h4>
            <p className="text-[10.5px] text-slate-500">
              Exchange your existing device for instant discount
            </p>
          </div>
        </div>
        <ChevronRight size={17} className="text-amber-700" />
      </div>
    </div>
  );
};
