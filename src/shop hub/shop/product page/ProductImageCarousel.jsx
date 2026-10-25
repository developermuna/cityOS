import React, { useState } from 'react';
import { Heart, Share2, Sparkles } from 'lucide-react';
import { ProgressiveImage } from './ProgressiveImage';

export const ProductImageCarousel = ({ 
  images = [], 
  isWishlisted, 
  onToggleWishlist, 
  showToast 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    '/assets/aistudio/WhatsApp_Image_2026-10-10_at_11.49.59_PM_1a4fc220.jpeg'
  ];

  return (
    <div className="relative w-full bg-white select-none">
      {/* Top Discount Notification Strip */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
          <Sparkles size={13} className="text-emerald-600 fill-emerald-600" />
          <span>Extra ₹3,000 off on select bank cards | Limited time deal</span>
        </div>
        <span className="text-[10px] font-black text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full">
          HOT
        </span>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full aspect-[4/4.5] max-h-[380px] flex items-center justify-center p-4 bg-white overflow-hidden">
        <ProgressiveImage
          src={displayImages[currentIndex]}
          alt={`Galaxy S25 product view ${currentIndex + 1}`}
          className="w-full h-full max-h-[350px] !bg-transparent"
          imgClassName="mix-blend-multiply"
          priority={currentIndex === 0}
          aspectRatio="aspect-[4/4.5]"
          objectFit="object-contain"
        />

        {/* 360 Degree View Badge */}
        <button
          type="button"
          onClick={() => showToast && showToast('Loading interactive 360° 3D viewer... 🔄')}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-200 text-slate-700 text-[10px] font-black flex items-center gap-1 shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
        >
          <span>360°</span>
          <span className="text-[8px] bg-slate-900 text-white px-1 rounded uppercase">3D</span>
        </button>

        {/* 1 / N Counter Pill (Bottom Left) */}
        <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10.5px] font-bold shadow-sm">
          {currentIndex + 1} / {displayImages.length}
        </div>

        {/* Floating Heart & Share (Bottom Right) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleWishlist}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-90 transition-transform cursor-pointer"
            aria-label="Save to wishlist"
          >
            <Heart 
              size={18} 
              className={isWishlisted ? 'fill-[#800020] text-[#800020]' : 'text-slate-700'} 
            />
          </button>

          <button
            type="button"
            onClick={() => showToast && showToast('Product link shared! 📋')}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-90 transition-transform cursor-pointer"
            aria-label="Share"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Carousel Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pb-3">
        {displayImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all cursor-pointer ${
              i === currentIndex
                ? 'w-5 h-1.5 bg-[#800020]'
                : 'w-1.5 h-1.5 bg-slate-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
