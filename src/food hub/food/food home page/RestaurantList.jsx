import React from 'react';
import { RestaurantCard } from '../../../common page/ui/RestaurantCard';

export const RestaurantList = ({ restaurants, onSelect, showToast, wishlistItems = [], onToggleWishlist }) => {
  if (restaurants.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        <p className="font-bold text-sm">No matching restaurants found</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      {restaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          showToast={showToast}
          isWishlisted={wishlistItems.some(w => String(w.id) === String(restaurant.id))}
          onToggleWishlist={onToggleWishlist}
          onSelect={(res) => {
            if (onSelect) onSelect(res);
            if (showToast) showToast(`Opened menu for ${res.name}`);
          }}
        />
      ))}
    </div>
  );
};
