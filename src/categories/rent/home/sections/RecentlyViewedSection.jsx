import React from 'react';
import { Eye } from 'lucide-react';
import { RentalListingCard } from '../../components/RentalListingCard/RentalListingCard';

export const RecentlyViewedSection = ({
  items,
  onSelectItem,
  onRentNow,
  onToggleWishlist
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-2.5 px-4" aria-label="Recently Viewed Rentals">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Eye className="w-4 h-4 text-slate-600" />
        <h3 className="text-sm font-black text-slate-900 tracking-tight">
          Recently Viewed
        </h3>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1">
        {items.map((item) => (
          <div key={item.id} className="w-64 shrink-0">
            <RentalListingCard
              item={item}
              onSelect={onSelectItem}
              onRentNow={onRentNow}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
