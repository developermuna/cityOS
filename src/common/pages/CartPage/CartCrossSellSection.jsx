import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CartCrossSellSection = ({ title, items, showArrow = false }) => {
  return (
    <div className={`bg-white mt-2 p-4 overflow-hidden ${showArrow ? 'mb-12' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-slate-900">{title}</h3>
        {showArrow && (
          <button className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
            <ArrowRight size={14} />
          </button>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {items.map(p => (
          <div key={p.id} className="min-w-[130px] flex flex-col gap-1.5 border border-slate-100 rounded-xl p-2 bg-slate-50/30">
            <div className="w-full aspect-square rounded-lg bg-white overflow-hidden p-2">
              <img src={p.image} className="w-full h-full object-contain" alt="" />
            </div>
            <p className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight h-7">{p.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-black text-slate-900">{p.price}</span>
              <span className="text-[9px] text-slate-400 line-through">{p.strike}</span>
            </div>
            <button className="w-full py-1.5 border border-[#800020] text-[#800020] rounded-md text-[10px] font-black uppercase mt-1">
              {title.includes('Wishlist') ? 'Move to cart' : 'Add to cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
