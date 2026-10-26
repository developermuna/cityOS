import React, { useState } from 'react';

export const RentalImageGallery = ({ images = [], title }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1545324418-f1d3c5b53574?w=800'];

  return (
    <div className="w-full space-y-2">
      {/* Main Image */}
      <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 relative shadow-sm">
        <img
          src={displayImages[activeIdx]}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {activeIdx + 1} / {displayImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {displayImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                activeIdx === i ? 'border-[#FF5200] scale-95' : 'border-transparent opacity-70'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
