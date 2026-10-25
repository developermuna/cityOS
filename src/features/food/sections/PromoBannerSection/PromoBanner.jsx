import React from 'react';

export const PromoBanner = ({ showToast }) => {
  return (
    <div className="w-full px-4 mb-4">
      <div 
        onClick={() => showToast && showToast('🍸 Social 20% OFF voucher claimed for Mumbai Central!')}
        className="w-full relative rounded-[28px] overflow-hidden bg-[#da070d] p-4 text-white shadow-lg cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="inline-block bg-[#a3050a]/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          20TH-22ND OCTOBER
        </div>

        <div className="relative w-full h-36 my-1">
          <img
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=80"
            alt="Ramen"
            className="absolute left-0 top-2 w-22 h-22 object-cover rounded-full shadow-xl border-2 border-white/30 z-0"
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center z-20">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80"
              alt="Egg Tuck"
              className="w-20 h-20 object-cover rounded-2xl shadow-xl border-2 border-amber-300"
            />
            <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full mt-1 tracking-tight shadow-md">
              EGG TUCK
            </span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&auto=format&fit=crop&q=80"
            alt="Cheesecake"
            className="absolute right-0 top-2 w-22 h-22 object-cover rounded-full shadow-xl border-2 border-white/30 z-0"
          />
        </div>

        <div className="flex flex-col items-center text-center mt-4">
          <span className="text-[14px] font-black tracking-[0.2em] text-white/80 uppercase drop-shadow-sm">
            S(#)CIAL
          </span>
          <h3 className="text-[32px] font-black leading-none text-white tracking-tight mt-1">
            Flat 20% OFF
          </h3>
          <p className="text-[12px] text-white/90 font-bold mt-2 uppercase tracking-wide">
            + 20% cashback at Social
          </p>

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (showToast) showToast('🎉 Flat 20% OFF + ₹150 Cashback voucher claimed!');
            }}
            className="mt-5 px-10 py-2.5 bg-[#a3050a] hover:bg-[#8e0408] active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl transition-all border border-white/10 cursor-pointer"
          >
            Grab Now
          </button>
        </div>
      </div>
    </div>
  );
};
