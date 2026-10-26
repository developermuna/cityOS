import React from 'react';
import { ThumbsUp, ArrowRight } from 'lucide-react';
import { RentalListingCard } from '../../components/RentalListingCard/RentalListingCard';

export const RecommendedRentalsSection = ({
  items,
  onSelectItem,
  onRentNow,
  onSeeAll,
  onToggleWishlist
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-2.5 px-4" aria-label="Recommended Rentals">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4 text-blue-600" />
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Recommended For You
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Curated by cityOS smart rental matching algorithm
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
        {items.slice(0, 3).map((item) => (
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
