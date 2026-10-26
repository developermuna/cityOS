import React, { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Map, List, ShieldCheck } from 'lucide-react';
import { useRentalFilter } from '../../hooks/useRentalFilter';
import { RentalListingCard } from '../../components/RentalListingCard/RentalListingCard';
import { RentalFilterDrawer } from './components/RentalFilterDrawer';
import { RentalSortSelector } from './components/RentalSortSelector';

export const RentalCategoryPage = ({
  category,
  onBack,
  onSelectItem,
  onRentNow,
  onToggleWishlist,
  showToast
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
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
  } = useRentalFilter(category?.id || null);

  const subcategories = category?.subcategories || [
    'Houses', 'Flats', 'Bikes', 'Cars', 'Bed', 'Sofa', 'Tools', 'Cameras', 'Tents'
  ];

  return (
    <div className="w-full pb-20 font-sans bg-[#fff8f5] min-h-screen">
      {/* Top Navigation Bar with Back Button */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-slate-900 leading-tight">
              {category?.name || 'All Rental Listings'}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              {filteredRentals.length} available rentals in your area
            </p>
          </div>
        </div>

        {/* List / Map View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-100 space-y-2.5">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search in ${category?.shortName || 'rentals'}...`}
              className="bg-transparent w-full font-medium focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5200]" />
            <span>Filters</span>
          </button>
        </div>

        {/* Subcategories Horizontal Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          <button
            type="button"
            onClick={() => setSubcategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              subcategory === 'all'
                ? 'bg-[#FF5200] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Subcategories
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSubcategory(sub)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                subcategory.toLowerCase() === sub.toLowerCase()
                  ? 'bg-[#FF5200] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <RentalSortSelector sortBy={sortBy} onSelectSort={setSortBy} />
      </div>

      {/* Main Content: List or Map View */}
      <div className="p-4">
        {viewMode === 'map' ? (
          <div className="w-full h-[65vh] rounded-3xl overflow-hidden relative shadow-md border border-slate-200 bg-slate-900">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-85"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-2.5 text-xs text-slate-800 shadow-md flex items-center justify-between">
              <span className="font-bold">📍 Map View: {filteredRentals.length} listings</span>
              <span className="text-[10px] text-slate-500">Tap pin to open</span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                {filteredRentals.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectItem && onSelectItem(item)}
                    className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-lg text-left border border-white hover:scale-105 transition-transform"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-16 rounded-xl object-cover mb-1" />
                    <h5 className="text-[11px] font-bold text-slate-900 truncate">{item.title}</h5>
                    <span className="text-[10px] font-black text-[#FF5200]">₹{item.price}/{item.priceUnit}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredRentals.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm font-bold text-slate-600">No rental items match your filters</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting filters or changing your search terms.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-[#FF5200] text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredRentals.map((item) => (
                  <RentalListingCard
                    key={item.id}
                    item={item}
                    onSelect={onSelectItem}
                    onRentNow={onRentNow}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Modal Drawer */}
      <RentalFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        durationUnit={durationUnit}
        setDurationUnit={setDurationUnit}
        onReset={resetFilters}
      />
    </div>
  );
};
