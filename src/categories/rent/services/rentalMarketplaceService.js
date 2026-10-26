/**
 * Rental Marketplace Service
 * Business logic, search, calculations, availability, and booking management for cityOS Rent.
 */

import { RENTAL_CATEGORIES, RENTAL_COUPONS, RENTAL_BOOKING_STATUS } from '../constants/rental.constants.js';
import { MOCK_RENTAL_ITEMS, MOCK_RENTAL_OWNERS, MOCK_RECENT_RENTALS } from '../constants/rentalMockData.js';

class RentalMarketplaceService {
  constructor() {
    this.rentals = [...MOCK_RENTAL_ITEMS];
    this.owners = [...MOCK_RENTAL_OWNERS];
    this.bookings = [...MOCK_RECENT_RENTALS];
    this.wishlist = new Set(['rent-veh-1', 'rent-prop-1']);
    this.recentlyViewed = ['rent-prop-1', 'rent-veh-1', 'rent-furn-1'];
  }

  // --- Category Queries ---
  getCategories() {
    return RENTAL_CATEGORIES;
  }

  getCategoryById(categoryId) {
    return RENTAL_CATEGORIES.find(c => c.id === categoryId) || null;
  }

  // --- Rental Item Queries ---
  getAllRentals() {
    return [...this.rentals];
  }

  getRentalById(id) {
    if (!id) return null;
    const found = this.rentals.find(r => r.id === id);
    if (found && !this.recentlyViewed.includes(id)) {
      this.recentlyViewed.unshift(id);
      if (this.recentlyViewed.length > 10) this.recentlyViewed.pop();
    }
    return found || null;
  }

  getFeaturedRentals() {
    return this.rentals.filter(r => r.rating >= 4.9);
  }

  getPopularRentals() {
    return [...this.rentals].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 6);
  }

  getNearbyRentals() {
    return this.rentals.filter(r => parseFloat(r.distance) <= 2.0);
  }

  getRecommendedRentals(categoryId = null) {
    if (categoryId) {
      return this.rentals.filter(r => r.categoryId === categoryId);
    }
    return this.rentals.slice(0, 6);
  }

  getTrendingRentals() {
    return this.rentals.filter(r => ['rent-veh-1', 'rent-furn-3', 'rent-eq-3', 'rent-ev-2'].includes(r.id));
  }

  getRecentlyViewed() {
    return this.recentlyViewed
      .map(id => this.rentals.find(r => r.id === id))
      .filter(Boolean);
  }

  getRecentlyRented() {
    return [...this.bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
  }

  // --- Search & Filter ---
  searchRentals({
    category = null,
    subcategory = null,
    query = '',
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    verifiedOnly = false,
    durationUnit = null,
    sortBy = 'recommended'
  } = {}) {
    let results = this.rentals.filter(item => {
      // Category filter
      if (category && category !== 'all' && item.categoryId !== category) {
        return false;
      }

      // Subcategory filter
      if (subcategory && subcategory !== 'all' && item.subcategory.toLowerCase() !== subcategory.toLowerCase()) {
        return false;
      }

      // Text query match
      if (query && query.trim()) {
        const q = query.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchSub = item.subcategory.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchOwner = item.owner?.name?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSub && !matchLoc && !matchOwner) {
          return false;
        }
      }

      // Price range
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && !item.isVerified) {
        return false;
      }

      // Duration unit filter
      if (durationUnit && durationUnit !== 'all' && item.priceUnit !== durationUnit) {
        return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'nearest':
        results.sort((a, b) => parseFloat(a.distance || 0) - parseFloat(b.distance || 0));
        break;
      case 'price_low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'most_rented':
        results.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
        results.reverse();
        break;
      case 'recommended':
      default:
        results.sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0) || b.rating - a.rating);
        break;
    }

    return results;
  }

  // --- Availability System ---
  checkAvailability({ itemId, startDate, endDate }) {
    if (!itemId) return { available: false, reason: 'Missing item' };
    
    // Check against active/confirmed bookings
    const hasConflict = this.bookings.some(b => {
      if (b.itemId !== itemId) return false;
      if (b.status === RENTAL_BOOKING_STATUS.CANCELLED || b.status === RENTAL_BOOKING_STATUS.COMPLETED) {
        return false;
      }
      const bStart = new Date(b.startDate).getTime();
      const bEnd = new Date(b.endDate).getTime();
      const reqStart = new Date(startDate).getTime();
      const reqEnd = new Date(endDate).getTime();

      return reqStart < bEnd && reqEnd > bStart;
    });

    if (hasConflict) {
      return {
        available: false,
        reason: 'Item is reserved for part of these selected dates. Please choose alternate dates.'
      };
    }

    return { available: true };
  }

  // --- Pricing Breakdown Engine ---
  calculatePricing({
    item,
    durationCount = 1,
    durationUnit = null,
    couponCode = '',
    useCoins = false,
    deliveryType = 'pickup',
    hasDriver = false,
    hasOperator = false
  }) {
    if (!item) return null;

    const unit = durationUnit || item.priceUnit || 'day';
    const baseRate = item.price;
    const duration = Math.max(1, parseInt(durationCount, 10) || 1);

    // Rent subtotal
    let rentalSubtotal = baseRate * duration;

    // Addons
    let addonCharge = 0;
    if (hasDriver && item.categoryId === 'vehicles') {
      addonCharge = 600 * duration; // Driver fee per day/unit
    } else if (hasOperator && item.categoryId === 'equipment') {
      addonCharge = 500 * duration; // Operator fee per day/unit
    }

    // Security deposit (100% refundable)
    const securityDeposit = item.securityDeposit || 0;

    // Delivery charge
    const deliveryFee = deliveryType === 'delivery' ? (item.deliveryFee || 100) : 0;

    // Platform fee (3% capped at 150)
    const platformFee = Math.min(150, Math.max(25, Math.round(rentalSubtotal * 0.03)));

    // Taxes (GST 5% on rental subtotal + platform fee)
    const taxes = Math.round((rentalSubtotal + platformFee) * 0.05);

    // Coupon calculation
    let discount = 0;
    let appliedCoupon = null;
    if (couponCode) {
      const foundCoupon = RENTAL_COUPONS.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
      if (foundCoupon && rentalSubtotal >= (foundCoupon.minRental || 0)) {
        if (foundCoupon.discountAmount) {
          discount = foundCoupon.discountAmount;
        } else if (foundCoupon.discountPercent) {
          discount = Math.min(foundCoupon.maxDiscount || Infinity, Math.round((rentalSubtotal * foundCoupon.discountPercent) / 100));
        }
        appliedCoupon = foundCoupon;
      }
    }

    // cityOS Coins (1 coin = ₹1, up to ₹200)
    let coinsDiscount = 0;
    if (useCoins) {
      coinsDiscount = Math.min(200, Math.floor(rentalSubtotal * 0.1));
    }

    // Final total payable
    const totalPayable = Math.max(
      0,
      rentalSubtotal + addonCharge + securityDeposit + deliveryFee + platformFee + taxes - discount - coinsDiscount
    );

    return {
      baseRate,
      duration,
      durationUnit: unit,
      rentalSubtotal,
      addonCharge,
      securityDeposit,
      deliveryFee,
      platformFee,
      taxes,
      discount,
      appliedCoupon,
      coinsDiscount,
      totalPayable,
      depositRefundable: securityDeposit
    };
  }

  // --- Booking Operations ---
  createBooking({
    item,
    startDate,
    endDate,
    durationCount = 1,
    durationUnit = 'day',
    deliveryType = 'pickup',
    deliveryAddress = '',
    pricing,
    paymentMethod = 'UPI',
    notes = '',
    hasDriver = false,
    hasOperator = false
  }) {
    if (!item) throw new Error('Rental item is required');

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `RENT-BK-${randomSuffix}`;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking = {
      id: bookingId,
      itemId: item.id,
      itemTitle: item.title,
      category: item.categoryId,
      subcategory: item.subcategory,
      image: item.image,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      duration: `${durationCount} ${durationUnit}${durationCount > 1 ? 's' : ''}`,
      price: item.price,
      securityDeposit: pricing?.securityDeposit || item.securityDeposit || 0,
      totalAmount: pricing?.totalPayable || item.price,
      status: RENTAL_BOOKING_STATUS.CONFIRMED,
      pickupAddress: deliveryAddress || item.location,
      deliveryType,
      otp,
      owner: item.owner || this.owners[0],
      bookingDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      notes,
      hasDriver,
      hasOperator,
      pricingBreakdown: pricing
    };

    this.bookings.unshift(newBooking);
    return newBooking;
  }

  getBookings() {
    return [...this.bookings];
  }

  getBookingById(id) {
    return this.bookings.find(b => b.id === id) || null;
  }

  extendBooking(bookingId, additionalUnits = 1, unit = 'day') {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    const currentEnd = new Date(booking.endDate);
    const addedDays = unit === 'day' ? additionalUnits : unit === 'month' ? additionalUnits * 30 : additionalUnits;
    currentEnd.setDate(currentEnd.getDate() + addedDays);

    booking.endDate = currentEnd.toISOString().split('T')[0];
    booking.duration = `${booking.duration} (+${additionalUnits} ${unit})`;
    return booking;
  }

  reportIssue(bookingId, { issueType, description, photoUrl }) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    if (!booking.issues) booking.issues = [];
    booking.issues.push({
      id: `ISS-${Date.now()}`,
      issueType,
      description,
      photoUrl,
      reportedAt: new Date().toISOString(),
      status: 'INVESTIGATING'
    });
    return true;
  }

  cancelBooking(bookingId, reason = 'User requested cancellation') {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    booking.status = RENTAL_BOOKING_STATUS.CANCELLED;
    booking.cancelReason = reason;
    booking.cancelledAt = new Date().toISOString();
    return true;
  }

  completeReturn(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    booking.status = RENTAL_BOOKING_STATUS.COMPLETED;
    booking.returnedAt = new Date().toISOString();
    booking.depositRefundStatus = 'REFUND_PROCESSED';
    return true;
  }

  submitReview(itemId, { rating, reviewText, conditionRating, cleanlinessRating, accuracyRating, providerRating }) {
    const item = this.rentals.find(r => r.id === itemId);
    if (!item) return false;

    if (!item.userReviews) item.userReviews = [];
    item.userReviews.unshift({
      id: `REV-${Date.now()}`,
      userName: 'You',
      rating,
      reviewText,
      conditionRating,
      cleanlinessRating,
      accuracyRating,
      providerRating,
      date: 'Just now'
    });
    item.reviewsCount = (item.reviewsCount || 0) + 1;
    return true;
  }

  // --- Wishlist ---
  getWishlist() {
    return this.rentals.filter(r => this.wishlist.has(r.id));
  }

  isWishlisted(itemId) {
    return this.wishlist.has(itemId);
  }

  toggleWishlist(itemId) {
    if (this.wishlist.has(itemId)) {
      this.wishlist.delete(itemId);
      return false;
    } else {
      this.wishlist.add(itemId);
      return true;
    }
  }

  // --- Owners ---
  getOwners() {
    return [...this.owners];
  }

  getOwnerById(id) {
    return this.owners.find(o => o.id === id) || null;
  }
}

export const rentalMarketplaceService = new RentalMarketplaceService();
