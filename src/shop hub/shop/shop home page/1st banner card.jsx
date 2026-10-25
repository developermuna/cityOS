import React, { useState, useEffect } from 'react';

const AD_SLIDES = [
  {
    id: 'ad-1',
    brand: 'CITYOS APP EXCLUSIVE',
    title: 'Rayagada Super App Deals',
    badge: 'UP TO 80% OFF',
    items: [
      { id: 'ad-item-1', name: 'Galaxy S25 5G', price: '₹59,299', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300' },
      { id: 'ad-item-2', name: 'PS5 Slim Console', price: '₹44,990', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300' },
      { id: 'ad-item-3', name: 'iPhone 18 Pro', price: '₹89,999', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300' }
    ]
  },
  {
    id: 'ad-2',
    brand: 'APP CASHBACK REWARDS',
    title: 'Earn Coins On Every Order',
    badge: 'EXTRA COINS',
    items: [
      { id: 'ad-item-4', name: 'Air Jordan Retro', price: '₹6,499', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300' },
      { id: 'ad-item-5', name: 'Ultraboost 5.0', price: '₹5,299', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300' },
      { id: 'ad-item-6', name: 'Smart Fitness Band', price: '₹1,999', image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=300' }
    ]
  },
  {
    id: 'ad-3',
    brand: 'FAST RAYAGADA EXPRESS',
    title: 'Doorstep Delivery In 10 Mins',
    badge: 'ZERO DELIVERY FEE',
    items: [
      { id: 'ad-item-7', name: 'Ghee Sweets Box', price: '₹349', image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=300' },
      { id: 'ad-item-8', name: 'Farm Organic Milk', price: '₹68', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300' },
      { id: 'ad-item-9', name: 'Gourmet Pizza', price: '₹299', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300' }
    ]
  }
];

export const FirstBannerCard = ({ deals, onSelectDeal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto sliding timer (changes every 3.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % AD_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeAd = AD_SLIDES[currentSlide];
  const displayItems = deals && deals.length >= 3 ? deals.slice(0, 3) : activeAd.items;

  return (
    <section className="px-4 pt-2 pb-1 select-none" aria-label="Brand Advertising Banner">
      <div className="w-full relative overflow-hidden transition-all duration-700">
        {/* Top Ad Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[8px] font-black text-slate-900 uppercase tracking-wider">
                {activeAd.brand}
              </span>
              <span className="text-[8px] font-black text-slate-500 uppercase">
                SPONSORED
              </span>
            </div>
            <h3 className="text-slate-900 font-black text-[15px] tracking-tight leading-tight">
              {activeAd.title}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[8.5px] font-black text-amber-700 uppercase block">
              {activeAd.badge}
            </span>
          </div>
        </div>

        {/* 3-Column Advertised Products Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {displayItems.map((item, idx) => (
            <article 
              key={item.id || idx} 
              onClick={() => onSelectDeal && onSelectDeal(item)}
              className="flex flex-col group cursor-pointer active:scale-95 transition-transform" 
              aria-label={`Ad Product: ${item.name}`}
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={item.name} />
                <span className="absolute bottom-1 right-1 text-[8px] font-black text-slate-950 bg-amber-400 px-1 py-0.2 rounded">
                  {item.price}
                </span>
              </div>
              <p className="text-slate-900 text-[10px] font-bold text-center truncate px-0.5 pt-1">
                {item.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
