import React from 'react';
import { MapPin, Navigation, Truck, Package } from 'lucide-react';

export const RentalLocationSection = ({ item }) => {
  if (!item) return null;

  return (
    <section className="px-4 py-2 space-y-3" aria-label="Location and Pickup">
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF5200]" /> Pickup & Location
            </h3>
            <p className="text-xs text-slate-700 font-semibold">{item.location}</p>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <Navigation className="w-3 h-3 text-emerald-600" /> Approx. {item.distance} from your location
            </p>
          </div>
        </div>

        {/* Small map snapshot */}
        <div className="w-full h-32 rounded-xl overflow-hidden relative border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
            alt="Location Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5200] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Pickup Hub
          </div>
        </div>

        {/* Delivery Options */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block text-[11px]">Self Pickup</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Free from Hub</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block text-[11px]">Doorstep Delivery</span>
              <span className="text-[10px] text-slate-500 font-semibold">
                {item.deliveryFee > 0 ? `₹${item.deliveryFee}` : 'Free Delivery'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
