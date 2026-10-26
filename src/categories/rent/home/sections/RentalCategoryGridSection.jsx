import React from 'react';
import { RENTAL_CATEGORIES } from '../../constants/rental.constants';
import { RentalCategoryCard } from '../components/RentalCategoryCard';

export const RentalCategoryGridSection = ({ onSelectCategory }) => {
  return (
    <section className="px-4 py-2" aria-label="Rental Categories Grid">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Browse Rental Categories
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            Choose from properties, vehicles, tools, and gear
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {RENTAL_CATEGORIES.map((category) => (
          <RentalCategoryCard
            key={category.id}
            category={category}
            onClick={() => onSelectCategory && onSelectCategory(category)}
          />
        ))}
      </div>
    </section>
  );
};
