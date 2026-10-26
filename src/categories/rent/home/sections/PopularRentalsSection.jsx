import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { RentalListingCard } from '../../components/RentalListingCard/RentalListingCard';

export const PopularRentalsSection = ({
  items,
  onSelectItem,
  onRentNow,
  onSeeAll,
  onToggleWishlist
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-2.5 px-4" aria-label="Popular Rentals">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-600" />
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Most Popular Rentals
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Highest booked vehicles, flats & professional equipment
            </p>
          </div>
        </div>

        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-xs font-bold text-[#FF5200] hover:underline flex items-center gap-0.5 shrink-0"
          >
            See All <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.slice(0, 4).map((item) => (
          <RentalListingCard
            key={item.id}
            item={item}
            variant="horizontal"
            onSelect={onSelectItem}
            onRentNow={onRentNow}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};
