import React from 'react';
import { ServiceCategoriesSection } from '../sections/ServiceCategoriesSection';
import { PopularServicesSection } from '../sections/PopularServicesSection';
import { RecommendedServicesSection } from '../sections/RecommendedServicesSection';
import { NearbyProvidersSection } from '../sections/NearbyProvidersSection';
import { OffersCouponsSection } from '../sections/OffersCouponsSection';
import { FirstBannerCard } from '@/features/service/sections/FirstBannerCardSection/FirstBannerCard';
import { ServiceList } from '@/features/service/sections/ServiceListSection/ServiceList';

export const ServiceHomePage = ({
  allCategories,
  allServices,
  allProviders,
  searchResults,
  searchQuery,
  setSearchQuery,
  openCategory,
  openServiceDetails,
  openProviderProfile,
  startBooking,
  showToast,
  onAddToCart,
}) => {
  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-300">
      {/* If user is typing in top search, display search results directly */}
      {searchQuery && searchQuery.trim() ? (
        <section className="px-4 space-y-3" aria-label="Search Results">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Found {searchResults.length} services matching "{searchQuery}"
            </h3>
            {setSearchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#606C38] font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 text-center bg-white/90 backdrop-blur-sm rounded-2xl border border-[#606C38]/20 shadow-xs">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm font-bold text-slate-800">No matching services found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for electrician, AC repair, plumbing, cleaning or carpenter
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {searchResults.map((service) => (
                <div
                  key={service.id}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:border-[#606C38]/40 shadow-xs flex items-center justify-between gap-3 transition-all"
                >
                  <div 
                    onClick={() => openServiceDetails(service)}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate hover:text-[#606C38] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className="font-black text-[#606C38]">₹{service.price}</span>
                        <span className="text-amber-600 font-bold">★ {service.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => startBooking(service)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#606C38] hover:bg-[#4A5626] text-white text-xs font-bold shrink-0 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* 1. Existing CityOS Service Banner Slider */}
          <FirstBannerCard showToast={showToast} />

          {/* 2. All 16 Service Categories */}
          <ServiceCategoriesSection
            categories={allCategories}
            onSelectCategory={openCategory}
          />

          {/* 3. Popular Services */}
          <PopularServicesSection
            services={allServices}
            onSelectService={openServiceDetails}
            onBookNow={startBooking}
          />

          {/* 4. Offers & Coupons Section */}
          <OffersCouponsSection
            appliedCoupon="CITYFIRST"
            onApplyCoupon={(c) => showToast && showToast(`Coupon ${c} applied!`)}
            showToast={showToast}
          />

          {/* 5. Recommended Services */}
          <RecommendedServicesSection
            services={allServices}
            onSelectService={openServiceDetails}
            onBookNow={startBooking}
          />

          {/* 6. Nearby Service Providers */}
          <NearbyProvidersSection
            providers={allProviders}
            onSelectProvider={openProviderProfile}
            onBookDirect={(provider) => {
              const matchedService = allServices.find((s) => s.providerId === provider.id) || allServices[0];
              startBooking(matchedService);
            }}
          />

          {/* 7. Existing CityOS Top Rated Service List */}
          <ServiceList showToast={showToast} onAddToCart={onAddToCart} />
        </>
      )}
    </div>
  );
};
