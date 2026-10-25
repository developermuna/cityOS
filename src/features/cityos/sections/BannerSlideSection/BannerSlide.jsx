import React from 'react';

export const BannerSlide = ({ slide, isActive, onClick, slidesCount }) => {
  return (
    <div 
      className={`h-full flex items-center justify-between px-5 cursor-pointer active:scale-[0.99] transition-all duration-300 ${
        isActive ? 'opacity-100' : 'opacity-80'
      }`}
      style={{ width: `${100 / slidesCount}%` }}
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="flex flex-col justify-center z-10 max-w-[66%] py-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
          <span className="text-[10.5px] font-black tracking-wider uppercase text-white/90 drop-shadow-sm">{slide.tag}</span>
        </div>
        <h2 className="text-[20px] font-black leading-tight drop-shadow-md text-white tracking-tight">{slide.title}</h2>
        <p className="text-[11.5px] text-white/90 font-medium mt-1 leading-snug drop-shadow-sm">{slide.desc}</p>
      </div>

      <div className="flex flex-col items-end shrink-0 z-10 gap-2 mr-1">
        <div className="text-4xl filter drop-shadow-lg transform hover:scale-110 transition-transform">
          {slide.icon}
        </div>
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="px-4 py-2 bg-gradient-to-b from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 active:translate-y-1 backdrop-blur-md text-white font-black rounded-full text-[10.5px] border border-white/40 shadow-sm transition-all uppercase tracking-wider cursor-pointer"
        >
          {slide.btnText}
        </button>
      </div>
    </div>
  );
};
