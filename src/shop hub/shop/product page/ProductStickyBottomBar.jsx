import React from 'react';
import { ShoppingCart, Zap } from 'lucide-react';

export const ProductStickyBottomBar = ({ 
  price, 
  originalPrice, 
  onAddToCart, 
  onBuyNow 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] select-none">
      {/* Left: Total Price & EMI */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[17px] font-black text-slate-950 leading-tight">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-[11px] font-medium text-slate-400 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold text-emerald-700">
          EMI from ₹4,233/mo
        </span>
      </div>

      {/* Right Buttons: Add to Cart & Buy Now */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onAddToCart}
          className="px-4 py-2.5 rounded-xl border-2 border-[#800020] text-[#800020] hover:bg-[#800020]/5 active:scale-95 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
        >
          <ShoppingCart size={15} />
          <span>Add to Cart</span>
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          className="px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#650019] text-white active:scale-95 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#800020]/25 transition-all cursor-pointer shrink-0"
        >
          <Zap size={15} className="fill-white" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
