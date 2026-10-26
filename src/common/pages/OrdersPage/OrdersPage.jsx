import React, { useState, useMemo } from 'react';
import { ordersData } from './ordersData';
import { OrdersHeader } from './OrdersHeader';
import { OrdersBanner } from './OrdersBanner';
import { OrdersSearchFilters } from './OrdersSearchFilters';
import { OrderItemCard } from './OrderItemCard';
import { PackageOpen } from 'lucide-react';
import { ServiceHistoryPage } from '@/categories/service/history/pages/ServiceHistoryPage';
import { serviceMarketplaceService } from '@/categories/service/services/serviceMarketplaceService';
import { ServiceTrackingPage } from '@/categories/service/category-pages/ServiceTrackingPage/ServiceTrackingPage';
import { RentalHistoryPage } from '@/categories/rent/history/pages/RentalHistoryPage';
import { rentalMarketplaceService } from '@/categories/rent/services/rentalMarketplaceService';
import { RentalTrackingPage } from '@/categories/rent/category-pages/RentalTrackingPage/RentalTrackingPage';

export const OrdersPage = ({ 
  activeHub = 'shop', 
  onClose, 
  showToast 
}) => {
  const [activeTrackingBooking, setActiveTrackingBooking] = useState(null);

  // Normalize hub to match data keys
  const normalizedHub = (() => {
    switch (activeHub) {
      case 'ride': return 'ride';
      case 'service': return 'service';
      case 'travel': return 'travel';
      case 'rent': return 'rent';
      case 'food':
      case 'dineout': return 'food';
      case 'grocery':
      case 'instamart': return 'grocery';
      case 'cityos': return 'cityos';
      case 'shop':
      default: return 'shop';
    }
  })();

  if (normalizedHub === 'service') {
    if (activeTrackingBooking) {
      return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto no-scrollbar">
          <ServiceTrackingPage
            booking={activeTrackingBooking}
            onCancelBooking={(id, reason) => {
              serviceMarketplaceService.cancelBooking(id, reason);
              setActiveTrackingBooking(null);
              if (showToast) showToast('Booking cancelled');
            }}
            onGoHome={() => setActiveTrackingBooking(null)}
            showToast={showToast}
          />
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[100] bg-[#f7f9f2] flex flex-col font-sans select-none overflow-y-auto no-scrollbar">
        <ServiceHistoryPage
          bookings={serviceMarketplaceService.getBookings()}
          onTrackBooking={(bk) => setActiveTrackingBooking(bk)}
          onRebook={(bk) => {
            if (showToast) showToast(`Rebooking initiated for ${bk.serviceTitle}`);
          }}
          onBack={onClose}
          showToast={showToast}
        />
      </div>
    );
  }

  if (normalizedHub === 'rent') {
    if (activeTrackingBooking) {
      return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto no-scrollbar">
          <RentalTrackingPage
            booking={activeTrackingBooking}
            onBack={() => setActiveTrackingBooking(null)}
            onCompleteReturn={() => {
              if (showToast) showToast('Return processed');
            }}
            showToast={showToast}
          />
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[100] bg-[#fff8f5] flex flex-col font-sans select-none overflow-y-auto no-scrollbar">
        <RentalHistoryPage
          onTrackBooking={(bk) => setActiveTrackingBooking(bk)}
          onBack={onClose}
        />
      </div>
    );
  }

  const currentData = ordersData[normalizedHub] || ordersData.shop;
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on active pill and search query
  const filteredItems = useMemo(() => {
    return currentData.items.filter((item) => {
      // Category tab filter
      if (activeFilter.toLowerCase() !== 'all') {
        if (item.filterCategory?.toLowerCase() !== activeFilter.toLowerCase()) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDetail = item.detail?.toLowerCase().includes(q);
        const matchesStatus = item.status?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDetail && !matchesStatus) {
          return false;
        }
      }

      return true;
    });
  }, [currentData.items, activeFilter, searchQuery]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col font-sans select-none overflow-hidden animate-fade-in">
      {/* 1. Header with back button */}
      <OrdersHeader 
        title={currentData.title} 
        onBack={onClose} 
      />

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-white">
        {/* 2. Top Banner Card */}
        <OrdersBanner 
          banner={currentData.banner} 
          showToast={showToast} 
        />

        {/* 3. Search Bar & Filter Tabs */}
        <OrdersSearchFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder={currentData.searchPlaceholder}
          filterTabs={currentData.filterTabs}
          activeFilter={activeFilter}
          onSelectFilter={(tab) => {
            setActiveFilter(tab);
            if (showToast) showToast(`Filtered by: ${tab}`);
          }}
          onOpenFilters={() => {
            if (showToast) showToast('Filter drawer options');
          }}
        />

        {/* 4. Orders List */}
        <div className="divide-y divide-slate-100">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <OrderItemCard 
                key={item.id} 
                item={item} 
                showToast={showToast}
                onSelect={(order) => {
                  if (showToast) showToast(`Viewing order tracking: ${order.title}`);
                }}
              />
            ))
          ) : (
            <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <PackageOpen size={28} />
              </div>
              <h4 className="text-[15px] font-black text-slate-800">No orders found</h4>
              <p className="text-[12px] text-slate-400 font-medium mt-1 max-w-[220px]">
                Try searching with a different keyword or resetting your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl border border-[#800020] text-[#800020] text-[12px] font-bold hover:bg-[#800020]/5 active:scale-95 transition-all cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
