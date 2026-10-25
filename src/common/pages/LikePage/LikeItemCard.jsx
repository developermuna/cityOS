import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';

export const LikeItemCard = ({ item, onAddToCart, onRemoveFromWishlist }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col border border-slate-100">
      <div className="relative aspect-square bg-slate-50 p-3 flex items-center justify-center">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-contain mix-blend-multiply" 
        />
        <button 
          onClick={() => onRemoveFromWishlist(item.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h4 className="text-[12px] font-bold text-slate-900 leading-tight line-clamp-2 h-8">
          {item.fullName || item.name}
        </h4>
        
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-black text-emerald-700">
            <span>{item.rating || '4.2'}</span>
            <span>★</span>
          </div>
          <span className="text-[9px] text-slate-400 font-bold">({item.reviews || '120'})</span>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900">₹{item.dealPrice}</span>
              {item.originalPrice && (
                <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
              )}
            </div>
            
            <button 
              onClick={() => onAddToCart(item)}
              className="w-10 h-10 rounded-full bg-[#800020] flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
