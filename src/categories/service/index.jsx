import React from 'react';
import { useServiceMarketplace } from './hooks/useServiceMarketplace';
import { ServiceHomePage } from './home/pages/ServiceHomePage';
import { ServiceCategoryPage } from './category-pages/ServiceCategoryPage/ServiceCategoryPage';
import { ServiceDetailsPage } from './category-pages/ServiceDetailsPage/ServiceDetailsPage';
import { ProviderProfilePage } from './category-pages/ProviderProfilePage/ProviderProfilePage';
import { ServiceBookingPage } from './category-pages/ServiceBookingPage/ServiceBookingPage';
import { ServiceTrackingPage } from './category-pages/ServiceTrackingPage/ServiceTrackingPage';
import { BookingDetailsPage } from './category-pages/BookingDetailsPage/BookingDetailsPage';
import { ServiceHistoryPage } from './history/pages/ServiceHistoryPage';
import { ServicePlayPage } from './play/pages/ServicePlayPage';
import { ServiceAccountPage } from './account/pages/ServiceAccountPage';
import { ServiceCartPage } from './cart/pages/ServiceCartPage';

export const ServiceMarketplaceView = ({ showToast, onAddToCart, onTabChange, externalSearchQuery, onSubPageChange }) => {
  const marketplace = useServiceMarketplace({ 
    showToast, 
    initialSearchQuery: externalSearchQuery !== undefined ? externalSearchQuery : '' 
  });

  const {
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
  } = marketplace;

  React.useEffect(() => {
    if (onSubPageChange) {
      onSubPageChange(currentView !== 'home');
    }
    return () => {
      if (onSubPageChange) {
        onSubPageChange(false);
      }
    };
  }, [currentView, onSubPageChange]);

  // View Routing Switcher
  switch (currentView) {
    case 'category':
      return (
        <ServiceCategoryPage
          category={selectedCategory}
          categoryServices={categoryServices}
          allProviders={allProviders}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isEmergencyMode={isEmergencyMode}
          setIsEmergencyMode={setIsEmergencyMode}
          onSelectService={openServiceDetails}
          onBookNow={startBooking}
          onSelectProvider={openProviderProfile}
          onBack={goBackToHome}
        />
      );

    case 'details':
      return (
        <ServiceDetailsPage
          service={selectedService}
          allProviders={allProviders}
          onBookNow={startBooking}
          onSelectProvider={openProviderProfile}
          onBack={() => (selectedCategory ? setCurrentView('category') : goBackToHome())}
          showToast={showToast}
        />
      );

    case 'provider':
      return (
        <ProviderProfilePage
          provider={selectedProvider}
          allServices={allServices}
          onBookService={startBooking}
          onBack={() => (selectedService ? setCurrentView('details') : goBackToHome())}
          showToast={showToast}
        />
      );

    case 'booking':
      return (
        <ServiceBookingPage
          service={selectedService || allServices[0]}
          isEmergencyMode={isEmergencyMode}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          bookingTimeSlot={bookingTimeSlot}
          setBookingTimeSlot={setBookingTimeSlot}
          problemDescription={problemDescription}
          setProblemDescription={setProblemDescription}
          uploadedPhotos={uploadedPhotos}
          setUploadedPhotos={setUploadedPhotos}
          appliedCoupon={appliedCoupon}
          setAppliedCoupon={setAppliedCoupon}
          useCityOsCoins={useCityOsCoins}
          setUseCityOsCoins={setUseCityOsCoins}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          pricingSummary={pricingSummary}
          onConfirmBooking={() => {
            const newBooking = confirmBooking();
            if (onAddToCart && selectedService) {
              onAddToCart({
                id: selectedService.id,
                name: selectedService.title,
                dealPrice: pricingSummary.total,
                image: selectedService.image,
              });
            }
          }}
          onBack={() => (selectedService ? setCurrentView('details') : goBackToHome())}
          showToast={showToast}
        />
      );

    case 'tracking':
      return (
        <ServiceTrackingPage
          booking={activeBooking || bookingsHistory[0]}
          onCancelBooking={cancelBooking}
          onGoHome={goBackToHome}
          showToast={showToast}
        />
      );

    case 'history':
      return (
        <ServiceHistoryPage
          bookings={bookingsHistory}
          onTrackBooking={openTracking}
          onRebook={(bk) => {
            const foundService = allServices.find((s) => s.id === bk.serviceId) || allServices[0];
            startBooking(foundService);
          }}
          onBack={goBackToHome}
          showToast={showToast}
        />
      );

    case 'play':
      return (
        <ServicePlayPage
          onSelectCategory={openCategory}
          onBack={goBackToHome}
        />
      );

    case 'account':
      return (
        <ServiceAccountPage
          onBack={goBackToHome}
          onOpenHistory={openHistory}
        />
      );

    case 'cart':
      return (
        <ServiceCartPage
          selectedService={selectedService}
          onProceedToBooking={startBooking}
          onBack={goBackToHome}
        />
      );

    case 'home':
    default:
      return (
        <ServiceHomePage
          allCategories={allCategories}
          allServices={allServices}
          allProviders={allProviders}
          searchResults={searchResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          isEmergencyMode={isEmergencyMode}
          setIsEmergencyMode={setIsEmergencyMode}
          appliedCoupon={appliedCoupon}
          setAppliedCoupon={setAppliedCoupon}
          bookingsHistory={bookingsHistory}
          openCategory={openCategory}
          openServiceDetails={openServiceDetails}
          openProviderProfile={openProviderProfile}
          startBooking={startBooking}
          openTracking={openTracking}
          openHistory={openHistory}
          showToast={showToast}
          onAddToCart={onAddToCart}
        />
      );
  }
};

export default ServiceMarketplaceView;
