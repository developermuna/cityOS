import React, { useState } from 'react';
import { ArrowLeft, Heart, Trash2, Play, Flame } from 'lucide-react';

export const LikedVideosModal = ({ 
  likedVideos = [], 
  onClose, 
  onSelectVideo, 
  onSelectShort, 
  onRemoveLiked, 
  showToast 
}) => {
  const [filterType, setFilterType] = useState('all');

  const filtered = likedVideos.filter((item) => {
    if (filterType === 'shorts') return item.isShort;
    if (filterType === 'long') return !item.isShort;
    return true;
  });

  return (
    <div className="fixed inset-0 z-[270] bg-white flex flex-col font-sans select-none overflow-hidden animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-2xs"
            aria-label="Back to Play page"
          >
            <ArrowLeft size={20} className="stroke-[2.5]" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Heart size={16} className="fill-[#800020] text-[#800020]" />
              <h2 className="text-[17px] font-black text-slate-900 leading-tight">
                Liked Videos
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {likedVideos.length} saved {likedVideos.length === 1 ? 'video' : 'videos'}
            </p>
          </div>
        </div>

        {/* Clear all or counter pill */}
        <span className="text-[10px] font-black uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2.5 py-1 rounded-full">
          Play Library
        </span>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#800020] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All ({likedVideos.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('shorts')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filterType === 'shorts'
              ? 'bg-[#800020] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Shorts ({likedVideos.filter(v => v.isShort).length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('long')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filterType === 'long'
              ? 'bg-[#800020] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Long Videos ({likedVideos.filter(v => !v.isShort).length})
        </button>
      </div>

      {/* Scrollable Liked Items List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2.5 pb-24">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                if (item.isShort) {
                  onSelectShort(item);
                } else {
                  onSelectVideo(item);
                }
              }}
              className="flex items-center gap-3 p-2.5 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl shadow-xs transition-all cursor-pointer group select-none active:scale-[0.99]"
            >
              {/* Thumbnail Container */}
              <div className="relative w-28 h-18 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge (Short vs Long) */}
                <div className="absolute bottom-1 right-1">
                  {item.isShort ? (
                    <span className="px-1.5 py-0.5 bg-[#800020] text-white text-[9px] font-black rounded uppercase flex items-center gap-0.5 shadow-xs">
                      <Flame size={10} className="fill-white" />
                      SHORT
                    </span>
                  ) : (
                    <span className="px-1 py-0.5 bg-black/80 text-white text-[9px] font-bold rounded shadow-xs">
                      {item.duration || '12:00'}
                    </span>
                  )}
                </div>

                {/* Play Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Play size={20} className="fill-white" />
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-[13px] font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#800020] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                  {item.channelName} • {item.views}
                </p>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveLiked(item.id);
                  if (showToast) showToast('Removed from Liked Videos');
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center active:scale-90 transition-all cursor-pointer shrink-0"
                aria-label="Remove from liked"
              >
                <Trash2 size={15} />
              </button>
            </article>
          ))
        ) : (
          <div className="py-20 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#800020]/10 flex items-center justify-center mx-auto mb-3 text-[#800020]">
              <Heart size={28} className="fill-[#800020]" />
            </div>
            <h4 className="text-base font-bold text-slate-800">No liked videos yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto">
              Tap the heart icon on any short or long video to save it to your personal library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
