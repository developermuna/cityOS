import React from 'react';
import { Trash2, Heart } from 'lucide-react';

export const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="bg-white p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-24 h-24 shrink-0 flex items-center justify-center p-1 bg-slate-50 rounded-lg">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="text-[13px] font-bold text-slate-900 leading-tight line-clamp-2">
              {item.fullName || item.name}
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">{item.weight || 'Default Pack'}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-black text-emerald-700">
              <span>{item.rating || '4.2'}</span>
              <span className="text-[8px]">★</span>
            </div>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-3 object-contain" alt="Assured" />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-base font-black text-slate-900">₹{item.dealPrice}</span>
            <span className="text-[11px] text-slate-400 line-through">₹{item.originalPrice || item.dealPrice + 100}</span>
            <span className="text-[11px] font-black text-emerald-600">
              {Math.round(((item.originalPrice || item.dealPrice + 100) - item.dealPrice) / (item.originalPrice || item.dealPrice + 100) * 100)}% off
            </span>
          </div>
        </div>
      </div>

      {/* Quantity Controls & Actions */}
      <div className="flex items-center border-t border-slate-50 pt-3">
        <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white">
          <button 
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="w-8 h-8 flex items-center justify-center text-slate-500 text-lg font-bold active:bg-slate-50"
          >
            -
          </button>
          <div className="w-10 h-8 flex items-center justify-center text-sm font-black border-x border-slate-200">
            {item.count}
          </div>
          <button 
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="w-8 h-8 flex items-center justify-center text-slate-500 text-lg font-bold active:bg-slate-50"
          >
            +
          </button>
        </div>

        <div className="flex-1 flex justify-end gap-3">
          <button 
            onClick={() => onRemoveItem(item.id)}
            className="flex items-center gap-1 text-[11px] font-black text-slate-500 uppercase active:text-red-500"
          >
            <Trash2 size={14} />
            Remove
          </button>
          <button 
            className="flex items-center gap-1 text-[11px] font-black text-[#800020] uppercase active:scale-95"
          >
            <Heart size={14} className="fill-[#800020] text-[#800020]" />
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
};
