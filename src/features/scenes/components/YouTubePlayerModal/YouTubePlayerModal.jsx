import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Bookmark, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Send,
  MessageSquare
} from 'lucide-react';

export const YouTubePlayerModal = ({ 
  video, 
  onClose, 
  showToast, 
  allVideos = [], 
  isLiked = false, 
  onToggleLike 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [internalLiked, setInternalLiked] = useState(isLiked);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(video.comments || []);

  const currentlyLiked = onToggleLike ? isLiked : internalLiked;

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleLike = () => {
    if (onToggleLike) {
      onToggleLike(video);
    } else {
      setInternalLiked(!internalLiked);
    }
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
      if (showToast) showToast('Feedback shared');
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      if (showToast) showToast(`Subscribed to ${video.channelName}! 🔔`);
    } else {
      if (showToast) showToast(`Unsubscribed from ${video.channelName}`);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const added = {
      id: `c-${Date.now()}`,
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      text: newComment,
      likes: '0',
      time: 'Just now'
    };
    setCommentsList([added, ...commentsList]);
    setNewComment('');
    if (showToast) showToast('Comment posted! 💬');
  };

  const otherVideos = allVideos.filter((v) => v.id !== video.id);

  return (
    <div className="fixed inset-0 z-[250] bg-white flex flex-col font-sans select-none overflow-hidden animate-fade-in">
      {/* 1. Video Player Area (16:9) */}
      <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-opacity ${isPlaying ? 'opacity-90' : 'opacity-70'}`}
        />

        {/* Top Control Bar with Collapse Button */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent z-20">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all cursor-pointer"
            aria-label="Minimize video"
          >
            <ChevronDown size={22} />
          </button>
        </div>

        {/* Center Playback Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-8 z-10">
          <button
            type="button"
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
            className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 active:scale-90 transition-all cursor-pointer"
            aria-label="Skip backward 10s"
          >
            <RotateCcw size={18} />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} className="fill-white" /> : <Play size={24} className="fill-white ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
            className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 active:scale-90 transition-all cursor-pointer"
            aria-label="Skip forward 10s"
          >
            <RotateCw size={18} />
          </button>
        </div>

        {/* Bottom Scrubber & Time */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent z-20">
          <div className="relative w-full h-1 bg-white/30 rounded-full mb-1 cursor-pointer">
            <div
              className="h-full bg-[#800020] rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#800020] ring-2 ring-white" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/90 font-medium">
            <span>{Math.floor((progress * 0.18))} mins / {video.duration}</span>
            <button
              type="button"
              onClick={() => showToast && showToast('Toggled full screen mode')}
              className="text-white hover:scale-110 cursor-pointer"
            >
              <Maximize size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Video Details & Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-white">
        {/* Title & Metadata */}
        <div className="px-4 pt-3.5 pb-2">
          <h2 className="text-[17px] font-black text-slate-900 leading-snug">
            {video.title}
          </h2>
          <div 
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-[12px] text-slate-500 font-medium mt-1.5 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-100"
          >
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <span>{video.views}</span>
              <span>•</span>
              <span>{video.uploadedTime}</span>
              <span className="text-[#800020] font-black">#trending</span>
            </div>
            <p className={`mt-1 text-slate-600 ${showFullDesc ? '' : 'line-clamp-2'}`}>
              {video.description}
            </p>
            <span className="text-[11px] font-bold text-slate-900 mt-1 block">
              {showFullDesc ? 'Show less' : '...more'}
            </span>
          </div>
        </div>

        {/* Channel Row */}
        <div className="px-4 py-2 flex items-center justify-between border-y border-slate-100 my-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 shrink-0">
              <img
                src={video.channelAvatar}
                alt={video.channelName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-slate-900 leading-tight">
                {video.channelName}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {video.subscribers}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubscribe}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all active:scale-95 cursor-pointer ${
              isSubscribed
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-[#800020] text-white hover:bg-[#650019] shadow-sm'
            }`}
          >
            {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </div>

        {/* Action Buttons Horizontal Shelf */}
        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar">
          {/* Like & Dislike Joined Pill */}
          <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-l-full cursor-pointer transition-colors ${
                currentlyLiked ? 'text-[#800020] bg-white shadow-2xs' : 'text-slate-800 hover:bg-slate-200'
              }`}
            >
              <ThumbsUp size={15} className={currentlyLiked ? 'fill-[#800020]' : ''} />
              <span>{currentlyLiked ? 'Liked' : video.likes}</span>
            </button>
            <div className="w-[1px] h-4 bg-slate-300" />
            <button
              type="button"
              onClick={handleDislike}
              className={`px-2.5 py-1.5 text-xs rounded-r-full cursor-pointer transition-colors ${
                isDisliked ? 'text-[#800020] bg-white shadow-2xs' : 'text-slate-800 hover:bg-slate-200'
              }`}
            >
              <ThumbsDown size={15} className={isDisliked ? 'fill-[#800020]' : ''} />
            </button>
          </div>

          {/* Share */}
          <button
            type="button"
            onClick={() => showToast && showToast('Link copied to clipboard! 📋')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold shrink-0 cursor-pointer active:scale-95 transition-all"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={() => showToast && showToast('Downloading video for offline watch... ⬇️')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold shrink-0 cursor-pointer active:scale-95 transition-all"
          >
            <Download size={15} />
            <span>Download</span>
          </button>

          {/* Save to Playlist */}
          <button
            type="button"
            onClick={() => showToast && showToast('Saved to playlist 💾')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold shrink-0 cursor-pointer active:scale-95 transition-all"
          >
            <Bookmark size={15} />
            <span>Save</span>
          </button>
        </div>

        {/* Comments Box */}
        <div className="px-4 py-3 border-t border-slate-100">
          <div 
            onClick={() => setShowComments(!showComments)}
            className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200/60 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-900">
                Comments <span className="text-slate-500 font-normal">({commentsList.length})</span>
              </span>
              <MessageSquare size={14} className="text-slate-500" />
            </div>
            {commentsList[0] && (
              <div className="flex items-center gap-2">
                <img
                  src={commentsList[0].avatar}
                  alt={commentsList[0].user}
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
                <p className="text-[11.5px] text-slate-700 line-clamp-1">
                  <span className="font-bold text-slate-900 mr-1">{commentsList[0].user}:</span>
                  {commentsList[0].text}
                </p>
              </div>
            )}
          </div>

          {/* Expanded Comments Drawer */}
          {showComments && (
            <div className="mt-3 space-y-3 pt-2">
              {/* Add comment form */}
              <form onSubmit={handleAddComment} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#800020]"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-[#800020] text-white flex items-center justify-center hover:bg-[#650019] active:scale-95 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <Send size={14} />
                </button>
              </form>

              {/* List of comments */}
              <div className="space-y-3 pt-2">
                {commentsList.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.user}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11.5px] font-bold text-slate-900">{c.user}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-[12px] text-slate-700 mt-0.5 leading-snug">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Up Next Recommended Videos */}
        <div className="px-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 mb-3 tracking-tight">Up Next</h3>
          <div className="space-y-3">
            {otherVideos.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  if (showToast) showToast(`Playing next: ${v.title}`);
                }}
                className="flex items-start gap-3 cursor-pointer group active:scale-[0.99] transition-transform"
              >
                <div className="relative w-32 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-1 right-1 px-1 bg-black/80 text-white text-[9.5px] font-bold rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#800020] transition-colors">
                    {v.title}
                  </h5>
                  <p className="text-[10.5px] text-slate-500 mt-1 truncate">
                    {v.channelName} • {v.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
