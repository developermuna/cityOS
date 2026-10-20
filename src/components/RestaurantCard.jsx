import React, { useState } from 'react';
import { Heart, MoreVertical } from 'lucide-react';
import { ChefHatIcon, BoltIcon } from './CustomIcons';

export const RestaurantCard = ({ restaurant, onSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = restaurant.images && restaurant.images.length > 0 
    ? restaurant.images 
    : [restaurant.image];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      onClick={() => onSelect && onSelect(restaurant)}
      className="w-full mb-6 cursor-pointer group select-none"
    >
      {/* Hero Image Container */}
      <div className="relative w-full h-[190px] rounded-3xl overflow-hidden bg-slate-200 shadow-sm border border-slate-100">
        <img
          src={images[currentImageIndex]}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Dark vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Image Carousel Dots (Top Center) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
          {[0, 1, 2, 3, 4].map((dotIndex) => (
            <div
              key={dotIndex}
              onClick={handleNextImage}
              className={`rounded-full transition-all ${
                dotIndex === currentImageIndex 
                  ? 'w-2 h-2 bg-white ring-1 ring-black/20' 
                  : 'w-1.5 h-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Top Right Action Icons: Heart & 3-Dots */}
        <div className="absolute top-2.5 right-3 flex items-center gap-2 z-10">
          {/* Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
            aria-label="Save restaurant"
          >
            <Heart
              size={16}
              className={`transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>

          {/* 3 Dots Menu Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Options for ${restaurant.name}`);
            }}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
            aria-label="More options"
          >
            <MoreVertical size={16} className="text-white" />
          </button>
        </div>

        {/* Bottom Left: Discount Badge */}
        {restaurant.discount && (
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white font-black text-[13px] tracking-tight drop-shadow-md">
            <span className="text-[#fc8019] inline-flex items-center">
              <BoltIcon size={14} className="fill-[#fc8019]" />
            </span>
            <span>{restaurant.discount}</span>
          </div>
        )}

        {/* Bottom Right: Delivery Time Badge */}
        {restaurant.deliveryTime && (
          <div className="absolute bottom-2.5 right-3 bg-slate-950/85 backdrop-blur-xs text-white text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full border border-white/10 shadow-sm uppercase">
            {restaurant.deliveryTime}
          </div>
        )}
      </div>

      {/* Details below image */}
      <div className="pt-2 px-1 flex flex-col">
        {/* Speciality Badge (Chef Hat or Bolt) */}
        <div className="flex items-center gap-2 flex-wrap">
          {restaurant.speciality && (
            <div className="flex items-center gap-1 text-[#8b5a2b] font-bold text-[11px]">
              <ChefHatIcon size={13} className="text-[#c27c38]" />
              <span>{restaurant.speciality}</span>
            </div>
          )}

          {restaurant.hasBolt && (
            <div className="flex items-center gap-1 text-[#fc8019] font-bold text-[11px]">
              <span className="font-extrabold">Bolt</span>
              <BoltIcon size={11} className="fill-[#fc8019]" />
              <span>{restaurant.boltText}</span>
            </div>
          )}
        </div>

        {/* Restaurant Name */}
        <h3 className="font-extrabold text-[17px] text-slate-900 tracking-tight mt-0.5 leading-snug group-hover:text-orange-600 transition-colors">
          {restaurant.name}
        </h3>

        {/* Rating & Distance */}
        <div className="flex items-center gap-1.5 mt-0.5 text-[12.5px] font-bold text-slate-800">
          {/* Green Star Pill */}
          <span className="w-4 h-4 rounded-full bg-[#0f8a65] text-white flex items-center justify-center text-[10px] font-black shrink-0">
            ★
          </span>
          <span className="font-black text-slate-900">{restaurant.rating}</span>
          <span className="text-slate-500 font-medium text-[12px]">({restaurant.reviewCount})</span>
          <span className="text-slate-400 font-normal">•</span>
          <span className="text-slate-700 font-semibold truncate text-[12px]">{restaurant.location}</span>
        </div>

        {/* Cuisines & Price for Two */}
        <div className="flex items-center gap-1 text-[12px] text-slate-500 font-medium mt-0.5">
          <span>{restaurant.cuisines}</span>
          <span>•</span>
          <span>{restaurant.priceForTwo}</span>
        </div>
      </div>
    </div>
  );
};
