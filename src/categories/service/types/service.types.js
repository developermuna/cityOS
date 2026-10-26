/**
 * Service Marketplace Type Definitions (JSDoc schema models)
 */

/**
 * @typedef {Object} ServiceItem
 * @property {string} id
 * @property {string} categoryId
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {number} originalPrice
 * @property {string} duration
 * @property {string} image
 * @property {string[]} images
 * @property {string[]} included
 * @property {string[]} notIncluded
 * @property {number} rating
 * @property {number} reviewsCount
 * @property {boolean} isEmergency
 */

/**
 * @typedef {Object} ServiceProvider
 * @property {string} id
 * @property {string} name
 * @property {string} photo
 * @property {string[]} skills
 * @property {string} experience
 * @property {number} rating
 * @property {number} reviewsCount
 * @property {number} completedJobs
 * @property {string} serviceArea
 * @property {string[]} verificationBadges
 * @property {boolean} isAvailableNow
 * @property {number} distanceKm
 * @property {string} phone
 * @property {number} startingPrice
 */

/**
 * @typedef {Object} ServiceBooking
 * @property {string} id
 * @property {string} serviceId
 * @property {string} serviceTitle
 * @property {string} categoryId
 * @property {number} totalAmount
 * @property {number} basePrice
 * @property {number} discount
 * @property {number} emergencyFee
 * @property {string} scheduledDate
 * @property {string} scheduledTimeSlot
 * @property {string} address
 * @property {string} problemDescription
 * @property {string[]} photos
 * @property {string} paymentMethod
 * @property {string} paymentStatus
 * @property {string} bookingStatus
 * @property {string} otp
 * @property {ServiceProvider|null} provider
 * @property {string} createdAt
 */

export const ServiceTypes = {};
