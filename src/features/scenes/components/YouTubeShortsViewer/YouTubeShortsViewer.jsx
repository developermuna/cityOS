import React, { useState } from 'react';
import { 
  X, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Music2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

export const YouTubeShortsViewer = ({ 
  short, 
  onClose, 
  showToast, 
  allShorts = [], 
  likedVideoIds = new Set(), 
  onToggleLikeShort 
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = allShorts.findIndex(s => s.id === short.id);
    return idx >= 0 ? idx : 0;
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentShort = allShorts[currentIndex] || short;
  const isCurrentLiked = onToggleLikeShort ? likedVideoIds.has(currentShort.id) : isLiked;

  const handleNext = () => {
    if (currentIndex < allShorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsLiked(false);
      setIsDisliked(false);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsLiked(false);
      setIsDisliked(false);
    }
  };

  const handleLike = () => {
    if (onToggleLikeShort) {
      onToggleLikeShort(currentShort);
    } else {
      setIsLiked(!isLiked);
    }
    if (isDisliked) setIsDisliked(false);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      if (showToast) showToast(`Subscribed to ${currentShort.channelName}! 🔔`);
    } else {
      if (showToast) showToast(`Unsubscribed from ${currentShort.channelName}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[260] bg-black flex flex-col font-sans select-none overflow-hidden animate-fade-in">
      {/* Video Fullscreen Visual */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={currentShort.thumbnail}
          alt={currentShort.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            aria-label="Close shorts"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full backdrop-blur-md text-white/90 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#800020] animate-pulse" />
            <span>Shorts</span>
          </div>
        </div>

        {/* Right Floating Action Bar */}
        <div className="absolute right-3.5 bottom-20 flex flex-col items-center gap-5 z-20">
          {/* Like */}
          <button
            type="button"
            onClick={handleLike}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isCurrentLiked ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/40' : 'bg-black/40 hover:bg-black/60'
            }`}>
              <ThumbsUp size={20} className={isCurrentLiked ? 'fill-white' : ''} />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">
              {isCurrentLiked ? 'Liked' : currentShort.likes}
            </span>
          </button>

          {/* Dislike */}
          <button
            type="button"
            onClick={() => {
              setIsDisliked(!isDisliked);
              if (!isDisliked) setIsLiked(false);
            }}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isDisliked ? 'bg-[#800020] text-white' : 'bg-black/40 hover:bg-black/60'
            }`}>
              <ThumbsDown size={20} className={isDisliked ? 'fill-white' : ''} />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">Dislike</span>
          </button>

          {/* Comments */}
          <button
            type="button"
            onClick={() => showToast && showToast(`Viewing comments for ${currentShort.title}`)}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-md">
              <MessageSquare size={20} />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">{currentShort.commentsCount}</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={() => showToast && showToast('Short link copied! 📋')}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-md">
              <Share2 size={20} />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">Share</span>
          </button>

          {/* Audio Spinner Disc */}
          <div className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden animate-spin shadow-lg mt-2">
            <img
              src={currentShort.channelAvatar}
              alt="Song"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Left Info Details */}
        <div className="absolute left-4 right-18 bottom-6 z-20 text-white">
          {/* Channel Row */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <img
              src={currentShort.channelAvatar}
              alt={currentShort.channelName}
              className="w-8 h-8 rounded-full border border-white/60 object-cover"
            />
            <span className="text-xs font-black drop-shadow-md">
              @{currentShort.channelName}
            </span>
            <button
              type="button"
              onClick={handleSubscribe}
              className={`px-3 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                isSubscribed 
                  ? 'bg-white/20 text-white backdrop-blur-md' 
                  : 'bg-[#800020] text-white hover:bg-[#650019] shadow-sm'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Title */}
          <p className="text-sm font-bold leading-snug line-clamp-2 drop-shadow-md mb-2">
            {currentShort.title}
          </p>

          {/* Song Audio Track */}
          <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
            <Music2 size={13} className="animate-pulse" />
            <span className="truncate">{currentShort.song}</span>
          </div>
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 opacity-60 hover:opacity-100 transition-opacity">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 active:scale-95 cursor-pointer backdrop-blur-md"
              aria-label="Previous short"
            >
              <ChevronUp size={20} />
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 active:scale-95 cursor-pointer backdrop-blur-md"
            aria-label="Next short"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
