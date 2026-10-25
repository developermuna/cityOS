import React from 'react';
import { Heart, Flame, Star, Zap, Sparkles } from 'lucide-react';
import { ProgressiveImage } from '../../../shop hub/shop/product page/ProgressiveImage';

export const PlayShortsSection = ({ 
  shorts, 
  onSelectShort, 
  onToggleLikeShort, 
  likedVideoIds = new Set(), 
  _showToast 
}) => {
  // Define row content dividers for each horizontal section
  const rowDividers = [
    { title: 'Trending Shorts', subtitle: 'Swipe horizontally for more', icon: Flame, badge: '🔥 HOT' },
    { title: 'Must Watch Video', subtitle: 'Handpicked viral shorts', icon: Star, badge: '⭐ MUST WATCH' },
    { title: 'Popular Highlights', subtitle: 'Trending across CityOS', icon: Zap, badge: '⚡ VIRAL' },
    { title: 'Editor\'s Picks', subtitle: 'Top recommended shorts', icon: Sparkles, badge: '🎯 FEATURED' }
  ];

  // Divide shorts into rows or distribute across the row dividers
  const rowItemsCount = 4; // 4 shorts per row in horizontal scroll
  const rows = [];
  for (let i = 0; i < shorts.length; i += rowItemsCount) {
    rows.push(shorts.slice(i, i + rowItemsCount));
  }

  // If there's only 1 chunk, replicate or loop so all 4 dividers have items
  if (rows.length === 1 && shorts.length > 0) {
    rows.push(shorts.slice().reverse());
  }

  return (
    <section className="py-2.5 px-3.5 bg-slate-50/80 border-b border-slate-200/60" aria-label="Short Videos Horizontal Rows">
      {rows.map((rowShorts, rowIndex) => {
        const divider = rowDividers[rowIndex % rowDividers.length];
        const IconComponent = divider.icon;

        return (
          <div key={rowIndex} className="mb-5 last:mb-2">
            {/* Top Content Divider for each row */}
            <div className="flex items-center justify-between mb-2.5 pt-1 border-t border-slate-200/60 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#800020] text-white flex items-center justify-center shadow-2xs shrink-0">
                  <IconComponent size={14} className="fill-white/20" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-[14px] font-black tracking-tight text-slate-900 leading-tight">
                      {divider.title}
                    </h2>
                    <span className="text-[9px] font-black text-[#800020] bg-[#800020]/10 px-1.5 py-0.5 rounded uppercase">
                      {divider.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {divider.subtitle}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold text-slate-400">
                Swipe ➔
              </span>
            </div>

            {/* Horizontal Scroll Row for Shorts (2-Column visible width per item) */}
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
              {rowShorts.map((short) => {
                const isLiked = likedVideoIds.has(short.id);

                return (
                  <article
                    key={short.id}
                    onClick={() => onSelectShort(short)}
                    className="relative w-[150px] aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 shrink-0 cursor-pointer group active:scale-[0.98] transition-all shadow-xs border border-slate-200/60 select-none"
                    aria-label={`Short video: ${short.title}`}
                  >
                    {/* Progressive Image Thumbnail with Lazy Loading */}
                    <ProgressiveImage
                      src={short.thumbnail}
                      alt={short.title}
                      aspectRatio="aspect-[9/16]"
                      className="w-full h-full"
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                      objectFit="object-cover"
                    />

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

                    {/* Category Pill Tag */}
                    {short.category && (
                      <span className="absolute top-2 left-2 z-[3] text-[9px] font-black text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                        {short.category}
                      </span>
                    )}

                    {/* Top Right Like Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLikeShort(short);
                      }}
                      className={`absolute top-2 right-2 z-[3] w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
                        isLiked 
                          ? 'bg-[#800020] text-white shadow-xs' 
                          : 'bg-black/40 text-white/90 hover:bg-black/60 border border-white/20'
                      }`}
                      aria-label={isLiked ? 'Unlike short' : 'Like short'}
                    >
                      <Heart size={14} className={isLiked ? 'fill-white stroke-white' : ''} />
                    </button>

                    {/* Bottom Title & Views */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-[3] text-white pointer-events-none">
                      <p className="text-[11.5px] font-bold line-clamp-2 leading-snug text-white drop-shadow-md">
                        {short.title}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[9.5px] text-white/80 font-medium">
                        <span className="truncate max-w-[80px]">{short.channelName}</span>
                        <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold shrink-0">{short.views}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};
