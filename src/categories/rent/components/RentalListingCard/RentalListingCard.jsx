import React from 'react';
import { Star, MapPin, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';

export const RentalListingCard = ({
  item,
  onSelect,
  onRentNow,
  onToggleWishlist,
  isSaved,
  variant = 'vertical' // 'vertical' | 'horizontal'
}) => {
  if (!item) return null;

  const isFav = isSaved !== undefined ? isSaved : rentalMarketplaceService.isWishlisted(item.id);

  const formatPriceUnit = (unit) => {
    switch (unit) {
      case 'hour': return '/hr';
      case 'day': return '/day';
      case 'week': return '/wk';
      case 'month': return '/mo';
      case 'event': return '/event';
      default: return `/${unit}`;
    }
  };

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={() => onSelect && onSelect(item)}
        className="w-full bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-3 relative group"
      >
        {/* Thumbnail */}
        <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {item.isVerified && (
            <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-orange-400" /> Verified
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                {item.subcategory || item.categoryId}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleWishlist) onToggleWishlist(item.id);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            <h4 className="text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
              {item.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5 truncate">
                <MapPin className="w-3 h-3 shrink-0" /> {item.distance || item.location}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
            <div>
              <span className="text-base font-black text-slate-900">
                ₹{item.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {formatPriceUnit(item.priceUnit)}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onRentNow) onRentNow(item);
                else if (onSelect) onSelect(item);
              }}
              className="bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors active:scale-95"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Vertical Card
  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {item.subcategory || item.categoryId}
          </span>
          {item.isVerified && (
            <span className="bg-[#FF5200] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
              <ShieldCheck className="w-2.5 h-2.5" /> Verified
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(item.id);
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-red-500 shadow-xs transition-colors"
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {item.securityDeposit !== undefined && (
          <div className="absolute bottom-2 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
            Dep: ₹{item.securityDeposit.toLocaleString('en-IN')} (100% Refundable)
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {item.rating} ({item.reviewsCount})
            </span>
            <span className="flex items-center gap-0.5 truncate max-w-[140px]">
              <MapPin className="w-3 h-3 shrink-0" /> {item.distance || item.location}
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#FF5200] transition-colors">
            {item.title}
          </h3>

          {item.owner && (
            <p className="text-[11px] text-slate-500 mt-1 truncate">
              By <span className="font-semibold text-slate-700">{item.owner.name}</span>
            </p>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900">
                ₹{item.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {formatPriceUnit(item.priceUnit)}
              </span>
            </div>
            {item.depositPolicy && (
              <span className="text-[9px] text-emerald-600 font-bold block">
                0% Brokerage
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onRentNow) onRentNow(item);
              else if (onSelect) onSelect(item);
            }}
            className="bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-xs active:scale-95 flex items-center gap-1"
          >
            Rent Now <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
