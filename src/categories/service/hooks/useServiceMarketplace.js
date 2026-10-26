import { useState, useMemo, useEffect } from 'react';
import { serviceMarketplaceService } from '../services/serviceMarketplaceService.js';
import { SERVICE_CATEGORIES, EMERGENCY_FEE, STANDARD_PLATFORM_FEE } from '../constants/service.constants.js';

export const useServiceMarketplace = ({ showToast, initialSearchQuery = '' }) => {
  // Navigation View State: 'home' | 'category' | 'details' | 'provider' | 'booking' | 'tracking' | 'history'
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Gautam Nagar, Near Collectorate, Rayagada');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'under-300' | '300-800' | 'above-800'
  const [ratingFilter, setRatingFilter] = useState('all'); // 'all' | '4.5' | '4.0'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'price-asc' | 'price-desc' | 'rating'

  // Cart & Booking Form States
  const [bookingDate, setBookingDate] = useState('Today');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('09:00 AM - 11:00 AM');
  const [problemDescription, setProblemDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState('CITYFIRST');
  const [useCityOsCoins, setUseCityOsCoins] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // 'Cash' | 'UPI' | 'Online'

  // Load baseline data
  const allCategories = useMemo(() => serviceMarketplaceService.getCategories(), []);
  const allServices = useMemo(() => serviceMarketplaceService.getAllServices(), []);
  const allProviders = useMemo(() => serviceMarketplaceService.getProviders(), []);
  const [bookingsHistory, setBookingsHistory] = useState(() => serviceMarketplaceService.getBookings());

  // Filtered Services for Home or Search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allServices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.categoryId.toLowerCase().includes(q)
    );
  }, [searchQuery, allServices]);

  // Filtered Services for Active Category Page
  const categoryServices = useMemo(() => {
    if (!selectedCategory) return allServices;
    let list = allServices.filter((s) => s.categoryId === selectedCategory.id);

    // Apply Emergency Filter
    if (isEmergencyMode) {
      list = list.filter((s) => s.isEmergency);
    }

    // Apply Price Filter
    if (priceFilter === 'under-300') {
      list = list.filter((s) => s.price < 300);
    } else if (priceFilter === '300-800') {
      list = list.filter((s) => s.price >= 300 && s.price <= 800);
    } else if (priceFilter === 'above-800') {
      list = list.filter((s) => s.price > 800);
    }

    // Apply Rating Filter
    if (ratingFilter === '4.5') {
      list = list.filter((s) => s.rating >= 4.5);
    } else if (ratingFilter === '4.0') {
      list = list.filter((s) => s.rating >= 4.0);
    }

    // Apply Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, allServices, isEmergencyMode, priceFilter, ratingFilter, sortBy]);

  // Price Calculation for current booking
  const pricingSummary = useMemo(() => {
    const basePrice = selectedService?.price || 199;
    const emergencyCost = isEmergencyMode ? EMERGENCY_FEE : 0;
    const platformFee = STANDARD_PLATFORM_FEE;
    
    // Discount Calculation
    let discount = 0;
    if (appliedCoupon === 'CITYFIRST') {
      discount = Math.min(150, Math.round(basePrice * 0.2));
    } else if (appliedCoupon === 'CLEAN200' && basePrice >= 999) {
      discount = 200;
    } else if (appliedCoupon === 'PROFIX') {
      discount = Math.min(100, Math.round(basePrice * 0.15));
    }

    const coinsDiscount = useCityOsCoins ? 50 : 0;
    const total = Math.max(99, basePrice + emergencyCost + platformFee - discount - coinsDiscount);

    return {
      basePrice,
      emergencyCost,
      platformFee,
      discount,
      coinsDiscount,
      total,
    };
  }, [selectedService, isEmergencyMode, appliedCoupon, useCityOsCoins]);

  // View Navigation Handlers
  const openCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentView('category');
  };

  const openServiceDetails = (service) => {
    setSelectedService(service);
    setCurrentView('details');
  };

  const openProviderProfile = (provider) => {
    setSelectedProvider(provider);
    setCurrentView('provider');
  };

  const startBooking = (service) => {
    if (service) setSelectedService(service);
    setCurrentView('booking');
  };

  const openTracking = (booking) => {
    setActiveBooking(booking);
    setCurrentView('tracking');
  };

  const openHistory = () => {
    setBookingsHistory(serviceMarketplaceService.getBookings());
    setCurrentView('history');
  };

  const goBackToHome = () => {
    setCurrentView('home');
    setSearchQuery('');
  };

  // Booking Confirmation Handler
  const confirmBooking = () => {
    if (!selectedService) return null;

    const payload = {
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      categoryId: selectedService.categoryId,
      basePrice: pricingSummary.basePrice,
      totalAmount: pricingSummary.total,
      discount: pricingSummary.discount + pricingSummary.coinsDiscount,
      emergencyFee: pricingSummary.emergencyCost,
      scheduledDate: isEmergencyMode ? 'Immediately (15-30 mins)' : bookingDate,
      scheduledTimeSlot: isEmergencyMode ? 'Urgent Dispatch' : bookingTimeSlot,
      address: selectedAddress,
      problemDescription: problemDescription.trim() || 'General home service & diagnostics',
      photos: uploadedPhotos,
      paymentMethod,
    };

    const newBooking = serviceMarketplaceService.createBooking(payload);
    setActiveBooking(newBooking);
    setBookingsHistory(serviceMarketplaceService.getBookings());
    setCurrentView('tracking');

    if (showToast) {
      showToast(`🎉 Service Booked Successfully! Assigned to ${newBooking.provider.name}`);
    }
    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId, reason) => {
    const updated = serviceMarketplaceService.cancelBooking(bookingId, reason);
    if (updated) {
      setActiveBooking(updated);
      setBookingsHistory(serviceMarketplaceService.getBookings());
      if (showToast) showToast('Booking has been cancelled');
    }
  };

  return {
    currentView,
    setCurrentView,
    selectedCategory,
    selectedService,
    selectedProvider,
    activeBooking,
    searchQuery,
    setSearchQuery,
    isEmergencyMode,
    setIsEmergencyMode,
    selectedAddress,
    setSelectedAddress,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    setRatingFilter,
    sortBy,
    setSortBy,
    bookingDate,
    setBookingDate,
    bookingTimeSlot,
    setBookingTimeSlot,
    problemDescription,
    setProblemDescription,
    uploadedPhotos,
    setUploadedPhotos,
    appliedCoupon,
    setAppliedCoupon,
    useCityOsCoins,
    setUseCityOsCoins,
    paymentMethod,
    setPaymentMethod,
    allCategories,
    allServices,
    allProviders,
    searchResults,
    categoryServices,
    bookingsHistory,
    pricingSummary,
    openCategory,
    openServiceDetails,
    openProviderProfile,
    startBooking,
    openTracking,
    openHistory,
    goBackToHome,
    confirmBooking,
    cancelBooking,
  };
};
