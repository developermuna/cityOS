import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const APP_ADS = [
  {
    id: 1,
    tag: 'RAYAGADA SUPER APP',
    title: 'All-in-One City Super App',
    desc: 'Instant Cabs, Fresh Mart & Local Food',
    badge: 'FLAT ₹100 OFF',
    action: 'Claim Now',
    logo: '⚡',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=240&auto=format&fit=crop&q=80',
    imageAlt: 'CityOS Super App'
  },
  {
    id: 2,
    tag: 'RAPID AUTO & CABS',
    title: 'Fastest Doorstep Pickups',
    desc: 'Rayagada Station, Colleges & Market from ₹19',
    badge: '3-MIN PICKUP',
    action: 'Book Ride',
    logo: '🛵',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=240&auto=format&fit=crop&q=80',
    imageAlt: 'Fast City Cabs'
  },
  {
    id: 3,
    tag: 'INSTAMART & FOOD',
    title: '10-Min Lightning Delivery',
    desc: 'Fresh groceries & hot meals right to your door',
    badge: 'FREE DELIVERY',
    action: 'Order Now',
    logo: '🛍️',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=240&auto=format&fit=crop&q=80',
    imageAlt: '10-Min Delivery'
  },
  {
    id: 4,
    tag: 'REWARDS & CASHBACK',
    title: 'Earn 5% Coins On Every Spend',
    desc: 'Redeem instant coins for free rides & meals',
    badge: '120 BONUS COINS',
    action: 'My Coins',
    logo: '🪙',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=240&auto=format&fit=crop&q=80',
    imageAlt: 'City Rewards'
  }
];

export const BoltBanner = ({ onOrderNow, _themeConfig }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % APP_ADS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentAd = APP_ADS[currentIdx];

  return (
    <section className="w-full select-none px-4 py-1.5" aria-label="App Promotion Banner">
      <div 
        onClick={() => onOrderNow && onOrderNow(currentAd)}
        className="w-full relative overflow-hidden rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xs p-3 flex items-center justify-between gap-2.5 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border border-white/15 group"
      >
        {/* Subtle Ambient Highlights */}
        <div className="absolute -left-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-16 -bottom-6 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none" />

        {/* Left: App Logo Badge & Text Content */}
        <div className="flex items-center gap-2.5 min-w-0 z-10">
          {/* App Logo Mark */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl shadow-md border border-white/30 group-hover:scale-105 transition-transform">
              <span>{currentAd.logo}</span>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-slate-950 text-amber-400 text-[8px] font-black px-1 rounded shadow-2xs border border-amber-400/50">
              PRO
            </span>
          </div>

          {/* Copy & Details */}
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[8.5px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
                <Sparkles size={9} className="text-amber-300 fill-amber-300" />
                <span>{currentAd.tag}</span>
              </span>
              <span className="text-[8px] font-black bg-white/20 text-white px-1.5 py-0.5 rounded-full uppercase tracking-tight">
                {currentAd.badge}
              </span>
            </div>
            <h4 className="text-[13px] font-black text-white truncate tracking-tight mt-1 group-hover:text-amber-200 transition-colors">
              {currentAd.title}
            </h4>
            <p className="text-[10.5px] font-semibold text-white/85 truncate mt-0.5">
              {currentAd.desc}
            </p>
          </div>
        </div>

        {/* Right: Attractive Image Visual & Action Pill */}
        <div className="flex items-center gap-2 shrink-0 z-10 pl-1">
          {/* Photographic Visual Image Container */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/25 shadow-md shrink-0 bg-slate-900/40">
            <img 
              src={currentAd.image} 
              alt={currentAd.imageAlt} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Action Button Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOrderNow) onOrderNow(currentAd);
            }}
            className="h-8.5 px-3 bg-[#FFC107] hover:bg-[#ffd54f] active:scale-95 text-slate-950 rounded-xl font-black text-[10.5px] flex items-center gap-1 shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{currentAd.action}</span>
            <ArrowRight size={12} className="stroke-[3]" />
          </button>
        </div>
      </div>
    </section>
  );
};
