import { useState, useMemo } from 'react';
import { rentalMarketplaceService } from '../services/rentalMarketplaceService';

export const useRentalFilter = (initialCategory = null, initialSearchQuery = '') => {
  const [category, setCategory] = useState(initialCategory || 'all');
  const [subcategory, setSubcategory] = useState('all');
  const [query, setQuery] = useState(initialSearchQuery);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [durationUnit, setDurationUnit] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredRentals = useMemo(() => {
    return rentalMarketplaceService.searchRentals({
      category: category === 'all' ? null : category,
      subcategory: subcategory === 'all' ? null : subcategory,
      query,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minRating,
      verifiedOnly,
      durationUnit: durationUnit === 'all' ? null : durationUnit,
      sortBy
    });
  }, [category, subcategory, query, priceRange, minRating, verifiedOnly, durationUnit, sortBy]);

  const resetFilters = () => {
    setCategory('all');
    setSubcategory('all');
    setQuery('');
    setPriceRange({ min: 0, max: 100000 });
    setMinRating(0);
    setVerifiedOnly(false);
    setDurationUnit('all');
    setSortBy('recommended');
  };

  return {
    category,
    setCategory,
    subcategory,
    setSubcategory,
    query,
    setQuery,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    verifiedOnly,
    setVerifiedOnly,
    durationUnit,
    setDurationUnit,
    sortBy,
    setSortBy,
    filteredRentals,
    resetFilters
  };
};
