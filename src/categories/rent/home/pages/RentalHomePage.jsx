import React from 'react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';
import { RentalSearchHeroSection } from '../sections/RentalSearchHeroSection';
import { RentalFilterChips } from '../components/RentalFilterChips';
import { RentalCategoryGridSection } from '../sections/RentalCategoryGridSection';
import { RentalOffersSection } from '../sections/RentalOffersSection';
import { FeaturedRentalsSection } from '../sections/FeaturedRentalsSection';
import { PopularRentalsSection } from '../sections/PopularRentalsSection';
import { RentNearMeMapSection } from '../sections/RentNearMeMapSection';
import { NearbyRentalsSection } from '../sections/NearbyRentalsSection';
import { TrendingRentalsSection } from '../sections/TrendingRentalsSection';
import { RecommendedRentalsSection } from '../sections/RecommendedRentalsSection';
import { RecentlyViewedSection } from '../sections/RecentlyViewedSection';
import { RecentlyRentedSection } from '../sections/RecentlyRentedSection';

export const RentalHomePage = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedLocation,
  rentalDates,
  onDatesChange,
  onSelectCategory,
  onSelectItem,
  onRentNow,
  onOpenTracking,
  onSeeAllBookings,
  onToggleWishlist,
  showToast
}) => {
  const allRentals = rentalMarketplaceService.getAllRentals();
  const featured = rentalMarketplaceService.getFeaturedRentals();
  const popular = rentalMarketplaceService.getPopularRentals();
  const nearby = rentalMarketplaceService.getNearbyRentals();
  const recommended = rentalMarketplaceService.getRecommendedRentals();
  const trending = rentalMarketplaceService.getTrendingRentals();
  const recentlyViewed = rentalMarketplaceService.getRecentlyViewed();
  const recentlyRented = rentalMarketplaceService.getRecentlyRented();

  return (
    <div className="w-full pb-16 font-sans space-y-3 bg-[#fff8f5] min-h-screen">
      {/* 1. Hero Search */}
      <RentalSearchHeroSection
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        selectedLocation={selectedLocation}
        rentalDates={rentalDates}
        onDatesChange={onDatesChange}
        onSelectCategory={onSelectCategory}
      />

      {/* 2. Quick Category Filter Chips */}
      <RentalFilterChips
        activeCategory="all"
        onSelectCategory={(catId) => {
          if (catId === 'all') return;
          const found = rentalMarketplaceService.getCategoryById(catId);
          if (found) onSelectCategory(found);
        }}
      />

      {/* 3. Main 6 Categories Grid */}
      <RentalCategoryGridSection onSelectCategory={onSelectCategory} />

      {/* 4. Promotional Coupons & Offers */}
      <RentalOffersSection showToast={showToast} />

      {/* 5. Featured Listings */}
      <FeaturedRentalsSection
        items={featured}
        onSelectItem={onSelectItem}
        onRentNow={onRentNow}
        onSeeAll={() => onSelectCategory(null)}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 6. Popular Rentals */}
      <PopularRentalsSection
        items={popular}
        onSelectItem={onSelectItem}
        onRentNow={onRentNow}
        onSeeAll={() => onSelectCategory(null)}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 7. Live Map Interactive Section */}
      <RentNearMeMapSection
        items={allRentals}
        onSelectItem={onSelectItem}
        userLocation={selectedLocation}
      />

      {/* 8. Nearby Rentals */}
      <NearbyRentalsSection
        items={nearby}
        onSelectItem={onSelectItem}
        onRentNow={onRentNow}
        onSeeAll={() => onSelectCategory(null)}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 9. Trending Rentals */}
      <TrendingRentalsSection
        items={trending}
        onSelectItem={onSelectItem}
        onRentNow={onRentNow}
        onSeeAll={() => onSelectCategory(null)}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 10. Recommended */}
      <RecommendedRentalsSection
        items={recommended}
        onSelectItem={onSelectItem}
        onRentNow={onRentNow}
        onSeeAll={() => onSelectCategory(null)}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 11. Recently Viewed (if any) */}
      {recentlyViewed.length > 0 && (
        <RecentlyViewedSection
          items={recentlyViewed}
          onSelectItem={onSelectItem}
          onRentNow={onRentNow}
          onToggleWishlist={onToggleWishlist}
        />
      )}

      {/* 12. Recently Rented Bookings */}
      {recentlyRented.length > 0 && (
        <RecentlyRentedSection
          bookings={recentlyRented}
          onOpenTracking={onOpenTracking}
          onSeeAll={onSeeAllBookings}
          onReRent={(bk) => {
            const item = rentalMarketplaceService.getRentalById(bk.itemId);
            if (item) onRentNow(item);
          }}
        />
      )}
    </div>
  );
};
