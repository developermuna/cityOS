import React from 'react';

export const ServiceCategoryPage = ({
  category,
  categoryServices,
  allProviders,
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
  sortBy,
  setSortBy,
  isEmergencyMode,
  setIsEmergencyMode,
  onSelectService,
  onBookNow,
  onSelectProvider,
  onBack,
}) => {
  const currentProviders = allProviders.filter(
    (p) => p.skills.some((sk) => sk.toLowerCase().includes(category.name.toLowerCase().slice(0, 4)))
  );

  return (
    <div className="space-y-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">{category.icon}</span>
            <h2 className="text-lg font-black text-slate-900 truncate">
              {category.name}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {categoryServices.length} verified packages available in Rayagada
          </p>
        </div>
      </div>



      {/* Filters and Sort Row */}
      <div className="space-y-2.5">
        {/* Price Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 self-center uppercase mr-1">Price:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'under-300', label: '< ₹300' },
            { id: '300-800', label: '₹300 - ₹800' },
            { id: 'above-800', label: '> ₹800' },
          ].map((pf) => (
            <button
              key={pf.id}
              type="button"
              onClick={() => setPriceFilter(pf.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                priceFilter === pf.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pf.label}
            </button>
          ))}
        </div>

        {/* Rating Filters & Sort */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 self-center uppercase mr-1">Rating:</span>
            {[
              { id: 'all', label: 'All' },
              { id: '4.5', label: '★ 4.5+' },
              { id: '4.0', label: '★ 4.0+' },
            ].map((rf) => (
              <button
                key={rf.id}
                type="button"
                onClick={() => setRatingFilter(rf.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  ratingFilter === rf.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-2 py-1 text-slate-800 focus:outline-hidden"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Services List */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-slate-900">
          Available {category.name} Packages
        </h3>

        {categoryServices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <span className="text-3xl block mb-2">📋</span>
            <p className="text-sm font-bold text-slate-800">No services match your filters</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the price or rating filter</p>
            <button
              onClick={() => {
                setPriceFilter('all');
                setRatingFilter('all');
                setIsEmergencyMode(false);
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-[#606C38] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          categoryServices.map((service) => (
            <div
              key={service.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div 
                onClick={() => onSelectService(service)}
                className="flex gap-3 cursor-pointer"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                    <span className="font-bold text-amber-600">★ {service.rating}</span>
                    <span>•</span>
                    <span>⏱ {service.duration}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{service.warranty}</span>
                  </div>
                </div>
              </div>

              {/* What's included preview */}
              <div className="bg-slate-50 p-2 rounded-xl text-[11px] text-slate-600 flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="truncate">Includes: {service.included.slice(0, 2).join(', ')}</span>
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-base font-black text-slate-900">₹{service.price}</span>
                  <span className="text-[10px] text-slate-400 font-medium ml-1">standard fee</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookNow(service)}
                    className="px-4 py-1.5 rounded-xl bg-[#606C38] hover:bg-[#4A5626] text-white text-xs font-black shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Category-Specific Verified Providers */}
      {currentProviders.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-black text-slate-900">
            Verified {category.name} Specialists in Rayagada
          </h3>
          <div className="space-y-2">
            {currentProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => onSelectProvider(provider)}
                className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{provider.name}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded-sm font-semibold">Verified</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{provider.experience} • {provider.completedJobs}+ jobs</p>
                    <span className="text-[11px] text-amber-600 font-bold">★ {provider.rating} ({provider.reviewsCount} reviews)</span>
                  </div>
                </div>
                <span className="text-xs text-[#606C38] font-bold">Profile →</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
