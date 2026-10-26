import { useState, useEffect, useCallback } from 'react';
import { rentalMarketplaceService } from '../services/rentalMarketplaceService';

export const useRentalMarketplace = ({ showToast, initialSearchQuery = '' } = {}) => {
  // Navigation / View state
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedLocation, setSelectedLocation] = useState('Rayagada Central, Odisha');
  const [rentalDates, setRentalDates] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    duration: 1,
    unit: 'day'
  });

  // Booking Flow state
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'delivery'
  const [deliveryAddress, setDeliveryAddress] = useState('Station Road, Rayagada');
  const [hasDriver, setHasDriver] = useState(false);
  const [hasOperator, setHasOperator] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [useCoins, setUseCoins] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [bookingNotes, setBookingNotes] = useState('');

  // Modals state
  const [reviewModalItem, setReviewModalItem] = useState(null);
  const [contactOwnerModal, setContactOwnerModal] = useState(null);
  const [invoiceModalBooking, setInvoiceModalBooking] = useState(null);
  const [extendModalBooking, setExtendModalBooking] = useState(null);
  const [issueModalBooking, setIssueModalBooking] = useState(null);

  // Wishlist state trigger
  const [wishlistVersion, setWishlistVersion] = useState(0);

  // Synchronize external search query
  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Pricing summary for the current item and booking settings
  const currentPricing = selectedItem ? rentalMarketplaceService.calculatePricing({
    item: selectedItem,
    durationCount: rentalDates.duration,
    durationUnit: rentalDates.unit || selectedItem.priceUnit,
    couponCode,
    useCoins,
    deliveryType,
    hasDriver,
    hasOperator
  }) : null;

  // View Navigation Helpers
  const openCategory = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openRentalDetails = useCallback((item) => {
    setSelectedItem(item);
    // Route to specialized details view if appropriate, or generic details
    if (item.categoryId === 'homes') {
      setCurrentView('property-details');
    } else if (item.categoryId === 'vehicles') {
      setCurrentView('vehicle-details');
    } else if (item.categoryId === 'furniture') {
      setCurrentView('furniture-details');
    } else if (item.categoryId === 'equipment') {
      setCurrentView('equipment-details');
    } else {
      setCurrentView('details');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startBooking = useCallback((item) => {
    if (item) setSelectedItem(item);
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const proceedToCheckout = useCallback(() => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const confirmBooking = useCallback(() => {
    if (!selectedItem) return;

    try {
      const newBooking = rentalMarketplaceService.createBooking({
        item: selectedItem,
        startDate: rentalDates.startDate,
        endDate: rentalDates.endDate,
        durationCount: rentalDates.duration,
        durationUnit: rentalDates.unit || selectedItem.priceUnit,
        deliveryType,
        deliveryAddress,
        pricing: currentPricing,
        paymentMethod,
        notes: bookingNotes,
        hasDriver,
        hasOperator
      });

      setActiveBooking(newBooking);
      setCurrentView('confirmation');
      if (showToast) showToast(`🎉 Booking Confirmed! Code: ${newBooking.otp}`);
    } catch (err) {
      if (showToast) showToast(`Booking failed: ${err.message}`);
    }
  }, [selectedItem, rentalDates, deliveryType, deliveryAddress, currentPricing, paymentMethod, bookingNotes, hasDriver, hasOperator, showToast]);

  const openTracking = useCallback((booking) => {
    setActiveBooking(booking);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openHistory = useCallback(() => {
    setCurrentView('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBackToHome = useCallback(() => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleWishlist = useCallback((itemId) => {
    const isAdded = rentalMarketplaceService.toggleWishlist(itemId);
    setWishlistVersion(v => v + 1);
    if (showToast) {
      showToast(isAdded ? 'Added to Saved Rentals' : 'Removed from Saved Rentals');
    }
    return isAdded;
  }, [showToast]);

  return {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    selectedItem,
    setSelectedItem,
    selectedOwner,
    setSelectedOwner,
    activeBooking,
    setActiveBooking,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    rentalDates,
    setRentalDates,
    deliveryType,
    setDeliveryType,
    deliveryAddress,
    setDeliveryAddress,
    hasDriver,
    setHasDriver,
    hasOperator,
    setHasOperator,
    couponCode,
    setCouponCode,
    useCoins,
    setUseCoins,
    paymentMethod,
    setPaymentMethod,
    bookingNotes,
    setBookingNotes,
    currentPricing,
    reviewModalItem,
    setReviewModalItem,
    contactOwnerModal,
    setContactOwnerModal,
    invoiceModalBooking,
    setInvoiceModalBooking,
    extendModalBooking,
    setExtendModalBooking,
    issueModalBooking,
    setIssueModalBooking,
    wishlistVersion,
    openCategory,
    openRentalDetails,
    startBooking,
    proceedToCheckout,
    confirmBooking,
    openTracking,
    openHistory,
    goBackToHome,
    toggleWishlist
  };
};
