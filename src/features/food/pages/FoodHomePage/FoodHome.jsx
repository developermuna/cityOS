import React from 'react';
import { FirstBannerCard } from '@/features/food/sections/FirstBannerCardSection/FirstBannerCard';
import { Store99Section } from '@/common/components/Store99Section/Store99Section';
import { CashbackBanner } from '@/common/components/CashbackBanner/CashbackBanner';
import { RestaurantListHeader } from '@/features/food/sections/RestaurantListHeader/RestaurantListHeader';
import { RestaurantList } from '@/features/food/sections/RestaurantListSection/RestaurantList';

export const FoodHome = ({ 
  _activeTopFilter, 
  _setActiveTopFilter, 
  showToast, 
  cartItems, 
  handleAddToCart, 
  handleRemoveFromCart, 
  filteredRestaurants,
  wishlistItems = [],
  onToggleWishlist
}) => {
  return (
    <>
      <section aria-label="Offers">
        <FirstBannerCard onCardClick={(card) => showToast && showToast(`Selected ${card.fullName}`)} />
      </section>

      <section aria-label="Budget Stores">
        <Store99Section
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </section>

      <section aria-label="Cashback Promotion">
        <CashbackBanner onClaim={() => showToast && showToast("₹20 Free Cash activated for checkout!")} />
      </section>

      <section aria-label="Restaurant List">
        <RestaurantListHeader />
        <RestaurantList 
          restaurants={filteredRestaurants} 
          showToast={showToast} 
          wishlistItems={wishlistItems}
          onToggleWishlist={onToggleWishlist}
        />
      </section>
    </>
  );
};
