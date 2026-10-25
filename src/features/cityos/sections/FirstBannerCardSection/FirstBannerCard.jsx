import React, { useState, useEffect } from 'react';
import { BannerSlide } from '@/features/cityos/sections/BannerSlideSection/BannerSlide';

export const FirstBannerCard = ({ onTabChange, showToast }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      tag: "CityOS Live • Mumbai",
      title: "Your City at a Glance",
      desc: "28°C Partly Cloudy • Aqua Line 3 On Time • AQI 42 (Good)",
      btnText: "Check Stats",
      solid: "bg-gradient-to-r from-[#800020] via-[#68001a] to-[#4d0013]",
      icon: "🏙️"
    },
    {
      id: 2,
      tag: "Flash Sale • 30 Mins Left",
      title: "80% OFF on Cabs",
      desc: "Instant pickup across Mumbai Central & South Mumbai.",
      btnText: "Book Now",
      solid: "bg-gradient-to-r from-[#6b001b] via-[#540015] to-[#3a000e]",
      icon: "🚕"
    },
    {
      id: 3,
      tag: "Live Festival",
      title: "Zomaland is Here!",
      desc: "Gourmet food & live music. Flat 20% instant cashback.",
      btnText: "View Tickets",
      solid: "bg-gradient-to-r from-[#520015] via-[#3f0010] to-[#2a000a]",
      icon: "🎟️"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleBannerAction = (slide) => {
    if (slide.id === 1) {
      if (showToast) showToast('📊 Mumbai Central Live: 28°C • AQI 42 (Good) • Metro Line 3 Running Normal');
    } else if (slide.id === 2) {
      if (onTabChange) onTabChange('ride');
      if (showToast) showToast('🚕 80% Cab discount applied! Select your destination.');
    } else if (slide.id === 3) {
      if (onTabChange) onTabChange('scenes');
      if (showToast) showToast('🎟️ Opened Zomaland passes & live stages');
    }
  };

  return (
    <section className="w-full px-4 select-none relative pt-2 pb-1 overflow-visible" aria-label="City Highlights Banner">
      <div 
        className={`relative w-full h-[140px] rounded-[24px] ${slides[currentSlide].solid} transition-all duration-700 ease-in-out overflow-hidden shadow-md`}
        style={{ perspective: '1200px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/5 pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/15 rounded-full blur-xl pointer-events-none" />

        <div 
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ 
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {slides.map((slide) => (
            <BannerSlide 
              key={slide.id}
              slide={slide}
              slidesCount={slides.length}
              isActive={slides[currentSlide].id === slide.id}
              onClick={() => handleBannerAction(slide)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
