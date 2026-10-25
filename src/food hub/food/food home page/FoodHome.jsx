import React from 'react';
import { FirstBannerCard } from './1st banner card';
import { Store99Section } from '../../../common page/ui/Store99Section';
import { CashbackBanner } from '../../../common page/ui/CashbackBanner';
import { RestaurantListHeader } from './RestaurantListHeader';
import { RestaurantList } from './RestaurantList';

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
