// Mock data extracted with 100% precision from cityOS home page & instamart screenshots

export const foodTabs = [
  { id: 'food', label: 'Food', badge: null, active: true },
  { id: 'instamart', label: 'Instamart', badge: '9 mins', active: false },
  { id: 'dineout', label: 'Dineout', badge: null, active: false },
  { id: 'scenes', label: 'Scenes', badge: null, active: false }
];

export const searchPlaceholders = [
  "Search for 'EatRight'",
  "Search for 'Biryani'",
  "Search for 'Pizza'",
  "Search for 'Chinese Wok'",
  "Search for 'Belgian Waffle'"
];

export const topOfferCards = [
  {
    id: 1,
    title: "Zulu's Pizza - Fr...",
    fullName: "Zulu's Pizza - Fresh Fanatics",
    rating: "4.5",
    time: "20-30 mins",
    cuisine: "Pizzas",
    badge: "ITEMS AT ₹39",
    isAd: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Amar Veg Rest...",
    fullName: "Amar Veg Restaurant",
    rating: "4.3",
    time: "25-30 mins",
    cuisine: "Street Food",
    badge: "ITEMS AT ₹79",
    isAd: false,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Nom Nom Expr...",
    fullName: "Nom Nom Express",
    rating: "3.9",
    time: "30-40 mins",
    cuisine: "Pan-asian",
    badge: "70% OFF UPTO ₹130",
    isAd: true,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80"
  }
];

export const store99Items = [
  {
    id: 'store-1',
    name: "Chicken Manchurian ...",
    fullName: "Chicken Manchurian Fried Rice Combo",
    isVeg: false,
    originalPrice: 199,
    dealPrice: 99,
    rating: "4",
    reviews: "92",
    restaurant: "Byculla Chines...",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 'store-2',
    name: "Veg Classic Steam Momo",
    fullName: "Veg Classic Steamed Momo (6 pcs)",
    isVeg: true,
    originalPrice: 169,
    dealPrice: 68,
    rating: "3.6",
    reviews: "16",
    restaurant: "Momo Kraft",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 'store-3',
    name: "Pepper Barbecue Ch...",
    fullName: "Pepper Barbecue Chicken Pizza",
    isVeg: false,
    originalPrice: 125,
    dealPrice: 95,
    rating: "4.3",
    reviews: "48",
    restaurant: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 'store-4',
    name: "Crispy Paneer Burger",
    fullName: "Crispy Maharaja Paneer Burger",
    isVeg: true,
    originalPrice: 149,
    dealPrice: 89,
    rating: "4.2",
    reviews: "110",
    restaurant: "Wendy's Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80"
  }
];

export const mindCategories = [
  {
    id: 'sweets',
    name: "Corner",
    badgeTitle: "Sweets",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 'pizzas',
    name: "Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 'burgers',
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 'cakes',
    name: "Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 'icecream',
    name: "Ice Cre...",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 'biryani',
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 'chinese',
    name: "Noodles",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&auto=format&fit=crop&q=80"
  }
];

export const featuredRestaurants = [
  {
    id: 'res-1',
    name: "Chinese Wok",
    speciality: "Best in Chinese",
    rating: "4.0",
    reviewCount: "12K+",
    location: "SAAT RASAT, 1.4 km",
    cuisines: "Chinese, Asian",
    priceForTwo: "₹250 for two",
    discount: "70% off upto ₹140",
    deliveryTime: "20-25 MINS",
    isPromoted: false,
    hasBolt: false,
    images: [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 'res-2',
    name: "The Belgian Waffle Co.",
    speciality: "Best in Cakes & Desserts",
    rating: "4.4",
    reviewCount: "9.3K+",
    location: "Mumbai Central, 0.3 km",
    cuisines: "Waffle, Desserts",
    priceForTwo: "₹200 for two",
    discount: "20% off upto ₹50",
    deliveryTime: "15-20 MINS",
    isPromoted: false,
    hasBolt: false,
    images: [
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 'res-3',
    name: "Zulu's Pizza - Fresh Fanatics",
    speciality: "Best in Newcomer",
    rating: "4.5",
    reviewCount: "245",
    location: "Mahalaxmi Malabar Hill, 0.7 km",
    cuisines: "Pizzas, Fast Food",
    priceForTwo: "₹300 for two",
    discount: "Items at ₹39",
    deliveryTime: "20-30 MINS",
    isPromoted: false,
    hasBolt: true,
    boltText: "Food in 10-15 min",
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80"
    ]
  }
];

export const instamartData = {
  heroBanner: {
    title: "Let The Sweetness Triumph!",
    subtitle: "Get premium, ghee-rich sweet boxes for your faves!",
    tag: "POWERED BY NOICE",
    button: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&auto=format&fit=crop&q=80"
  },
  freshStore: [
    {
      id: 'im-1',
      brand: "NOICE",
      name: "NOICE Fresh Malai Paneer (Handmade Daily)",
      weight: "200 g",
      price: 109,
      originalPrice: 129,
      discount: "15% OFF",
      rating: "4.4 (19.2k)",
      time: "8 MINS",
      tag: "Made in Small Batc...",
      subTag: "Softer Paneer",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 'im-2',
      brand: "D'lecta",
      name: "D'lecta Shredded Mozzarella Cheese",
      weight: "140 g",
      price: 95,
      originalPrice: 119,
      discount: "20% OFF",
      rating: "4.5 (21.2k)",
      time: "8 MINS",
      image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 'im-3',
      brand: "Epigamia",
      name: "Epigamia Chocolate Turbo Protein Milkshake",
      weight: "250 ml",
      price: 99,
      originalPrice: 140,
      discount: "29% OFF",
      rating: "4.2 (6.7k)",
      time: "8 MINS",
      tag: "25g Protein/pack",
      subTag: "No Added Sugar",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80"
    }
  ],
  farmToDoor: [
    {
      id: 'fd-1',
      name: "Indian Tomato (Tamatar)",
      weight: "500 g",
      price: 23,
      originalPrice: 29,
      discount: "20% OFF",
      time: "8 MINS",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 'fd-2',
      name: "Onion (Kanda)",
      weight: "1 kg",
      price: 67,
      originalPrice: 84,
      discount: "20% OFF",
      time: "8 MINS",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 'fd-3',
      name: "Potato (Batata)",
      weight: "1 kg",
      price: 30,
      originalPrice: 38,
      discount: "21% OFF",
      time: "8 MINS",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80"
    }
  ],
  categories: [
    { name: "Fresh Vegetables", icon: "🥦" },
    { name: "Fresh Fruits", icon: "🍎" },
    { name: "Dairy, Bread & Eggs", icon: "🥛" },
    { name: "Meat & Seafood", icon: "🥩" },
    { name: "Atta, Rice & Dal", icon: "🌾" },
    { name: "Masalas", icon: "🌶️" },
    { name: "Oils & Ghee", icon: "🫒" },
    { name: "Cereals & Breakfast", icon: "🥣" },
    { name: "Cold Drinks & Juices", icon: "🥤" },
    { name: "Ice Creams & Frozen", icon: "🍨" },
    { name: "Chips & Namkeens", icon: "🍟" },
    { name: "Chocolates", icon: "🍫" }
  ]
};
