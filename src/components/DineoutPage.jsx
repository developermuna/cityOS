import React, { useState } from 'react';
import { Search, Play, Ticket, Sparkles, Heart } from 'lucide-react';
import { Header } from './Header';
import { ClocheIcon } from './CustomIcons';

export const DineoutPage = ({ onTabChange }) => {
  const [activeBottomNav, setActiveBottomNav] = useState('dineout');

  return (
    <div className="w-full min-h-screen bg-[#faf7f0] text-slate-800 pb-20 select-none flex flex-col justify-between">
      <div>
        {/* Top Header Section with Cream Theme */}
        <div className="w-full bg-[#faf7f0] pt-1">
          {/* Location & Trapezoidal Category Tabs with Dineout ACTIVE */}
          <Header
            activeTab="dineout"
            onTabChange={onTabChange}
            theme="cream"
          />
        </div>

        {/* Page Transition Content */}
        <div className="page-transition">
          {/* Search Bar matching screenshot */}
          <div className="px-4 mt-3 mb-4">
            <div className="w-full bg-white rounded-2xl h-[50px] px-4 flex items-center border border-[#e6e2d8] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <Search size={20} className="text-[#757575] mr-3 shrink-0 stroke-[2.2]" />
              <input
                type="text"
                placeholder="Search for malls & landmarks"
                className="w-full bg-transparent text-[14.5px] text-slate-800 placeholder-[#757575] font-normal outline-none"
              />
            </div>
          </div>

          {/* Hero Card: Flat 20% OFF at Social */}
          <div className="w-full px-4 mb-5 overflow-hidden">
            <div className="flex gap-3">
              {/* Main Social Card */}
              <div className="w-full shrink-0 relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#e8491d] via-[#dc3e15] to-[#ba2f0b] p-4 text-white shadow-md">
                {/* Date Badge */}
                <div className="inline-block bg-[#881800]/80 backdrop-blur-xs text-white text-[10.5px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  20TH-22ND OCTOBER
                </div>

                {/* Food Dishes Collage */}
                <div className="relative w-full h-44 my-1">
                  {/* Ramen Bowl Left */}
                  <img
                    src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=80"
                    alt="Ramen"
                    className="absolute left-1 top-4 w-24 h-24 object-cover rounded-full shadow-lg border-2 border-white/20"
                  />
                  {/* Egg Tuck Center */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                    <img
                      src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80"
                      alt="Egg Tuck"
                      className="w-22 h-22 object-cover rounded-2xl shadow-xl border-2 border-amber-300"
                    />
                    <span className="bg-black text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm mt-0.5 tracking-tight">
                      EGG TUCK
                    </span>
                  </div>
                  {/* Cheesecake Right */}
                  <img
                    src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&auto=format&fit=crop&q=80"
                    alt="Cheesecake"
                    className="absolute right-1 top-2 w-24 h-24 object-cover rounded-full shadow-lg border-2 border-white/20"
                  />
                  {/* Steamed Momos Bottom Left */}
                  <img
                    src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&auto=format&fit=crop&q=80"
                    alt="Dim Sum Basket"
                    className="absolute left-8 bottom-0 w-22 h-22 object-cover rounded-full shadow-xl border-2 border-white/30"
                  />
                  {/* Stuffed Bun Bottom Right */}
                  <img
                    src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80"
                    alt="Stuffed Bun"
                    className="absolute right-8 bottom-1 w-20 h-20 object-cover rounded-full shadow-xl border-2 border-white/30"
                  />
                </div>

                {/* Offer Details */}
                <div className="flex flex-col items-center text-center mt-2">
                  <span className="text-[15px] font-black tracking-widest text-white uppercase drop-shadow-sm">
                    S(#)CIAL
                  </span>
                  <h3 className="text-[28px] font-black leading-none text-white tracking-tight mt-0.5">
                    Flat 20% OFF
                  </h3>
                  <p className="text-[12px] text-white/95 font-medium mt-1">
                    + 20% cashback, exclusively for you at Social
                  </p>

                  <button className="mt-3 px-6 py-2 bg-[#8c1800] hover:bg-[#701300] active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer">
                    Grab Now
                  </button>
                </div>

                {/* Carousel Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                </div>
              </div>
            </div>
          </div>

          {/* GREAT INDIAN RESTAURANT FESTIVAL */}
          <div className="w-full px-4 mb-6">
            <h4 className="text-[13px] font-black text-[#3d3935] uppercase tracking-wider mb-3">
              GREAT INDIAN RESTAURANT FESTIVAL
            </h4>

            <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
              {/* Card 1: UP TO 50% OFF */}
              <div className="w-[125px] h-[125px] shrink-0 bg-[#f1ebe0] rounded-3xl p-3 border border-[#e4ded3] flex flex-col items-center justify-center text-center shadow-2xs">
                <span className="text-[10px] font-extrabold text-[#705e4a] uppercase tracking-wider">UP TO</span>
                <div className="text-[34px] font-black text-[#523d2b] leading-none my-0.5">
                  50<span className="text-[18px]">%</span>
                </div>
                <span className="text-[11px] font-black text-[#705e4a] tracking-wider">OFF</span>
              </div>

              {/* Card 2: Nightlife & Drinks */}
              <div className="w-[125px] h-[125px] shrink-0 bg-[#f1ebe0] rounded-3xl p-2.5 border border-[#e4ded3] flex flex-col justify-between shadow-2xs">
                <div>
                  <h5 className="font-bold text-[12px] text-[#3d3935] leading-tight">
                    Nightlife<br />& Drinks
                  </h5>
                </div>
                <div className="flex justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80"
                    alt="Drinks"
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>

              {/* Card 3: Flash Sale Up To 70% */}
              <div className="w-[125px] h-[125px] shrink-0 bg-[#f1ebe0] rounded-3xl p-2.5 border border-[#e4ded3] flex flex-col justify-between shadow-2xs">
                <div>
                  <h5 className="font-bold text-[11.5px] text-[#3d3935] leading-tight">
                    Flash Sale<br />Up To 70%
                  </h5>
                </div>
                <div className="flex justify-end text-2xl">
                  🍷
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Rainbow Gradient Action Icon (Bottom Right) */}
      <div className="fixed bottom-20 right-5 z-40">
        <div className="w-12 h-12 rounded-full p-[2.5px] bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform">
          <div className="w-full h-full bg-[#180e29] rounded-full flex items-center justify-center text-white font-black text-sm">
            C
          </div>
        </div>
      </div>

      {/* Bottom Sticky Navigation Bar matching Dineout screenshot */}
      <div className="w-full bg-[#faf7f0] border-t border-[#e8e4db] px-2 py-2 flex items-center justify-around z-30">
        {/* 1. Dineout */}
        <button 
          onClick={() => setActiveBottomNav('dineout')}
          className="flex flex-col items-center gap-1 text-[#e8491d] cursor-pointer"
        >
          <ClocheIcon size={20} />
          <span className="text-[10px] font-black">Dineout</span>
        </button>

        {/* 2. Bites */}
        <button 
          onClick={() => setActiveBottomNav('bites')}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <Play size={18} />
          <span className="text-[10px] font-bold">Bites</span>
        </button>

        {/* 3. Deal vouchers */}
        <button 
          onClick={() => setActiveBottomNav('vouchers')}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <Ticket size={18} />
          <span className="text-[10px] font-bold">Deal vouch...</span>
        </button>

        {/* 4. Scenes */}
        <button 
          onClick={() => onTabChange('scenes')}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <Sparkles size={18} />
          <span className="text-[10px] font-bold">Scenes</span>
        </button>

        {/* 5. My corner */}
        <button 
          onClick={() => setActiveBottomNav('corner')}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <Heart size={18} />
          <span className="text-[10px] font-bold">My corner</span>
        </button>

        {/* Profile Logo */}
        <div className="w-7 h-7 rounded-full bg-[#1b3d2f] border border-[#235841] flex items-center justify-center text-amber-200 text-[8px] font-black shadow-xs">
          BB
        </div>
      </div>
    </div>
  );
};
