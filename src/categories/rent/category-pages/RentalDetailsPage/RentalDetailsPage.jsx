import React from 'react';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';
import { RentalGallerySection } from './sections/RentalGallerySection';
import { RentalInformationSection } from './sections/RentalInformationSection';
import { RentalPricingSection } from './sections/RentalPricingSection';
import { RentalAvailabilitySection } from './sections/RentalAvailabilitySection';
import { RentalLocationSection } from './sections/RentalLocationSection';
import { RentalOwnerSection } from './sections/RentalOwnerSection';
import { RentalRulesSection } from './sections/RentalRulesSection';
import { RentalReviewsSection } from './sections/RentalReviewsSection';
import { RentNowButton } from './components/RentNowButton';

export const RentalDetailsPage = ({
  item,
  rentalDates,
  onDatesChange,
  onDurationChange,
  pricing,
  onBack,
  onRentNow,
  onContactOwner,
  onOpenReviewModal,
  onToggleWishlist,
  showToast
}) => {
  if (!item) return null;

  const isSaved = rentalMarketplaceService.isWishlisted(item.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out ${item.title} on cityOS Rentals!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      if (showToast) showToast('Listing link copied to clipboard!');
    }
  };

  return (
    <div className="w-full pb-24 font-sans bg-[#fff8f5] min-h-screen">
      {/* Top Bar with Back, Share, Wishlist */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onToggleWishlist && onToggleWishlist(item.id)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* 1. Gallery Section */}
      <RentalGallerySection images={item.images || [item.image]} title={item.title} />

      {/* 2. Information Section */}
      <RentalInformationSection item={item} />

      {/* 3. Pricing Section */}
      <RentalPricingSection item={item} pricing={pricing} />

      {/* 4. Availability & Dates Selector */}
      <RentalAvailabilitySection
        itemId={item.id}
        rentalDates={rentalDates}
        onDatesChange={onDatesChange}
        onDurationChange={onDurationChange}
      />

      {/* 5. Location & Pickup */}
      <RentalLocationSection item={item} />

      {/* 6. Owner Card */}
      <RentalOwnerSection owner={item.owner} onContact={onContactOwner} />

      {/* 7. Rules & Policies */}
      <RentalRulesSection item={item} />

      {/* 8. Renter Reviews */}
      <RentalReviewsSection item={item} onOpenReviewModal={onOpenReviewModal} />

      {/* Sticky Bottom Rent Now Button */}
      <RentNowButton
        price={item.price}
        priceUnit={item.priceUnit}
        deposit={item.securityDeposit}
        onRentNow={() => onRentNow && onRentNow(item)}
      />
    </div>
  );
};
