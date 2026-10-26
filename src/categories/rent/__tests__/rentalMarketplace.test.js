import { test } from 'node:test';
import assert from 'node:assert';
import { rentalMarketplaceService } from '../services/rentalMarketplaceService.js';
import { RENTAL_CATEGORIES, RENTAL_COUPONS } from '../constants/rental.constants.js';

test('Rental Marketplace - Contains all 6 required rental categories', () => {
  const categories = rentalMarketplaceService.getCategories();
  assert.strictEqual(categories.length, 6, 'Should have exactly 6 main rental categories');

  const categoryIds = categories.map(c => c.id);
  assert.ok(categoryIds.includes('homes'), 'Should include Homes & Property');
  assert.ok(categoryIds.includes('vehicles'), 'Should include Vehicle Rentals');
  assert.ok(categoryIds.includes('furniture'), 'Should include Furniture Rentals');
  assert.ok(categoryIds.includes('equipment'), 'Should include Equipment & Assets');
  assert.ok(categoryIds.includes('events'), 'Should include Event & Functions');
  assert.ok(categoryIds.includes('other'), 'Should include Other Rentals');
});

test('Rental Marketplace - Homes category contains required property subcategories', () => {
  const homesCategory = rentalMarketplaceService.getCategoryById('homes');
  assert.ok(homesCategory, 'Homes category must exist');

  const requiredHomes = [
    'Houses', 'Flats/Apartment', 'Rooms', 'PG', 'Hostels', 'Villas',
    'Shops', 'Offices', 'Commercial buildings', 'Warehouses', 'Godowns',
    'Land/plots', 'Event halls', 'Marriage halls', 'Guest houses', 'Farmhouses'
  ];

  requiredHomes.forEach(sub => {
    assert.ok(
      homesCategory.subcategories.includes(sub),
      `Homes category should include subcategory: ${sub}`
    );
  });
});

test('Rental Marketplace - Vehicles category contains required vehicle subcategories', () => {
  const vehicleCategory = rentalMarketplaceService.getCategoryById('vehicles');
  assert.ok(vehicleCategory, 'Vehicles category must exist');

  const requiredVehicles = [
    'Bikes', 'Scooters', 'Cars', 'SUVs', 'Auto-rickshaws', 'E-rickshaws',
    'Vans', 'Tempo', 'Pickup vehicles', 'Trucks', 'Construction vehicles',
    'Vehicles with driver', 'Self-drive vehicles'
  ];

  requiredVehicles.forEach(sub => {
    assert.ok(
      vehicleCategory.subcategories.includes(sub),
      `Vehicles category should include subcategory: ${sub}`
    );
  });
});

test('Rental Marketplace - Furniture and Equipment categories contain required subcategories', () => {
  const furnitureCategory = rentalMarketplaceService.getCategoryById('furniture');
  assert.ok(furnitureCategory.subcategories.includes('Bed'));
  assert.ok(furnitureCategory.subcategories.includes('Sofa'));
  assert.ok(furnitureCategory.subcategories.includes('Complete room packages'));

  const equipmentCategory = rentalMarketplaceService.getCategoryById('equipment');
  assert.ok(equipmentCategory.subcategories.includes('Generator'));
  assert.ok(equipmentCategory.subcategories.includes('Tools'));
  assert.ok(equipmentCategory.subcategories.includes('Cameras'));
});

test('Rental Marketplace - Searches and filters rentals accurately', () => {
  // Query search
  const hondaSearch = rentalMarketplaceService.searchRentals({ query: 'Honda' });
  assert.ok(hondaSearch.length > 0, 'Should find Honda Activa');
  assert.ok(hondaSearch[0].title.includes('Honda'), 'Title should match Honda');

  // Category filter
  const vehicleOnly = rentalMarketplaceService.searchRentals({ category: 'vehicles' });
  assert.ok(vehicleOnly.every(item => item.categoryId === 'vehicles'), 'All results should be vehicles');

  // Rating filter
  const highRated = rentalMarketplaceService.searchRentals({ minRating: 4.9 });
  assert.ok(highRated.every(item => item.rating >= 4.9), 'All results should have rating >= 4.9');
});

test('Rental Marketplace - Calculates accurate pricing breakdown', () => {
  const item = rentalMarketplaceService.getRentalById('rent-veh-1'); // ₹350/day, ₹1000 deposit
  assert.ok(item, 'Item must exist');

  const pricing = rentalMarketplaceService.calculatePricing({
    item,
    durationCount: 3,
    durationUnit: 'day',
    couponCode: 'RENTFIRST', // 15% discount
    useCoins: true // ₹35 discount (10% of subtotal)
  });

  assert.strictEqual(pricing.rentalSubtotal, 1050, '350 * 3 should be 1050');
  assert.strictEqual(pricing.securityDeposit, 1000, 'Deposit should be 1000');
  assert.ok(pricing.discount > 0, 'Discount from coupon should be applied');
  assert.ok(pricing.coinsDiscount > 0, 'Coins discount should be applied');
  assert.ok(pricing.totalPayable > 0, 'Total payable should be calculated');
});

test('Rental Marketplace - Creates booking with unique ID and 4-digit OTP', () => {
  const item = rentalMarketplaceService.getRentalById('rent-prop-1');
  const pricing = rentalMarketplaceService.calculatePricing({ item, durationCount: 1 });

  const booking = rentalMarketplaceService.createBooking({
    item,
    startDate: '2026-11-15',
    endDate: '2026-12-15',
    durationCount: 1,
    durationUnit: 'month',
    pricing,
    paymentMethod: 'UPI'
  });

  assert.ok(booking.id.startsWith('RENT-BK-'), 'Booking ID should start with RENT-BK-');
  assert.strictEqual(booking.otp.length, 4, 'OTP must be 4 digits');
  assert.strictEqual(booking.status, 'CONFIRMED', 'Initial status should be CONFIRMED');
});

test('Rental Marketplace - Extends rental booking tenure', () => {
  const bookings = rentalMarketplaceService.getBookings();
  const testBooking = bookings[0];
  const originalEnd = testBooking.endDate;

  const updated = rentalMarketplaceService.extendBooking(testBooking.id, 2, 'day');
  assert.ok(updated, 'Extension should succeed');
  assert.notStrictEqual(updated.endDate, originalEnd, 'End date should be updated');
});

test('Rental Marketplace - Toggles and tracks wishlist state', () => {
  const itemId = 'rent-ev-1';
  const initial = rentalMarketplaceService.isWishlisted(itemId);

  const toggled = rentalMarketplaceService.toggleWishlist(itemId);
  assert.strictEqual(toggled, !initial, 'Toggled state should be opposite of initial');

  const reToggled = rentalMarketplaceService.toggleWishlist(itemId);
  assert.strictEqual(reToggled, initial, 'Second toggle should restore original state');
});
