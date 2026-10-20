import React, { useState, useEffect } from 'react';
import { BoltIcon } from './CustomIcons';

const BANNERS = [
  {
    id: 1,
    title: 'Bolt',
    highlight: 'Food In 15 Mins!',
    subtitle: 'Fresh, hot & crisp delights for you.',
    buttonText: 'ORDER NOW',
    gradient: 'from-[#6b142b] via-[#540f21] to-[#400b19]',
    shadow: 'shadow-[0_8px_20px_rgba(84,15,33,0.35)]',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Free Delivery',
    highlight: 'On Your First Order!',
    subtitle: 'No minimum order value required.',
    buttonText: 'GRAB NOW',
    gradient: 'from-[#0f8a65] via-[#0d7a5a] to-[#0b6a4e]',
    shadow: 'shadow-[0_8px_20px_rgba(15,138,101,0.35)]',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Weekend Deals',
    highlight: 'Flat 50% OFF!',
    subtitle: 'On top rated restaurants near you.',
    buttonText: 'EXPLORE',
    gradient: 'from-[#1b2b48] via-[#152238] to-[#0f1929]',
    shadow: 'shadow-[0_8px_20px_rgba(27,43,72,0.35)]',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&auto=format&fit=crop&q=80'
  }
];

export const BoltBanner = ({ onOrderNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[currentSlide];

  return (
    <div className="w-full px-4 mb-3 select-none">
      <div className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-r ${banner.gradient} py-2 px-4 flex items-center justify-between transition-all duration-700 ease-in-out ${banner.shadow} border border-white/10 h-[95px]`}>
        
        {/* Left Side Content */}
        <div className="flex flex-col items-start z-10 max-w-[62%]">
          {/* Header */}
          <div className="flex items-center gap-1.5 text-white font-extrabold text-[13px] tracking-tight">
            <span className="text-white font-black">{banner.title}</span>
            {banner.title === 'Bolt' && (
              <span className="text-[#ff9800] inline-flex items-center">
                <BoltIcon size={12} className="fill-[#ff9800]" />
              </span>
            )}
            <span className="text-white/60 font-normal">|</span>
            <span className="text-white text-[11px] font-bold">{banner.highlight}</span>
          </div>

          {/* Subtitle */}
          <p className="text-[10px] text-white/80 font-normal mt-0.5 leading-tight">
            {banner.subtitle}
          </p>

          {/* Action button */}
          <button
            onClick={onOrderNow}
            className="mt-2 px-4 py-1.5 bg-gradient-to-r from-[#fc8019] to-[#ff9800] hover:shadow-orange-500/40 active:scale-95 text-white text-[10px] font-black tracking-wider uppercase rounded-[12px] shadow-[0_4px_10px_rgba(252,128,25,0.4)] transition-all cursor-pointer border border-white/10"
          >
            {banner.buttonText}
          </button>
        </div>

        {/* Right Side Food Image */}
        <div className="relative w-24 h-18 shrink-0 flex items-center justify-end">
          <img
            src={banner.image}
            alt="Promo"
            className="w-16 h-16 object-cover rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-2 border-white/20"
          />
          {/* Small badge overlay */}
          <div className="absolute -bottom-0.5 -left-0.5 w-7 h-7 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
            <img
              src={banner.badgeImage}
              alt="Sub"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-white w-3' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
