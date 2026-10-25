import React from 'react';
import { ArrowLeft, Search, Heart, ShoppingCart, Share2 } from 'lucide-react';

export const ProductHeader = ({ 
  onBack, 
  isWishlisted, 
  onToggleWishlist, 
  cartCount = 0, 
  onOpenCart, 
  showToast 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3.5 py-2.5 flex items-center justify-between gap-2 select-none shadow-2xs">
      {/* Left Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shrink-0"
        aria-label="Back"
      >
        <ArrowLeft size={20} className="stroke-[2.5]" />
      </button>

      {/* Search Input Bar */}
      <div className="flex-1 flex items-center bg-slate-100/90 rounded-full px-3 py-1.5 border border-slate-200">
        <Search size={15} className="text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search for products, brands..."
          className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && showToast) {
              showToast(`Searching for "${e.currentTarget.value}"`);
            }
          }}
        />
      </div>

      {/* Right Icons: Heart, Cart, Share */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={onToggleWishlist}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart 
            size={18} 
            className={isWishlisted ? 'fill-[#800020] text-[#800020]' : 'text-slate-700'} 
          />
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
          aria-label="Cart"
        >
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-[#800020] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => showToast && showToast('Product link copied to clipboard! 📋')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
          aria-label="Share"
        >
          <Share2 size={17} />
        </button>
      </div>
    </header>
  );
};
