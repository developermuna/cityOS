import React, { useEffect } from 'react';
import { useRentalMarketplace } from './hooks/useRentalMarketplace';

// Home
import { RentalHomePage } from './home/pages/RentalHomePage';

// Category & Listings
import { RentalCategoryPage } from './category-pages/RentalCategoryPage/RentalCategoryPage';
import { RentalListingPage } from './category-pages/RentalListingPage/RentalListingPage';

// Details Pages
import { RentalDetailsPage } from './category-pages/RentalDetailsPage/RentalDetailsPage';
import { PropertyDetailsPage } from './category-pages/PropertyDetailsPage/PropertyDetailsPage';
import { VehicleDetailsPage } from './category-pages/VehicleDetailsPage/VehicleDetailsPage';
import { FurnitureDetailsPage } from './category-pages/FurnitureDetailsPage/FurnitureDetailsPage';
import { EquipmentDetailsPage } from './category-pages/EquipmentDetailsPage/EquipmentDetailsPage';

// Booking Flow
import { RentalBookingPage } from './category-pages/RentalBookingPage/RentalBookingPage';
import { RentalCheckoutPage } from './category-pages/RentalCheckoutPage/RentalCheckoutPage';
import { RentalConfirmationPage } from './category-pages/RentalConfirmationPage/RentalConfirmationPage';
import { RentalTrackingPage } from './category-pages/RentalTrackingPage/RentalTrackingPage';

// Secondary Modules
import { RentalHistoryPage } from './history/pages/RentalHistoryPage';
import { RentalAccountPage } from './account/pages/RentalAccountPage';
import { RentalCartPage } from './cart/pages/RentalCartPage';
import { RentalPlayPage } from './play/pages/RentalPlayPage';

// Shared Modals
import { RentalReviewModal } from './components/RentalReviewModal/RentalReviewModal';
import { RentalContactOwnerModal } from './components/RentalContactOwnerModal/RentalContactOwnerModal';
import { RentalExtensionModal } from './history/components/RentalExtensionModal';
import { RentalIssueReportModal } from './history/components/RentalIssueReportModal';
import { RentalInvoiceModal } from './history/components/RentalInvoiceModal';

export const RentalMarketplaceView = ({
  showToast,
  externalSearchQuery,
  onSubPageChange
}) => {
  const marketplace = useRentalMarketplace({
    showToast,
    initialSearchQuery: externalSearchQuery !== undefined ? externalSearchQuery : ''
  });

  const {
    currentView,
    setCurrentView,
    selectedCategory,
    selectedItem,
    activeBooking,
    searchQuery,
    setSearchQuery,
    selectedLocation,
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
    openCategory,
    openRentalDetails,
    startBooking,
    proceedToCheckout,
    confirmBooking,
    openTracking,
    openHistory,
    goBackToHome,
    toggleWishlist
  } = marketplace;

  // Header visibility notifier
  useEffect(() => {
    if (onSubPageChange) {
      onSubPageChange(currentView !== 'home');
    }
    return () => {
      if (onSubPageChange) {
        onSubPageChange(false);
      }
    };
  }, [currentView, onSubPageChange]);

  // Main View Switcher
  const renderCurrentView = () => {
    switch (currentView) {
      case 'category':
        return (
          <RentalCategoryPage
            category={selectedCategory}
            onBack={goBackToHome}
            onSelectItem={openRentalDetails}
            onRentNow={startBooking}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'listing':
        return (
          <RentalListingPage
            category={selectedCategory}
            onBack={goBackToHome}
            onSelectItem={openRentalDetails}
            onRentNow={startBooking}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'details':
        return (
          <RentalDetailsPage
            item={selectedItem}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            onDurationChange={(d, u) => setRentalDates(prev => ({ ...prev, duration: d, unit: u }))}
            pricing={currentPricing}
            onBack={goBackToHome}
            onRentNow={startBooking}
            onContactOwner={(owner, mode) => setContactOwnerModal({ owner, mode })}
            onOpenReviewModal={(it) => setReviewModalItem(it)}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'property-details':
        return (
          <PropertyDetailsPage
            item={selectedItem}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            onDurationChange={(d, u) => setRentalDates(prev => ({ ...prev, duration: d, unit: u }))}
            pricing={currentPricing}
            onBack={goBackToHome}
            onRentNow={startBooking}
            onContactOwner={(owner, mode) => setContactOwnerModal({ owner, mode })}
            onOpenReviewModal={(it) => setReviewModalItem(it)}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'vehicle-details':
        return (
          <VehicleDetailsPage
            item={selectedItem}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            onDurationChange={(d, u) => setRentalDates(prev => ({ ...prev, duration: d, unit: u }))}
            pricing={currentPricing}
            onBack={goBackToHome}
            onRentNow={startBooking}
            onContactOwner={(owner, mode) => setContactOwnerModal({ owner, mode })}
            onOpenReviewModal={(it) => setReviewModalItem(it)}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'furniture-details':
        return (
          <FurnitureDetailsPage
            item={selectedItem}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            onDurationChange={(d, u) => setRentalDates(prev => ({ ...prev, duration: d, unit: u }))}
            pricing={currentPricing}
            onBack={goBackToHome}
            onRentNow={startBooking}
            onContactOwner={(owner, mode) => setContactOwnerModal({ owner, mode })}
            onOpenReviewModal={(it) => setReviewModalItem(it)}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'equipment-details':
        return (
          <EquipmentDetailsPage
            item={selectedItem}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            onDurationChange={(d, u) => setRentalDates(prev => ({ ...prev, duration: d, unit: u }))}
            pricing={currentPricing}
            onBack={goBackToHome}
            onRentNow={startBooking}
            onContactOwner={(owner, mode) => setContactOwnerModal({ owner, mode })}
            onOpenReviewModal={(it) => setReviewModalItem(it)}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );

      case 'booking':
        return (
          <RentalBookingPage
            item={selectedItem}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            hasDriver={hasDriver}
            setHasDriver={setHasDriver}
            hasOperator={hasOperator}
            setHasOperator={setHasOperator}
            bookingNotes={bookingNotes}
            setBookingNotes={setBookingNotes}
            onBack={() => setCurrentView('details')}
            onProceedToCheckout={proceedToCheckout}
          />
        );

      case 'checkout':
        return (
          <RentalCheckoutPage
            item={selectedItem}
            rentalDates={rentalDates}
            deliveryType={deliveryType}
            deliveryAddress={deliveryAddress}
            pricing={currentPricing}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            useCoins={useCoins}
            setUseCoins={setUseCoins}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onBack={() => setCurrentView('booking')}
            onConfirmBooking={confirmBooking}
          />
        );

      case 'confirmation':
        return (
          <RentalConfirmationPage
            booking={activeBooking}
            onTrackRental={openTracking}
            onGoHome={goBackToHome}
          />
        );

      case 'tracking':
        return (
          <RentalTrackingPage
            booking={activeBooking}
            onBack={goBackToHome}
            onContactOwner={(owner, mode) => setContactOwnerModal({ owner, mode })}
            onOpenExtensionModal={(bk) => setExtendModalBooking(bk)}
            onOpenIssueModal={(bk) => setIssueModalBooking(bk)}
            onOpenInvoiceModal={(bk) => setInvoiceModalBooking(bk)}
            onCompleteReturn={() => {
              if (showToast) showToast('Rental return confirmed');
            }}
            showToast={showToast}
          />
        );

      case 'history':
        return (
          <RentalHistoryPage
            onBack={goBackToHome}
            onTrackBooking={openTracking}
            onExtendBooking={(bk) => setExtendModalBooking(bk)}
            onInvoiceBooking={(bk) => setInvoiceModalBooking(bk)}
            onRateBooking={(bk) => {
              const it = { id: bk.itemId, title: bk.itemTitle };
              setReviewModalItem(it);
            }}
            onReRentBooking={(bk) => {
              startBooking({ id: bk.itemId, title: bk.itemTitle, price: bk.price, priceUnit: 'day' });
            }}
          />
        );

      case 'account':
        return (
          <RentalAccountPage
            onBack={goBackToHome}
            onOpenHistory={openHistory}
            showToast={showToast}
          />
        );

      case 'cart':
        return (
          <RentalCartPage
            onBack={goBackToHome}
            onGoHome={goBackToHome}
          />
        );

      case 'play':
        return (
          <RentalPlayPage
            onBack={goBackToHome}
            showToast={showToast}
          />
        );

      case 'home':
      default:
        return (
          <RentalHomePage
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={() => setCurrentView('listing')}
            selectedLocation={selectedLocation}
            rentalDates={rentalDates}
            onDatesChange={setRentalDates}
            onSelectCategory={openCategory}
            onSelectItem={openRentalDetails}
            onRentNow={startBooking}
            onOpenTracking={openTracking}
            onSeeAllBookings={openHistory}
            onToggleWishlist={toggleWishlist}
            showToast={showToast}
          />
        );
    }
  };

  return (
    <div className="w-full relative min-h-screen">
      {renderCurrentView()}

      {/* Shared Modals */}
      {reviewModalItem && (
        <RentalReviewModal
          item={reviewModalItem}
          onClose={() => setReviewModalItem(null)}
          showToast={showToast}
        />
      )}

      {contactOwnerModal && (
        <RentalContactOwnerModal
          owner={contactOwnerModal.owner}
          item={selectedItem}
          onClose={() => setContactOwnerModal(null)}
          showToast={showToast}
        />
      )}

      {extendModalBooking && (
        <RentalExtensionModal
          booking={extendModalBooking}
          onClose={() => setExtendModalBooking(null)}
          showToast={showToast}
        />
      )}

      {issueModalBooking && (
        <RentalIssueReportModal
          booking={issueModalBooking}
          onClose={() => setIssueModalBooking(null)}
          showToast={showToast}
        />
      )}

      {invoiceModalBooking && (
        <RentalInvoiceModal
          booking={invoiceModalBooking}
          onClose={() => setInvoiceModalBooking(null)}
          showToast={showToast}
        />
      )}
    </div>
  );
};
