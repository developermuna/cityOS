export const ordersData = {
  shop: {
    title: 'My Orders',
    searchPlaceholder: 'Search your orders...',
    banner: {
      brand: 'CityOS',
      partner: 'Uber',
      sub: 'Earn 4% SuperCoins',
      title: 'On every completed trip',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'CityOS', 'Grocery', 'Minutes'],
    items: [
      {
        id: 'ord-101',
        type: 'shop',
        filterCategory: 'CityOS',
        title: 'Mauua Chair hydraulic Gas lift cylinder',
        detail: 'Mauua Chair hydraulic Gas lift cyle...',
        status: 'Delivery expected by Oct 13',
        statusType: 'expected',
        statusDate: 'Thu Oct 08: Product has left the Jai...',
        image: 'https://images.unsplash.com/photo-1580481077194-c71c42903e13?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Pay right now and save the COD fee',
        payAmount: '₹267'
      },
      {
        id: 'ord-102',
        type: 'shop',
        filterCategory: 'CityOS',
        title: 'Mauua Chair hydraulic Gas lift cylinder',
        detail: 'Mauua Chair hydraulic Gas lift cyle...',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Mauua Chair hydraulic Gas lift cyle...',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Okay',
        ratingStars: 3
      },
      {
        id: 'ord-103',
        type: 'shop',
        filterCategory: 'CityOS',
        title: 'WALLNEST 60.96 cm x 365.76 cm Wooden Shelf',
        detail: 'WALLNEST 60.96 cm x 365.76 cm ...',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'WALLNEST 60.96 cm x 365.76 cm ...',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_review',
        ratingLabel: 'Bad',
        ratingStars: 2,
        refundAmount: 'Refund of ₹244',
        refundMethod: 'UPI'
      },
      {
        id: 'ord-104',
        type: 'shop',
        filterCategory: 'CityOS',
        title: 'OON Large Felt Desk Mat Mouse Pad',
        detail: 'OON Large Felt Desk Mat Mouse P...',
        status: 'Delivered on Mon Oct 05',
        statusType: 'delivered',
        statusDate: 'OON Large Felt Desk Mat Mouse P...',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Bad',
        ratingStars: 2
      },
      {
        id: 'ord-105',
        type: 'shop',
        filterCategory: 'CityOS',
        title: 'Vintage Diecast Miniature Luxury Car',
        detail: 'Your order was cancelled as per your request',
        status: 'Cancelled on Sep 28',
        statusType: 'cancelled',
        statusDate: 'Your order was cancelled as per yo...',
        image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=200&auto=format&fit=crop&q=80',
        actionType: 'none'
      },
      {
        id: 'ord-106',
        type: 'shop',
        filterCategory: 'CityOS',
        title: 'ZEBRONICS SA127 68.58 cm (27 inch) Monitor',
        detail: 'ZEBRONICS SA127 68.58 cm (27 in...',
        status: 'Delivered on Sep 27',
        statusType: 'delivered',
        statusDate: 'ZEBRONICS SA127 68.58 cm (27 in...',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Good',
        ratingStars: 4
      },
      {
        id: 'ord-107',
        type: 'shop',
        filterCategory: 'Grocery',
        title: 'FERVIK Power Plate 2500W 4+8 Socket Extension',
        detail: 'FERVIK Power Plate 2500W 4+8 So...',
        status: 'Refund completed',
        statusType: 'refund',
        statusDate: 'FERVIK Power Plate 2500W 4+8 So...',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹441 + 13🪙',
        refundMethod: 'UPI + Coins'
      }
    ]
  },
  food: {
    title: 'My Food Orders',
    searchPlaceholder: 'Search dishes, restaurants...',
    banner: {
      brand: 'CityOS',
      partner: 'Dineout',
      sub: 'Flat 50% Cashback',
      title: 'On premium gourmet dining',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Restaurants', 'Instamart', 'Dineout'],
    items: [
      {
        id: 'food-201',
        type: 'food',
        filterCategory: 'Restaurants',
        title: 'Bikanervala Sweets & Snacks',
        detail: '1x Kaju Katli (500g), 2x Rasgulla (1kg)...',
        status: 'Delivery expected in 18 mins',
        statusType: 'expected',
        statusDate: 'Driver Rahul M. picked up order',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Online payment saved: ₹40 discount applied',
        payAmount: '₹540'
      },
      {
        id: 'food-202',
        type: 'food',
        filterCategory: 'Restaurants',
        title: 'Pizzawala Woodfired Gourmet',
        detail: '1x Margherita Farmhouse Special, 1x Garlic Bread',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Delivered on time in 22 mins',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Great',
        ratingStars: 5
      },
      {
        id: 'food-203',
        type: 'food',
        filterCategory: 'Restaurants',
        title: 'Burger King Deluxe Feast',
        detail: '2x Crispy Veg Burger, 1x King Fries',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Item out of stock during preparation',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹389',
        refundMethod: 'UPI'
      },
      {
        id: 'food-204',
        type: 'food',
        filterCategory: 'Dineout',
        title: 'Bastian Worli - Sunday Circuit Table',
        detail: 'Table for 4 • Sunday Brunch Pass',
        status: 'Delivered on Mon Oct 05',
        statusType: 'delivered',
        statusDate: 'Completed reservation at 1:30 PM',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Good',
        ratingStars: 4
      }
    ]
  },
  grocery: {
    title: 'My Grocery Orders',
    searchPlaceholder: 'Search daily essentials...',
    banner: {
      brand: 'CityOS',
      partner: 'Instamart',
      sub: 'Delivery in 10 mins',
      title: 'Free veggies on ₹199+ orders',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Fresh', 'Dairy', 'Snacks'],
    items: [
      {
        id: 'groc-301',
        type: 'grocery',
        filterCategory: 'Fresh',
        title: 'Farm Fresh Organic Veggie Basket',
        detail: 'Tomatoes (1kg), Onion (2kg), Spinach (250g)',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Delivered in 12 mins',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Good',
        ratingStars: 4
      },
      {
        id: 'groc-302',
        type: 'grocery',
        filterCategory: 'Dairy',
        title: 'Amul Taaza Milk 1L & Butter 500g',
        detail: '2x Milk Cartons, 1x Salted Butter',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Quantity adjusted at packing',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹68',
        refundMethod: 'Wallet'
      }
    ]
  },
  ride: {
    title: 'My Rides',
    searchPlaceholder: 'Search rides, pickup, drop...',
    banner: {
      brand: 'CityOS',
      partner: 'City Ride',
      sub: 'Zero Surge Guarantee',
      title: 'Airport cabs from ₹399',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Premier', 'Auto', 'Bike', 'Outstation'],
    items: [
      {
        id: 'ride-401',
        type: 'ride',
        filterCategory: 'Premier',
        title: 'Trip to Chhatrapati Shivaji Airport T2',
        detail: 'Hyundai Verna • MH 02 CD 9912 • Driver: Vikram S.',
        status: 'Driver arriving in 3 mins',
        statusType: 'expected',
        statusDate: 'OTP for start of trip: 5914',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Toll & parking charges included in estimate',
        payAmount: '₹540'
      },
      {
        id: 'ride-402',
        type: 'ride',
        filterCategory: 'Auto',
        title: 'Bandra Kurla Complex to Worli Sea Face',
        detail: '14.2 km • 34 mins • Fare: ₹182',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Trip completed safely at 10:45 AM',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Great',
        ratingStars: 5
      },
      {
        id: 'ride-403',
        type: 'ride',
        filterCategory: 'Premier',
        title: 'Lower Parel to Powai Hiranandani',
        detail: 'Uber Premier Sedan • AC Comfort',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Driver cancelled due to tyre puncture',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹85 Cancellation fee',
        refundMethod: 'UPI'
      },
      {
        id: 'ride-404',
        type: 'ride',
        filterCategory: 'Bike',
        title: 'Andheri West Metro to Versova Beach',
        detail: 'Quick Bike Ride • 3.2 km',
        status: 'Cancelled on Sep 28',
        statusType: 'cancelled',
        statusDate: 'You cancelled within free window',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&auto=format&fit=crop&q=80',
        actionType: 'none'
      }
    ]
  },
  service: {
    title: 'My Services',
    searchPlaceholder: 'Search booked services...',
    banner: {
      brand: 'CityOS',
      partner: 'UrbanCare',
      sub: 'Verified Professionals',
      title: '30-day service revisit warranty',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Cleaning', 'AC Repair', 'Plumbing', 'Salon'],
    items: [
      {
        id: 'serv-501',
        type: 'service',
        filterCategory: 'Cleaning',
        title: 'Full 2BHK Home Deep Cleaning Service',
        detail: '3 Professionals • 4.5 Hours • Eco chemicals',
        status: 'Service scheduled for Oct 13, 10 AM',
        statusType: 'expected',
        statusDate: 'Team lead assigned: Mahesh Shinde',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Pay after job satisfaction guarantee',
        payAmount: '₹1,899'
      },
      {
        id: 'serv-502',
        type: 'service',
        filterCategory: 'AC Repair',
        title: 'Daikin Inverter Split AC Foam Jet Service',
        detail: 'Includes indoor unit wash + outdoor jet cleaning',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Completed with 60-day cooling warranty',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Great',
        ratingStars: 5
      },
      {
        id: 'serv-503',
        type: 'service',
        filterCategory: 'Plumbing',
        title: 'Bathroom Concealed Leakage Repair',
        detail: 'Inspection & washer replacement',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Part not required after diagnosis',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹349 Advance',
        refundMethod: 'UPI'
      }
    ]
  },
  travel: {
    title: 'My Trips',
    searchPlaceholder: 'Search flights, hotels, trains...',
    banner: {
      brand: 'CityOS',
      partner: 'MakeMyTrip',
      sub: 'Free Date Change',
      title: 'Flat ₹1,200 off on holiday bookings',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Flights', 'Hotels', 'Trains', 'Buses'],
    items: [
      {
        id: 'trav-601',
        type: 'travel',
        filterCategory: 'Flights',
        title: 'Mumbai (BOM) -> Goa Dabolim (GOI)',
        detail: 'IndiGo 6E-2419 • Non-stop • 2 Passengers',
        status: 'Departure on Fri Oct 16, 07:45 AM',
        statusType: 'expected',
        statusDate: 'Web check-in opens 48 hrs prior',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Seats and meal pre-booked with PNR 7KL89P',
        payAmount: '₹5,490'
      },
      {
        id: 'trav-602',
        type: 'travel',
        filterCategory: 'Hotels',
        title: 'The Leela Palace Goa Beach Resort',
        detail: 'Lagoon Suite • 3 Nights • Breakfast included',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Stay completed • Invoiced ₹28,400',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Great',
        ratingStars: 5
      },
      {
        id: 'trav-603',
        type: 'travel',
        filterCategory: 'Trains',
        title: 'Vande Bharat Express (Mumbai - Goa)',
        detail: 'Executive Chair Car • PNR 894123847',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Cancelled on Sep 22 • 100% refund approved',
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹3,450',
        refundMethod: 'Bank Account'
      }
    ]
  },
  rent: {
    title: 'My Rentals',
    searchPlaceholder: 'Search rented items...',
    banner: {
      brand: 'CityOS',
      partner: 'Rentomojo',
      sub: 'Zero Deposit Week',
      title: 'Free upgrade on furniture rentals',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Furniture', 'Appliances', 'Vehicles'],
    items: [
      {
        id: 'rent-701',
        type: 'rent',
        filterCategory: 'Appliances',
        title: 'Sony PlayStation 5 Console + 2 DualSense',
        detail: '3 Months Rental Plan • Active till Nov 15',
        status: 'Next renewal on Oct 15',
        statusType: 'expected',
        statusDate: 'Monthly subscription auto-pay active',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Early return option available with 0 penalty',
        payAmount: '₹2,499'
      },
      {
        id: 'rent-702',
        type: 'rent',
        filterCategory: 'Furniture',
        title: 'Ergonomic High-Back Executive Mesh Chair',
        detail: '12 Months Tenancy • Serviced free',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Delivered and assembled at home',
        image: 'https://images.unsplash.com/photo-1580481077194-c71c42903e13?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Good',
        ratingStars: 4
      },
      {
        id: 'rent-703',
        type: 'rent',
        filterCategory: 'Vehicles',
        title: 'Royal Enfield Hunter 350 (Monthly Rental)',
        detail: 'Completed 30 days ride tenure',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Security deposit processed post return check',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹5,000 Deposit',
        refundMethod: 'UPI'
      }
    ]
  },
  cityos: {
    title: 'Activity History',
    searchPlaceholder: 'Search all transactions...',
    banner: {
      brand: 'CityOS',
      partner: 'All-in-One',
      sub: 'One Account, All City Life',
      title: 'Unified ledger for shopping, rides & stays',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80'
    },
    filterTabs: ['All', 'Shopping', 'Rides', 'Services', 'Travel', 'Rent'],
    items: [
      {
        id: 'all-801',
        type: 'shop',
        filterCategory: 'Shopping',
        title: 'Mauua Chair hydraulic Gas lift cylinder',
        detail: 'Order #FK-89410294 • Delivered',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Product delivered safely',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Okay',
        ratingStars: 3
      },
      {
        id: 'all-802',
        type: 'ride',
        filterCategory: 'Rides',
        title: 'Bandra Kurla Complex to Worli Sea Face',
        detail: '14.2 km • Uber Auto',
        status: 'Delivered on Fri Oct 09',
        statusType: 'delivered',
        statusDate: 'Trip completed safely at 10:45 AM',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200&auto=format&fit=crop&q=80',
        actionType: 'review',
        ratingLabel: 'Great',
        ratingStars: 5
      },
      {
        id: 'all-803',
        type: 'service',
        filterCategory: 'Services',
        title: 'Full 2BHK Home Deep Cleaning Service',
        detail: 'Scheduled for Tomorrow, 10 AM',
        status: 'Delivery expected by Oct 13',
        statusType: 'expected',
        statusDate: 'Professional assigned',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&auto=format&fit=crop&q=80',
        actionType: 'pay_cod',
        codPrompt: 'Pay after job satisfaction',
        payAmount: '₹1,899'
      },
      {
        id: 'all-804',
        type: 'travel',
        filterCategory: 'Travel',
        title: 'The Leela Palace Goa Beach Resort',
        detail: 'Stay completed • 3 Nights',
        status: 'Refund Completed',
        statusType: 'refund',
        statusDate: 'Deposit security returned',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80',
        actionType: 'refund_only',
        refundAmount: 'Refund of ₹3,450',
        refundMethod: 'Bank Account'
      }
    ]
  }
};
