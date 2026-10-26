/**
 * Rental Marketplace Type Definitions (JSDoc)
 */

/**
 * @typedef {'homes' | 'vehicles' | 'furniture' | 'equipment' | 'events' | 'other'} RentalCategoryId
 * 
 * @typedef {'hour' | 'day' | 'week' | 'month' | 'event'} RentalPriceUnit
 * 
 * @typedef {'confirmed' | 'active' | 'returning' | 'completed' | 'cancelled'} RentalBookingStatus
 * 
 * @typedef {Object} RentalOwner
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {boolean} isVerified
 * @property {number} rating
 * @property {number} reviewsCount
 * @property {number} listingsCount
 * @property {number} completedRentals
 * @property {string} responseRate
 * @property {string} responseTime
 * @property {string} joinedDate
 * @property {string} phone
 * @property {string} serviceArea
 * 
 * @typedef {Object} RentalItem
 * @property {string} id
 * @property {RentalCategoryId} categoryId
 * @property {string} subcategory
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {RentalPriceUnit} priceUnit
 * @property {number} securityDeposit
 * @property {number} deliveryFee
 * @property {number} rating
 * @property {number} reviewsCount
 * @property {string} location
 * @property {string} distance
 * @property {string} image
 * @property {string[]} images
 * @property {boolean} isVerified
 * @property {boolean} isAvailable
 * @property {RentalOwner} owner
 * @property {Object} [specs]
 * @property {string[]} [amenities]
 * @property {string[]} [included]
 * @property {string[]} [rules]
 * @property {string} [cancellationPolicy]
 * @property {string} [damagePolicy]
 * @property {string} [depositPolicy]
 */

export const RENTAL_CATEGORY_IDS = {
  HOMES: 'homes',
  VEHICLES: 'vehicles',
  FURNITURE: 'furniture',
  EQUIPMENT: 'equipment',
  EVENTS: 'events',
  OTHER: 'other',
};
