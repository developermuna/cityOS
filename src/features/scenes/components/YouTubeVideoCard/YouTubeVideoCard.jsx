import React, { useState } from 'react';
import { MoreVertical, Bookmark, Share2, EyeOff, Flag, Heart } from 'lucide-react';

export const YouTubeVideoCard = ({ video, onSelect, showToast, isLiked = false, onToggleLike }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article 
      onClick={() => onSelect(video)}
      className="w-full bg-white mb-4 cursor-pointer select-none group relative"
      aria-label={`Video: ${video.title}`}
    >
      {/* 16:9 Video Thumbnail */}
      <div className="relative w-full aspect-video bg-slate-900 overflow-hidden shadow-2xs">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Duration / Live Badge */}
        <div className="absolute bottom-2 right-2">
          {video.isLive ? (
            <span className="px-1.5 py-0.5 bg-[#800020] text-white text-[10px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="px-1.5 py-0.5 bg-black/85 text-white text-[11px] font-bold rounded shadow-sm">
              {video.duration}
            </span>
          )}
        </div>
      </div>

      {/* Video Details Bottom Row */}
      <div className="flex items-start gap-3 px-3.5 pt-3 pb-1">
        {/* Channel Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-100 bg-slate-100 mt-0.5">
          <img
            src={video.channelAvatar}
            alt={video.channelName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-[14px] font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#800020] transition-colors">
            {video.title}
          </h4>
          <p className="text-[11.5px] text-slate-500 font-medium mt-1 truncate">
            {video.channelName} • {video.views} • {video.uploadedTime}
          </p>
        </div>

        {/* Action Buttons: Like Heart & 3 Dots More Menu */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleLike) onToggleLike(video);
            }}
            className={`p-1.5 rounded-full transition-all active:scale-90 cursor-pointer ${
              isLiked 
                ? 'text-[#800020] bg-[#800020]/10' 
                : 'text-slate-400 hover:text-[#800020]'
            }`}
            aria-label={isLiked ? 'Unlike video' : 'Like video'}
          >
            <Heart size={16} className={isLiked ? 'fill-[#800020]' : ''} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 text-slate-500 hover:text-slate-900 active:scale-90 transition-transform cursor-pointer"
            aria-label="Video options"
          >
            <MoreVertical size={16} />
          </button>

          {/* Quick Context Popover */}
          {showMenu && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-8 z-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 w-48 animate-fade-in"
            >
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  if (showToast) showToast('Saved to Watch Later 🕒');
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <Bookmark size={15} className="text-slate-500" />
                <span>Save to Watch Later</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  if (showToast) showToast('Video link copied to clipboard! 📋');
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <Share2 size={15} className="text-slate-500" />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  if (showToast) showToast(`We won't recommend this video again.`);
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <EyeOff size={15} className="text-slate-500" />
                <span>Not interested</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  if (showToast) showToast('Report submitted for review');
                }}
                className="w-full px-3 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
              >
                <Flag size={15} className="text-rose-500" />
                <span>Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
