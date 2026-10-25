import React from 'react';
import { Plus, Check, ChevronRight } from 'lucide-react';
import { VegIcon, NonVegIcon } from '../icons/CustomIcons';
import { store99Items } from '../../data/mockData';

export const Store99Section = ({ cartItems = {}, onAddToCart, onRemoveFromCart }) => {
  return (
    <section className="w-full px-4 mb-4 select-none" aria-label="99 Store Deals">
      <div className="w-full bg-[#ecf4fa] rounded-3xl p-3.5 border border-[#dce8f3]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            {/* 99 store logo badge */}
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-[#f6ba23] text-slate-900 font-black text-[12px] flex items-center justify-center shadow-xs">
                99
              </span>
              <span className="text-[17px] font-black text-[#800020] tracking-tight">
                store
              </span>
            </div>

            {/* Subtitle */}
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-700 mt-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#0f8a65] text-white flex items-center justify-center">
                <Check size={9} className="stroke-[3.5]" />
              </span>
              <span>Meals at ₹99 +</span>
              <span className="text-[#800020]">Free Delivery</span>
            </div>
          </div>

          {/* View All link */}
          <button 
            type="button"
            className="flex items-center text-[12.5px] font-extrabold text-[#800020] hover:underline cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight size={15} className="stroke-[3] ml-0.5" />
          </button>
        </div>

        {/* Horizontal Dishes Row */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {store99Items.map((item) => {
            const count = typeof cartItems[item.id] === 'object' 
              ? (cartItems[item.id]?.count || 0) 
              : (cartItems[item.id] || 0);
            return (
              <article
                key={item.id}
                className="w-[110px] shrink-0 flex flex-col bg-transparent"
                aria-label={`Deal: ${item.name}`}
              >
                {/* Dish Image with '+' Add Button */}
                <div className="relative w-[110px] h-[95px] rounded-2xl overflow-hidden bg-white shadow-xs">
                  <img
                    src={item.image}
                    alt={item.fullName}
                    className="w-full h-full object-cover"
                  />

                  {/* '+' Button floating at bottom right */}
                  <div className="absolute bottom-1 right-1">
                    {count === 0 ? (
                      <button
                        onClick={() => onAddToCart && onAddToCart(item)}
                        className="w-7 h-7 bg-white rounded-lg shadow-md border border-slate-200 flex items-center justify-center text-[#800020] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus size={16} className="stroke-[3]" />
                      </button>
                    ) : (
                      <div className="flex items-center bg-white rounded-lg shadow-md border border-slate-200 px-1 py-0.5 text-[11px] font-bold text-[#800020]">
                        <button
                          onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                          className="px-1 hover:text-red-500 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-1 text-slate-900">{count}</span>
                        <button
                          onClick={() => onAddToCart && onAddToCart(item)}
                          className="px-1 hover:text-green-600 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details below image */}
                <div className="pt-2 flex flex-col">
                  {/* Veg/Non-veg icon + Name */}
                  <div className="flex items-start gap-1">
                    <span className="mt-0.5 shrink-0">
                      {item.isVeg ? <VegIcon size={12} /> : <NonVegIcon size={12} />}
                    </span>
                    <h5 className="font-bold text-[11.5px] text-slate-900 leading-tight truncate">
                      {item.name}
                    </h5>
                  </div>

                  {/* Pricing: Strikethrough + Maroon Highlight Pill */}
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[11px] text-slate-500 line-through font-medium">
                      ₹{item.originalPrice}
                    </span>
                    <span className="bg-[#800020] text-white font-black text-[11.5px] px-1.5 py-[0.5px] rounded-sm leading-tight shadow-2xs">
                      ₹{item.dealPrice}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-0.5 text-[10px] font-bold text-[#0f8a65]">
                    <span>★ {item.rating}</span>
                    <span className="text-slate-400 font-normal">({item.reviews})</span>
                  </div>

                  {/* Restaurant name */}
                  <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                    {item.restaurant}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
