import test from 'node:test';
import assert from 'node:assert/strict';
import { serviceMarketplaceService } from '../services/serviceMarketplaceService.js';
import { SERVICE_CATEGORIES, BOOKING_STATUS, EMERGENCY_FEE } from '../constants/service.constants.js';

test('Service Marketplace - contains all 16 required service categories', () => {
  const categories = serviceMarketplaceService.getCategories();
  assert.equal(categories.length, 16);

  const categoryIds = categories.map((c) => c.id);
  assert.ok(categoryIds.includes('electrician'));
  assert.ok(categoryIds.includes('plumber'));
  assert.ok(categoryIds.includes('carpenter'));
  assert.ok(categoryIds.includes('painter'));
  assert.ok(categoryIds.includes('cleaner'));
  assert.ok(categoryIds.includes('ac-repair'));
  assert.ok(categoryIds.includes('appliance-repair'));
  assert.ok(categoryIds.includes('ro-service'));
  assert.ok(categoryIds.includes('mobile-computer'));
  assert.ok(categoryIds.includes('construction-labour'));
  assert.ok(categoryIds.includes('mason'));
  assert.ok(categoryIds.includes('driver'));
  assert.ok(categoryIds.includes('mechanic'));
  assert.ok(categoryIds.includes('beauty-salon'));
  assert.ok(categoryIds.includes('home-shifting'));
  assert.ok(categoryIds.includes('other-local'));
});

test('Service Marketplace - searches services by title and description', () => {
  const all = serviceMarketplaceService.getAllServices();
  assert.ok(all.length >= 16);

  const acServices = all.filter((s) => s.title.toLowerCase().includes('ac') || s.description.toLowerCase().includes('ac'));
  assert.ok(acServices.length > 0);
  assert.ok(acServices[0].included.length > 0);
  assert.ok(acServices[0].notIncluded.length > 0);
});

test('Service Marketplace - creates booking with security OTP and assigned provider', () => {
  const booking = serviceMarketplaceService.createBooking({
    serviceId: 'srv-elec-1',
    serviceTitle: 'Switchboard Repair & Wiring Fix',
    categoryId: 'electrician',
    basePrice: 199,
    totalAmount: 238,
    discount: 10,
    emergencyFee: 0,
    scheduledDate: 'Today',
    scheduledTimeSlot: '11:00 AM - 01:00 PM',
    address: 'Gautam Nagar, Rayagada',
    problemDescription: 'Short circuit in switchboard',
    photos: [],
    paymentMethod: 'Cash',
  });

  assert.ok(booking.id.startsWith('SRV-'));
  assert.equal(booking.status, BOOKING_STATUS.PROVIDER_ASSIGNED);
  assert.ok(booking.otp && booking.otp.length === 4);
  assert.ok(booking.provider);
  assert.equal(booking.provider.name, 'Rajesh Senapati');
});

test('Service Marketplace - cancels booking with reason', () => {
  const booking = serviceMarketplaceService.createBooking({
    serviceId: 'srv-plumb-1',
    serviceTitle: 'Tap Leakage & Pipe Repair',
    categoryId: 'plumber',
    basePrice: 249,
    totalAmount: 298,
    discount: 0,
    emergencyFee: 0,
    scheduledDate: 'Today',
    scheduledTimeSlot: '02:00 PM - 04:00 PM',
    address: 'JKPur Colony, Rayagada',
    problemDescription: 'Kitchen sink pipe dripping',
    photos: [],
    paymentMethod: 'UPI',
  });

  const cancelled = serviceMarketplaceService.cancelBooking(booking.id, 'Booked by mistake');
  assert.equal(cancelled.status, BOOKING_STATUS.CANCELLED);
  assert.equal(cancelled.cancellationReason, 'Booked by mistake');
});

test('Service Marketplace - updates booking status timeline sequentially', () => {
  const booking = serviceMarketplaceService.createBooking({
    serviceId: 'srv-clean-1',
    serviceTitle: 'Full Home Deep Cleaning',
    categoryId: 'cleaner',
    basePrice: 1499,
    totalAmount: 1548,
    discount: 0,
    emergencyFee: 0,
    scheduledDate: 'Tomorrow',
    scheduledTimeSlot: '09:00 AM - 11:00 AM',
    address: 'Raniguda Farm, Rayagada',
    problemDescription: 'Deep cleaning before puja',
    photos: [],
    paymentMethod: 'Online',
  });

  const updatedArriving = serviceMarketplaceService.updateBookingStatus(booking.id, BOOKING_STATUS.ARRIVING);
  assert.equal(updatedArriving.status, BOOKING_STATUS.ARRIVING);

  const updatedStarted = serviceMarketplaceService.updateBookingStatus(booking.id, BOOKING_STATUS.STARTED);
  assert.equal(updatedStarted.status, BOOKING_STATUS.STARTED);

  const updatedDone = serviceMarketplaceService.updateBookingStatus(booking.id, BOOKING_STATUS.COMPLETED);
  assert.equal(updatedDone.status, BOOKING_STATUS.COMPLETED);
});
