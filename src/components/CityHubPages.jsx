import React, { useState } from 'react';

// ==========================================
// 1. CITYOS HUB PAGE CONTENT
// ==========================================
export const CityOSHubPageContent = ({ onTabChange }) => {
  return (
    <div className="space-y-6">
      {/* City Live Status Card as a Hero Banner */}
      <div className="px-4">
        <div className="w-full p-5 rounded-[28px] bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-black tracking-wider uppercase text-emerald-300">CityOS Live • Mumbai</span>
            </div>
            <span className="text-[11px] font-bold text-slate-200 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">28°C Partly Cloudy</span>
          </div>
          <h2 className="text-2xl font-black leading-tight">Your City at a Glance</h2>
          <p className="text-sm text-indigo-100/90 mt-1 font-medium italic">Everything you need, in one place.</p>

          <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/20 text-center">
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <div className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Aqua Line 3</div>
              <div className="text-sm font-black text-emerald-300 mt-1">On Time</div>
            </div>
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <div className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">City AQI</div>
              <div className="text-sm font-black text-amber-300 mt-1">58 Mod</div>
            </div>
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <div className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Deals</div>
              <div className="text-sm font-black text-white mt-1">2.4k+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Jump Straight In - MindCategories Style */}
      <div className="w-full">
        <div className="px-4 mb-4">
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Jump Straight In</h3>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'food', label: 'Food', desc: '80% OFF', color: 'from-purple-500 to-indigo-600', icon: '🍔' },
            { id: 'grocery', label: 'Grocery', desc: '10 Mins', color: 'from-emerald-500 to-teal-600', icon: '🛒' },
            { id: 'ride', label: 'Ride', desc: '2 Mins', color: 'from-amber-400 to-orange-600', icon: '🛺' },
            { id: 'shop', label: 'Shop', desc: 'Mega Deals', color: 'from-pink-500 to-rose-600', icon: '🛍️' },
            { id: 'service', label: 'Service', desc: 'Home Care', color: 'from-cyan-500 to-blue-600', icon: '🛠️' },
            { id: 'travel', label: 'Travel', desc: 'Flights', color: 'from-sky-400 to-indigo-600', icon: '✈️' },
            { id: 'rent', label: 'Rent', desc: 'Verified', color: 'from-teal-500 to-emerald-700', icon: '🏠' },
            { id: 'dineout', label: 'Dineout', desc: 'GIRF 50%', color: 'from-violet-500 to-purple-800', icon: '🍽️' },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-200`}>
                {item.icon}
              </div>
              <span className="text-[12px] font-bold text-slate-800 mt-2 tracking-tight group-hover:text-orange-600">
                {item.label}
              </span>
              <span className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Around You - OfferCardsScroll Style */}
      <div className="w-full">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Trending in Mumbai Central</h3>
          <span className="text-xs font-black text-orange-500 uppercase cursor-pointer">View All</span>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth pb-4">
          {[
            { name: 'Bastian Beach Club', desc: 'Sunday Circuit • 4.9 ★', icon: '🎉', color: 'bg-pink-500/10 text-pink-500', tag: 'Trending', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80' },
            { name: 'Burgers at ₹99', desc: 'Flash deal ending soon', icon: '🍔', color: 'bg-amber-500/10 text-amber-500', tag: '80% OFF', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80' },
            { name: 'Apple iPhone 16 Pro', desc: 'Pre-order now open', icon: '📱', color: 'bg-indigo-500/10 text-indigo-500', tag: 'NEW', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80' }
          ].map((item, i) => (
            <div key={i} className="w-[160px] shrink-0 cursor-pointer group flex flex-col">
              <div className="relative w-full h-[180px] rounded-3xl overflow-hidden shadow-md border border-slate-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute top-2 left-2">
                   <span className={`text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur-md bg-white/20 text-white`}>{item.tag}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <h4 className="text-xs font-black leading-tight">{item.name}</h4>
                  <p className="text-[10px] text-slate-300 font-medium">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. SHOP HUB PAGE CONTENT
// ==========================================
export const ShopHubPageContent = () => {
  return (
    <div className="space-y-6">
      {/* Mega Shopping Banner */}
      <div className="px-4">
        <div className="w-full p-5 rounded-[28px] bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="text-[10px] uppercase font-black tracking-widest bg-black/30 px-3 py-1 rounded-full inline-block mb-3 border border-white/20">CityOS Super Shopping Fest</div>
          <h2 className="text-3xl font-black leading-none">UP TO 70% OFF</h2>
          <p className="text-sm text-white/90 font-bold mt-2">Top global brands delivered to your doorstep in 60 mins.</p>
          <button className="mt-5 px-6 py-2 bg-white text-rose-600 font-black rounded-full text-xs shadow-lg active:scale-95 transition-all uppercase tracking-wider">Shop Now</button>
        </div>
      </div>

      {/* Shop Categories - MindCategories Style */}
      <div className="w-full">
        <div className="px-4 mb-4">
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Explore Categories</h3>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { name: 'Fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&auto=format&fit=crop&q=80' },
            { name: 'Gadgets', icon: '🎧', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80' },
            { name: 'Footwear', icon: '👟', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80' },
            { name: 'Watches', icon: '⌚', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&auto=format&fit=crop&q=80' },
            { name: 'Beauty', icon: '💄', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80' },
            { name: 'Home', icon: '🛋️', image: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=300&auto=format&fit=crop&q=80' },
            { name: 'Audio', icon: '🔊', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&auto=format&fit=crop&q=80' },
            { name: 'Gifts', icon: '🎁', image: 'https://images.unsplash.com/photo-1549465220-1d8c9d9c6713?w=300&auto=format&fit=crop&q=80' },
          ].map((c, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 cursor-pointer group">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 shadow-sm border border-slate-200 group-hover:scale-105 active:scale-95 transition-all">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-bold text-slate-800 mt-2 tracking-tight group-hover:text-rose-600 transition-colors">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Deals - Feed Style */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Deal of the Day</h3>
          <span className="text-xs font-black text-rose-500 uppercase cursor-pointer">View All</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Sony WH-1000XM5', price: '₹22,990', strike: '₹29,990', off: '23% OFF', tag: 'Fast Delivery', image: 'https://images.unsplash.com/photo-1618366712277-72212e620e5c?w=400&auto=format&fit=crop&q=80' },
            { name: 'Nike Air Max Pulse', price: '₹7,495', strike: '₹12,995', off: '42% OFF', tag: 'Best Seller', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80' }
          ].map((p, i) => (
            <div key={i} className="flex flex-col bg-slate-50 p-3 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-32 rounded-2xl overflow-hidden mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full self-start mb-2">{p.tag}</span>
              <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1 leading-tight">{p.name}</h4>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-base font-black text-slate-900">{p.price}</span>
                <span className="text-[10px] text-slate-400 line-through font-bold">{p.strike}</span>
              </div>
              <button className="w-full mt-3 py-2.5 rounded-xl bg-slate-900 text-white text-[11px] font-black active:scale-95 transition-all">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SERVICE HUB PAGE CONTENT
// ==========================================
export const ServiceHubPageContent = () => {
  return (
    <div className="space-y-6">
      <div className="px-4">
        <div className="w-full p-5 rounded-[28px] bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <span className="text-xl">🛠️</span>
             </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest bg-black/25 px-3 py-1 rounded-full inline-block mb-3 border border-white/20">Verified Experts at Home</div>
          <h2 className="text-2xl font-black leading-tight">Book Professional Services</h2>
          <p className="text-sm text-white/90 mt-2 font-medium">AC repair, deep cleaning, electrician & salon in 30 mins.</p>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Top Rated Services</h3>
        <div className="space-y-4">
          {[
            { title: 'AC Jet Cleaning & Service', time: 'Arrives in 25 mins', price: '₹499', rating: '4.8 ★ (12k)', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?w=200&auto=format&fit=crop&q=80' },
            { title: 'Full Home Deep Cleaning', time: 'Next slot at 11 AM', price: '₹1,499', rating: '4.9 ★ (8k)', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=200&auto=format&fit=crop&q=80' },
            { title: 'Instant Electrician / Plumber', time: 'Arrives in 15 mins', price: '₹199', rating: '4.7 ★ (22k)', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80' },
          ].map((s, i) => (
            <div key={i} className="flex bg-slate-50 p-4 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 leading-tight">{s.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-cyan-600 font-black uppercase tracking-tighter">{s.time}</span>
                    <span className="text-[11px] text-slate-400 font-bold">• {s.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-black text-slate-900">{s.price}</span>
                  <button className="px-6 py-1.5 rounded-xl bg-cyan-600 text-white text-[11px] font-black active:scale-95 shadow-md shadow-cyan-600/20">
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. RIDE HUB PAGE CONTENT
// ==========================================
export const RideHubPageContent = () => {
  const [selectedRide, setSelectedRide] = useState('auto');
  const [booked, setBooked] = useState(false);

  return (
    <div className="space-y-6">
      <div className="px-4">
        <div className="w-full p-4 rounded-[28px] bg-slate-50 border-2 border-slate-100 shadow-inner">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PICKUP</span>
                <span className="text-sm font-bold text-slate-900 leading-tight">Mumbai Central Railway Station</span>
              </div>
            </div>
            <div className="ml-1 w-[1px] h-6 bg-slate-200 border-dashed border-l-2 ml-[4.5px]" />
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DESTINATION</span>
                <input 
                  type="text" 
                  defaultValue="BKC, Bandra East, Mumbai"
                  className="bg-transparent text-sm font-bold text-slate-900 outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Choose Your Ride</h3>
        <div className="space-y-3">
          {[
            { id: 'auto', name: 'City Auto', time: '2 mins', price: '₹65', icon: '🛺', desc: 'Fastest in traffic' },
            { id: 'mini', name: 'City Go', time: '3 mins', price: '₹140', icon: '🚗', desc: 'AC hatchback' },
            { id: 'sedan', name: 'City Premier', time: '5 mins', price: '₹210', icon: '🚘', desc: 'Comfortable sedan' },
            { id: 'bike', name: 'Bike Taxi', time: '1 min', price: '₹35', icon: '🛵', desc: 'Super fast' },
          ].map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRide(r.id)}
              className={`p-4 rounded-[28px] border-2 transition-all flex items-center justify-between cursor-pointer ${
                selectedRide === r.id 
                  ? 'bg-amber-50 border-amber-400 shadow-md ring-4 ring-amber-400/10' 
                  : 'bg-white border-slate-100 text-slate-800 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{r.icon}</div>
                <div>
                  <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    {r.name}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">{r.time} • {r.desc}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-slate-900">{r.price}</div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setBooked(true)}
          className={`w-full mt-6 py-4 rounded-[28px] font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-widest ${
            booked ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {booked ? '✓ DISPATCHED' : 'REQUEST RIDE'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. TRAVEL HUB PAGE CONTENT
// ==========================================
export const TravelHubPageContent = () => {
  return (
    <div className="space-y-6">
      <div className="px-4">
        <div className="w-full p-5 rounded-[28px] bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-6xl opacity-20">✈️</div>
          <div className="text-[10px] font-black uppercase tracking-widest bg-black/25 px-3 py-1 rounded-full inline-block mb-3 border border-white/20">CityOS Travel</div>
          <h2 className="text-2xl font-black leading-tight">Flights, Hotels & Holidays</h2>
          <p className="text-sm text-white/90 mt-2 font-medium italic">Zero convenience fee on your first booking.</p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { label: 'Flights', icon: '✈️', color: 'bg-blue-500' },
            { label: 'Hotels', icon: '🏨', color: 'bg-emerald-500' },
            { label: 'Trains', icon: '🚆', color: 'bg-amber-500' },
            { label: 'Buses', icon: '🚌', color: 'bg-indigo-500' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 cursor-pointer group">
              <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-105 active:scale-95 transition-all`}>
                {item.icon}
              </div>
              <span className="text-[12px] font-black text-slate-800 mt-2 tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Weekend Getaways</h3>
        <div className="space-y-4 pb-4">
          {[
            { place: 'Goa Beach Resort', type: 'Flight + 3 Nights Hotel', price: '₹8,999/p', tag: 'TOP PICK', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80' },
            { place: 'Lonavala Villa', type: 'Private Pool & Scenic View', price: '₹4,499/n', tag: '2 HRS AWAY', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80' },
          ].map((p, i) => (
            <div key={i} className="flex bg-slate-50 p-4 rounded-[28px] border border-slate-100 shadow-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                <img src={p.image} alt={p.place} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-between py-0.5">
                <div>
                  <span className="text-[9px] font-black bg-cyan-600 text-white px-2 py-0.5 rounded-full">{p.tag}</span>
                  <h4 className="text-[14px] font-black text-slate-900 mt-1.5 leading-tight">{p.place}</h4>
                  <p className="text-[11px] text-slate-500 font-bold">{p.type}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-black text-cyan-600">{p.price}</span>
                  <button className="px-5 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-black active:scale-95 uppercase">
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. RENT HUB PAGE CONTENT
// ==========================================
export const RentHubPageContent = () => {
  return (
    <div className="space-y-6">
      <div className="px-4">
        <div className="w-full p-5 rounded-[28px] bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 rotate-12">🏠</div>
          <div className="text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full inline-block mb-3 border border-white/20">CityOS Rentals</div>
          <h2 className="text-2xl font-black leading-tight">Rent Flats & Furniture</h2>
          <p className="text-sm text-white/90 mt-2 font-medium">Verified homes with zero brokerage & easy rentals.</p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { label: 'Flats', icon: '🏢', image: 'https://images.unsplash.com/photo-1545324418-f1d3c5b53574?w=300&auto=format&fit=crop&q=80' },
            { label: 'Bikes', icon: '🛵', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=300&auto=format&fit=crop&q=80' },
            { label: 'Furniture', icon: '🛋️', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&auto=format&fit=crop&q=80' },
            { label: 'Appliance', icon: '📺', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=80' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:scale-105 active:scale-95 transition-all">
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-black text-slate-800 mt-2 tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-8">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Verified Listings</h3>
        <div className="space-y-4">
          {[
            { title: '1 BHK Furnished • Bandra', rent: '₹34k/mo', deposit: '1 Month Dep', tag: 'SEA FACING', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop&q=80' },
            { title: 'Honda Activa 6G', rent: '₹2.5k/mo', deposit: 'Free Service', tag: 'IMMEDIATE', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=400&auto=format&fit=crop&q=80' }
          ].map((item, i) => (
            <div key={i} className="flex bg-slate-50 p-4 rounded-[28px] border border-slate-100 shadow-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-between py-0.5">
                <div>
                  <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">{item.tag}</span>
                  <h4 className="text-[14px] font-black text-slate-900 mt-1.5 leading-tight">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-bold">{item.deposit}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-black text-emerald-600">{item.rent}</span>
                  <button className="px-5 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-black active:scale-95 uppercase">
                    INQUIRE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
