import React, { useState } from 'react';
import { Search, ChevronRight, Plus, Menu } from 'lucide-react';
import { Header } from './Header';
import { instamartData } from '../data/mockData';
import { BurgerIcon, GroceryBagIcon, ClocheIcon, DiscoBallIcon, VegIcon } from './CustomIcons';

export const InstamartPage = ({ onTabChange, onAddToCart, cartItems = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full bg-white min-h-screen text-slate-800 pb-16 select-none">
      {/* Fixed Unified Header with White Theme and Attached Tabs */}
      <div className="w-full bg-white">
        <Header
          activeTab="instamart"
          onTabChange={onTabChange}
          theme="white"
        />
      </div>

      <div className="page-transition">
        {/* Search Input */}
      <div className="px-4 py-3">
        <div className="w-full bg-[#f4f4f6] rounded-2xl h-11 px-3.5 flex items-center justify-between border border-slate-200">
          <div className="flex items-center gap-2 w-full">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for 'Zero Sugar Drinks'"
              className="bg-transparent text-sm text-slate-800 placeholder-slate-500 font-medium outline-none w-full"
            />
          </div>
          {/* Scanner/document icon */}
          <div className="text-slate-500 cursor-pointer pl-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3M7 12h10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Banner: Let The Sweetness Triumph */}
      <div className="px-4 mb-4">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-[#0091ff] via-[#00a6ff] to-[#00c0ff] p-4 text-white shadow-md">
          {/* Powered by Noice Badge */}
          <div className="absolute top-3 right-3 bg-[#ff5200] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
            POWERED BY NOICE
          </div>

          <div className="max-w-[62%] z-10 relative">
            <h2 className="text-lg font-black leading-tight tracking-tight">
              Let The Sweetness Triumph!
            </h2>
            <p className="text-xs text-sky-100 font-medium mt-1 leading-snug">
              Get premium, ghee-rich sweet boxes for your faves!
            </p>
            <button className="mt-3 px-4 py-1.5 bg-white text-sky-700 text-xs font-black rounded-full shadow-sm uppercase tracking-wider">
              SHOP NOW
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&auto=format&fit=crop&q=80"
            alt="Sweet Boxes"
            className="absolute -right-2 bottom-0 w-32 h-28 object-cover rounded-tl-2xl shadow-lg transform rotate-3"
          />

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 px-2 py-0.5 rounded-full text-[9px] font-bold">
            2 / 7
          </div>
        </div>
      </div>

      {/* Fresh Store Section */}
      <div className="px-4 mb-5">
        <h3 className="text-base font-black text-slate-900 mb-2.5">Fresh Store</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {instamartData.freshStore.map((item) => (
            <div key={item.id} className="flex flex-col bg-slate-50/70 p-2 rounded-2xl border border-slate-100">
              <div className="relative w-full h-24 rounded-xl overflow-hidden bg-white mb-1.5 shadow-2xs">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => onAddToCart && onAddToCart({ ...item, dealPrice: item.price })}
                  className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-md shadow-md border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95"
                >
                  <Plus size={14} className="stroke-[3]" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">{item.weight}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-900">₹{item.price}</span>
                <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">{item.discount}</span>
              <p className="text-[10.5px] font-bold text-slate-800 line-clamp-2 leading-tight mt-0.5">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <button className="w-full mt-3 py-2 rounded-full border border-blue-200 text-blue-600 font-black text-xs flex items-center justify-center gap-1 hover:bg-blue-50">
          <span>See All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Farm to Door Section */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-black text-slate-900">Farm to Door</h3>
          <span className="text-xs font-bold text-blue-600 flex items-center">
            See All <ChevronRight size={14} />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {instamartData.farmToDoor.map((item) => (
            <div key={item.id} className="flex flex-col bg-slate-50/70 p-2 rounded-2xl border border-slate-100">
              <div className="relative w-full h-24 rounded-xl overflow-hidden bg-white mb-1.5 shadow-2xs">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => onAddToCart && onAddToCart({ ...item, dealPrice: item.price })}
                  className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-md shadow-md border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95"
                >
                  <Plus size={14} className="stroke-[3]" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">{item.weight}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-900">₹{item.price}</span>
                <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">{item.discount}</span>
              <p className="text-[11px] font-bold text-slate-800 truncate leading-tight mt-0.5">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid (Grocery, Snacks, Drinks, Beauty) */}
      <div className="px-4">
        <h3 className="text-base font-black text-slate-900 mb-3">Explore Categories</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {instamartData.categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center bg-slate-50 p-2 rounded-2xl border border-slate-100 text-center cursor-pointer hover:bg-slate-100">
              <span className="text-2xl mb-1">{cat.icon}</span>
              <span className="text-[10px] font-bold text-slate-700 leading-tight">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

        {/* Free Delivery Bar Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#e6fbf4] text-[#0a7a58] border-t border-emerald-200/60 py-2.5 px-4 text-center text-xs font-black tracking-wide z-40">
          FREE DELIVERY on orders above ₹199
        </div>
      </div>
    </div>
  );
};
