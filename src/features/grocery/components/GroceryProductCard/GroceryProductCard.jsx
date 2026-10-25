import React from 'react';
import { Plus } from 'lucide-react';

export const GroceryProductCard = ({ item, onAddToCart }) => {
  return (
    <article className="flex flex-col bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm transition-all p-2 rounded-2xl border border-slate-100" aria-label={`Item: ${item.name}`}>
      <div className="relative w-full h-24 rounded-xl overflow-hidden bg-white mb-1.5 shadow-2xs">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <button
          onClick={() => onAddToCart && onAddToCart({ ...item, dealPrice: item.price })}
          className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-md shadow-md border border-slate-200 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white active:scale-95 transition-all cursor-pointer"
          aria-label={`Add ${item.name}`}
        >
          <Plus size={14} className="stroke-[3]" />
        </button>
      </div>
      <span className="text-[10px] text-slate-500 font-medium">{item.weight}</span>
      <div className="flex items-center gap-1">
        <span className="text-xs font-black text-slate-900">₹{item.price}</span>
        <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
      </div>
      <span className="text-[9px] font-bold text-[#2E7D32]">{item.discount}</span>
      <p className="text-[10.5px] font-bold text-slate-800 line-clamp-2 leading-tight mt-0.5">
        {item.name}
      </p>
    </article>
  );
};
