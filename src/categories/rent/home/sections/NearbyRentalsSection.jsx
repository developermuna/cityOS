import React from 'react';
import { Navigation, ArrowRight } from 'lucide-react';
import { RentalListingCard } from '../../components/RentalListingCard/RentalListingCard';

export const NearbyRentalsSection = ({
  items,
  onSelectItem,
  onRentNow,
  onSeeAll,
  onToggleWishlist
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-2.5 px-4" aria-label="Nearby Rentals">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-emerald-600" />
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Rent Near Me
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Within 2 km with instant same-day pickup or dispatch
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {items.slice(0, 4).map((item) => (
          <RentalListingCard
            key={item.id}
            item={item}
            onSelect={onSelectItem}
            onRentNow={onRentNow}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};
