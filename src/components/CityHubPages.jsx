import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  ChevronRight, 
  CheckCircle,
  Zap,
  Building,
  Plane,
  Car,
  Wrench,
  ShoppingBag,
  Home,
  Tag
} from 'lucide-react';
import { Header } from './Header';

// ==========================================
// 1. CITYOS HUB PAGE
// ==========================================
export const CityOSHubPage = ({ onTabChange, onMenuClick, onLocationClick }) => {
  return (
    <div className="w-full bg-[#0a0518] min-h-screen text-white pb-16 select-none">
      {/* Unified Header */}
      <div className="w-full bg-[#0c041d]">
        <Header 
          activeTab="cityos"
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
          onLocationClick={onLocationClick}
          theme="dark"
        />
      </div>

      <div className="page-transition px-4 pt-3 pb-8 space-y-4">
        {/* City Live Status Card */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-purple-950/40 to-slate-900 border border-indigo-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">CityOS Live • Mumbai</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">28°C Partly Cloudy</span>
          </div>
          <h2 className="text-xl font-black mt-2 text-white">Your City at a Glance</h2>
          <p className="text-xs text-indigo-200/80 mt-0.5">Explore food, shopping, rides & everyday local services.</p>

          <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-white/10 text-center">
            <div className="bg-white/5 p-2 rounded-xl">
              <div className="text-[10px] text-slate-400 font-semibold">Aqua Line 3</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">On Time</div>
            </div>
            <div className="bg-white/5 p-2 rounded-xl">
              <div className="text-[10px] text-slate-400 font-semibold">City AQI</div>
              <div className="text-xs font-bold text-amber-400 mt-0.5">58 Moderate</div>
            </div>
            <div className="bg-white/5 p-2 rounded-xl">
              <div className="text-[10px] text-slate-400 font-semibold">Active Deals</div>
              <div className="text-xs font-bold text-indigo-300 mt-0.5">2,480+</div>
            </div>
          </div>
        </div>

        {/* Quick Hub Shortcuts */}
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-2.5">Jump Straight In</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'food', label: 'Food', desc: '80% OFF', color: 'from-purple-600 to-indigo-600' },
              { id: 'grocery', label: 'Grocery', desc: '10 Mins', color: 'from-emerald-600 to-teal-600' },
              { id: 'ride', label: 'Ride', desc: '2 Mins', color: 'from-amber-500 to-orange-600' },
              { id: 'shop', label: 'Shop', desc: 'Mega Deals', color: 'from-pink-600 to-rose-600' },
              { id: 'service', label: 'Service', desc: 'Home Care', color: 'from-cyan-600 to-blue-600' },
              { id: 'travel', label: 'Travel', desc: 'Flights', color: 'from-sky-500 to-indigo-600' },
              { id: 'rent', label: 'Rent', desc: 'Verified', color: 'from-teal-600 to-emerald-700' },
              { id: 'food', label: 'Dineout', desc: 'GIRF 50%', color: 'from-violet-600 to-purple-800' },
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all text-left"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-black shadow-md`}>
                  {item.label[0]}
                </div>
                <span className="text-[11px] font-bold text-white mt-1.5">{item.label}</span>
                <span className="text-[9px] text-indigo-300 font-medium">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Around You */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Trending in Mumbai Central</span>
            <span className="text-[10px] text-indigo-300 font-semibold cursor-pointer">View All</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">🎉</div>
                <div>
                  <div className="text-xs font-bold text-white">Bastian Beach Club</div>
                  <div className="text-[10px] text-slate-400">Sunday Circuit • 4.9 ★</div>
                </div>
              </div>
              <span className="text-[10px] bg-pink-600 text-white font-bold px-2 py-0.5 rounded-md">Trending</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">🍔</div>
                <div>
                  <div className="text-xs font-bold text-white">Burgers at ₹99</div>
                  <div className="text-[10px] text-slate-400">Flash deal ending soon</div>
                </div>
              </div>
              <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-md">80% OFF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. SHOP HUB PAGE
// ==========================================
export const ShopHubPage = ({ onTabChange, onMenuClick, onLocationClick }) => {
  return (
    <div className="w-full bg-[#0a0518] min-h-screen text-white pb-16 select-none">
      <div className="w-full bg-[#0c041d]">
        <Header 
          activeTab="shop"
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
          onLocationClick={onLocationClick}
          theme="dark"
        />
      </div>

      <div className="page-transition px-4 pt-3 pb-8 space-y-4">
        {/* Search */}
        <div className="w-full bg-white/10 rounded-2xl h-11 px-3.5 flex items-center border border-white/10">
          <Search size={18} className="text-slate-400 mr-2.5" />
          <input 
            type="text" 
            placeholder="Search electronics, fashion, beauty..." 
            className="bg-transparent text-sm text-white placeholder-slate-400 outline-none w-full"
          />
        </div>

        {/* Promo Banner */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-xl relative overflow-hidden">
          <div className="text-[10px] uppercase font-black tracking-widest bg-black/25 px-2 py-0.5 rounded inline-block">CityOS Super Shopping Fest</div>
          <h2 className="text-2xl font-black mt-1">UP TO 70% OFF</h2>
          <p className="text-xs text-white/90 font-medium">Top global brands delivered to your doorstep in 60 mins.</p>
        </div>

        {/* Shop Categories */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { name: 'Fashion', icon: '👗' },
            { name: 'Gadgets', icon: '🎧' },
            { name: 'Footwear', icon: '👟' },
            { name: 'Watches', icon: '⌚' },
            { name: 'Beauty', icon: '💄' },
            { name: 'Home Decor', icon: '🛋️' },
            { name: 'Audio', icon: '🔊' },
            { name: 'Gifts', icon: '🎁' },
          ].map((c, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-[11px] font-bold text-slate-200">{c.name}</div>
            </div>
          ))}
        </div>

        {/* Trending Deals */}
        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-2">Deal of the Day</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Sony WH-1000XM5', price: '₹22,990', strike: '₹29,990', off: '23% OFF', tag: 'Fast Delivery' },
              { name: 'Nike Air Max Pulse', price: '₹7,495', strike: '₹12,995', off: '42% OFF', tag: 'Best Seller' }
            ].map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">{p.tag}</span>
                  <h4 className="text-xs font-bold text-white mt-1.5 line-clamp-1">{p.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm font-black text-rose-400">{p.price}</span>
                    <span className="text-[10px] text-slate-400 line-through">{p.strike}</span>
                  </div>
                </div>
                <button className="w-full mt-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold active:scale-95 transition-all">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SERVICE HUB PAGE
// ==========================================
export const ServiceHubPage = ({ onTabChange, onMenuClick, onLocationClick }) => {
  return (
    <div className="w-full bg-[#0a0518] min-h-screen text-white pb-16 select-none">
      <div className="w-full bg-[#0c041d]">
        <Header 
          activeTab="service"
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
          onLocationClick={onLocationClick}
          theme="dark"
        />
      </div>

      <div className="page-transition px-4 pt-3 pb-8 space-y-4">
        {/* Banner */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 text-white shadow-xl">
          <div className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded inline-block">Verified Experts at Home</div>
          <h2 className="text-xl font-black mt-1">Book Professional Services</h2>
          <p className="text-xs text-white/90 mt-0.5">AC repair, deep cleaning, electrician & salon in 30 mins.</p>
        </div>

        {/* Services List */}
        <div className="space-y-2.5">
          {[
            { title: 'AC Jet Cleaning & Service', time: 'Arrives in 25 mins', price: '₹499', rating: '4.8 ★ (12k)' },
            { title: 'Full Home Deep Cleaning', time: 'Next slot at 11 AM', price: '₹1,499', rating: '4.9 ★ (8k)' },
            { title: 'Instant Electrician / Plumber', time: 'Arrives in 15 mins', price: '₹199', rating: '4.7 ★ (22k)' },
            { title: 'Salon & Spa for Women / Men', time: 'Certified Stylist', price: '₹599', rating: '4.9 ★ (15k)' },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
              <div>
                <h4 className="text-xs font-bold text-white">{s.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-cyan-300 font-semibold">{s.time}</span>
                  <span className="text-[10px] text-slate-400">• {s.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-cyan-400">{s.price}</div>
                <button className="mt-1 px-3 py-1 rounded-lg bg-cyan-600 text-white text-[11px] font-bold hover:bg-cyan-500 active:scale-95 transition-all">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. RIDE HUB PAGE
// ==========================================
export const RideHubPage = ({ onTabChange, onMenuClick, onLocationClick }) => {
  const [selectedRide, setSelectedRide] = useState('auto');
  const [booked, setBooked] = useState(false);

  return (
    <div className="w-full bg-[#0a0518] min-h-screen text-white pb-16 select-none">
      <div className="w-full bg-[#0c041d]">
        <Header 
          activeTab="ride"
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
          onLocationClick={onLocationClick}
          theme="dark"
        />
      </div>

      <div className="page-transition px-4 pt-3 pb-8 space-y-4">
        {/* Where to Input Box */}
        <div className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Mumbai Central Railway Station</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <input 
              type="text" 
              placeholder="Where to? (e.g. Bandra Kurla Complex)" 
              className="bg-transparent text-xs text-white placeholder-slate-400 outline-none w-full font-medium"
              defaultValue="BKC, Bandra East, Mumbai"
            />
          </div>
        </div>

        {/* Ride Options */}
        <div className="space-y-2">
          {[
            { id: 'auto', name: 'City Auto', time: '2 mins away', price: '₹65', icon: '🛺', desc: 'Fastest in traffic' },
            { id: 'mini', name: 'City Go (Mini)', time: '3 mins away', price: '₹140', icon: '🚗', desc: 'AC hatchback' },
            { id: 'sedan', name: 'City Premier', time: '5 mins away', price: '₹210', icon: '🚘', desc: 'Comfortable sedan' },
            { id: 'bike', name: 'City Bike Taxi', time: '1 min away', price: '₹35', icon: '🛵', desc: 'Super fast & affordable' },
          ].map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRide(r.id)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedRide === r.id 
                  ? 'bg-amber-500/15 border-amber-400 text-white shadow-md' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    {r.name}
                    {selectedRide === r.id && <CheckCircle size={12} className="text-amber-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400">{r.time} • {r.desc}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-amber-400">{r.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setBooked(true)}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-sm active:scale-95 transition-all shadow-lg"
        >
          {booked ? '✓ Driver Dispatched (2 mins away)' : 'Confirm & Request Ride'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. TRAVEL HUB PAGE
// ==========================================
export const TravelHubPage = ({ onTabChange, onMenuClick, onLocationClick }) => {
  return (
    <div className="w-full bg-[#0a0518] min-h-screen text-white pb-16 select-none">
      <div className="w-full bg-[#0c041d]">
        <Header 
          activeTab="travel"
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
          onLocationClick={onLocationClick}
          theme="dark"
        />
      </div>

      <div className="page-transition px-4 pt-3 pb-8 space-y-4">
        {/* Banner */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-xl">
          <div className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded inline-block">CityOS Travel</div>
          <h2 className="text-xl font-black mt-1">Flights, Hotels & Holidays</h2>
          <p className="text-xs text-white/90 mt-0.5">Zero convenience fee on your first booking with CityOS.</p>
        </div>

        {/* Quick Travel Services */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Flights', icon: '✈️' },
            { label: 'Hotels', icon: '🏨' },
            { label: 'Trains', icon: '🚆' },
            { label: 'Buses', icon: '🚌' }
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-bold text-white">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Weekend Getaways */}
        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-2">Weekend Escapes from Mumbai</h3>
          <div className="space-y-2.5">
            {[
              { place: 'Goa Beach Resort', type: 'Flight + 3 Nights Hotel', price: '₹8,999/person', tag: 'Top Pick' },
              { place: 'Lonavala Luxury Villa', type: 'Private Pool & Scenic View', price: '₹4,499/night', tag: '2 hrs away' },
            ].map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">{p.tag}</span>
                  <h4 className="text-xs font-bold text-white mt-1">{p.place}</h4>
                  <p className="text-[10px] text-slate-400">{p.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-cyan-300">{p.price}</div>
                  <button className="mt-1 px-3 py-1 rounded-lg bg-cyan-600 text-white text-[11px] font-bold">Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. RENT HUB PAGE
// ==========================================
export const RentHubPage = ({ onTabChange, onMenuClick, onLocationClick }) => {
  return (
    <div className="w-full bg-[#0a0518] min-h-screen text-white pb-16 select-none">
      <div className="w-full bg-[#0c041d]">
        <Header 
          activeTab="rent"
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
          onLocationClick={onLocationClick}
          theme="dark"
        />
      </div>

      <div className="page-transition px-4 pt-3 pb-8 space-y-4">
        {/* Banner */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl">
          <div className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded inline-block">CityOS Rentals</div>
          <h2 className="text-xl font-black mt-1">Rent Flats, Bikes & Furniture</h2>
          <p className="text-xs text-white/90 mt-0.5">Verified homes with zero brokerage & monthly bike rentals.</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Flats', icon: '🏢' },
            { label: 'Bikes', icon: '🛵' },
            { label: 'Furniture', icon: '🛋️' },
            { label: 'Appliance', icon: '📺' }
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-bold text-white">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Listings */}
        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-2">Verified Rental Properties</h3>
          <div className="space-y-2.5">
            {[
              { title: '1 BHK Furnished Flat • Bandra West', rent: '₹34,000/mo', deposit: '1 Month Deposit', tag: 'Sea Facing' },
              { title: '2 BHK Luxury Apartment • Worli', rent: '₹58,000/mo', deposit: 'Zero Brokerage', tag: 'High Rise' },
              { title: 'Honda Activa 6G Scooter', rent: '₹2,499/mo', deposit: 'Free Helmet & Service', tag: 'Immediate Delivery' }
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">{item.tag}</span>
                  <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-400">{item.deposit}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">{item.rent}</div>
                  <button className="mt-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500 active:scale-95 transition-all">
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
