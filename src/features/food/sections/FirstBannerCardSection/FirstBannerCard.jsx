import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { topOfferCards } from '@/data/mockData';

export const FirstBannerCard = ({ onCardClick }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full pt-3 mb-2 select-none" aria-label="Top Offers">
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        {topOfferCards.map((card) => {
          const isFav = favorites[card.id];
          return (
            <article
              key={card.id}
              onClick={() => onCardClick && onCardClick(card)}
              className="w-[124px] shrink-0 cursor-pointer group flex flex-col"
              aria-label={`Offer: ${card.title}`}
            >
              {/* Card Image Container */}
              <div className="relative w-[124px] h-[110px] rounded-2xl overflow-hidden shadow-2xs">
                <img
                  src={card.image}
                  alt={card.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Dark Gradient bottom for badge readability */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                {/* Favorite Heart Top Right */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, card.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-10"
                  aria-label="Save to favorites"
                >
                  <Heart
                    size={14}
                    className={`transition-colors ${
                      isFav ? 'fill-[#800020] text-[#800020]' : 'text-white'
                    }`}
                  />
                </button>

                {/* Offer Badge Overlay on Bottom */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/85 backdrop-blur-xs rounded-md px-1.5 py-0.5 flex items-center justify-between text-white">
                  <div className="flex flex-col">
                    <span className="text-[7.5px] font-bold text-slate-300 uppercase leading-none">ITEMS</span>
                    <span className="text-[9.5px] font-black text-white leading-none mt-0.5">{card.badge.replace(' | AD', '')}</span>
                  </div>
                  {card.isAd && (
                    <span className="text-[7.5px] font-bold text-slate-400 opacity-90 pl-1 border-l border-white/20">
                      AD
                    </span>
                  )}
                </div>
              </div>

              {/* Card Details Under Image */}
              <div className="pt-2 flex flex-col">
                <h4 className="font-extrabold text-[12.5px] text-slate-900 tracking-tight truncate leading-tight">
                  {card.title}
                </h4>

                {/* Rating & Delivery Time */}
                <div className="flex items-center gap-1 mt-0.5 text-[11px] font-bold text-slate-800">
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#0f8a65] text-white text-[9px] rounded-full shrink-0 font-bold">
                    ★
                  </span>
                  <span className="text-slate-800 font-extrabold">{card.rating}</span>
                  <span className="text-slate-400 font-normal">•</span>
                  <span className="text-slate-600 font-medium text-[10.5px] truncate">{card.time}</span>
                </div>

                {/* Cuisine */}
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                  {card.cuisine}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
