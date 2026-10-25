/**
 * CityOS Payment & Promotional Service
 */

export const AVAILABLE_COUPONS = [
  {
    code: 'SECOND50',
    title: '50% Flat Off',
    description: 'Get 50% discount up to ₹50 on your ride booking',
    discountAmount: 50,
    minFare: 50,
  },
  {
    code: 'CITYOS20',
    title: 'Flat ₹20 Off',
    description: 'Save ₹20 on any Auto or Cab ride',
    discountAmount: 20,
    minFare: 40,
  },
  {
    code: 'FIRSTFREE',
    title: 'First Ride Special',
    description: 'Welcome bonus: Flat ₹40 off on your first CityOS Ride',
    discountAmount: 40,
    minFare: 30,
  },
];

/**
 * Generates an NPCI-compliant UPI Intent string for QR code rendering.
 *
 * @param {Object} params
 * @param {string} params.pa - Payee VPA
 * @param {string} params.pn - Payee Name
 * @param {number} params.amount - Amount in INR
 * @param {string} params.transactionNote - Transaction reference note
 * @returns {string} UPI intent URL
 */
export function generateUpiPaymentString({
  pa = 'cityos.rides@icici',
  pn = 'CityOS Ride Mobility',
  amount = 35,
  transactionNote = 'CityOS Ride Payment',
}) {
  const encPn = encodeURIComponent(pn);
  const encNote = encodeURIComponent(transactionNote);
  return `upi://pay?pa=${pa}&pn=${encPn}&am=${amount.toFixed(2)}&cu=INR&tn=${encNote}`;
}

/**
 * Validates a coupon code and returns discount amount if eligible.
 *
 * @param {string} code
 * @param {number} rideFare
 * @returns {{ valid: boolean, discount: number, message: string }}
 */
export function validateCoupon(code, rideFare = 100) {
  if (!code) return { valid: false, discount: 0, message: 'No coupon entered' };

  const found = AVAILABLE_COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );

  if (!found) {
    return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
  }

  if (rideFare < found.minFare) {
    return {
      valid: false,
      discount: 0,
      message: `Coupon requires minimum fare of ₹${found.minFare}`,
    };
  }

  return {
    valid: true,
    discount: found.discountAmount,
    message: `Coupon ${found.code} applied successfully!`,
  };
}
