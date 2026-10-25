import React from 'react';
import { MoreVertical } from 'lucide-react';

export const YouTubeShortsShelf = ({ shorts, onSelectShort, showToast }) => {
  return (
    <section className="py-4 border-b-4 border-slate-100 bg-white" aria-label="YouTube Shorts Shelf">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 mb-3">
        <div className="flex items-center gap-2">
          {/* Shorts Logo */}
          <div className="w-5 h-6 bg-[#800020] rounded-md flex items-center justify-center shadow-2xs rotate-2">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5" />
          </div>
          <h3 className="text-[17px] font-black tracking-tight text-slate-900 font-sans">
            Shorts
          </h3>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-3.5 pb-1">
        {shorts.map((short) => (
          <article
            key={short.id}
            onClick={() => onSelectShort(short)}
            className="w-[140px] shrink-0 flex flex-col group cursor-pointer active:scale-[0.98] transition-transform select-none"
            aria-label={`Short: ${short.title}`}
          >
            {/* 9:16 Vertical Video Frame */}
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 shadow-sm border border-slate-100">
              <img
                src={short.thumbnail}
                alt={short.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

              {/* Top 3 dots */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (showToast) showToast(`Options for ${short.title}`);
                }}
                className="absolute top-2 right-1.5 p-1 text-white/90 hover:text-white"
                aria-label="More options"
              >
                <MoreVertical size={16} />
              </button>

              {/* Bottom text info */}
              <div className="absolute bottom-2.5 left-2.5 right-2 text-white">
                <p className="text-[12px] font-bold line-clamp-2 leading-tight drop-shadow-md text-white/95">
                  {short.title}
                </p>
                <span className="text-[10px] font-semibold text-white/80 mt-1 block">
                  {short.views} views
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
