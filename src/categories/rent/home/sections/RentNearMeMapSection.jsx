import React, { useState } from 'react';
import { Map, MapPin, Navigation, Eye } from 'lucide-react';

export const RentNearMeMapSection = ({
  items,
  onSelectItem,
  userLocation = 'Rayagada Central'
}) => {
  const [selectedPin, setSelectedPin] = useState(items?.[0] || null);

  const pins = [
    { id: 'rent-prop-1', title: '2 BHK Flat', price: '₹18.5k/mo', top: '35%', left: '42%', type: '🏠' },
    { id: 'rent-veh-1', title: 'Honda Activa', price: '₹350/day', top: '55%', left: '60%', type: '🛵' },
    { id: 'rent-eq-2', title: 'Bosch Hammer', price: '₹450/day', top: '48%', left: '28%', type: '🛠️' },
    { id: 'rent-furn-1', title: 'Queen Bed', price: '₹499/mo', top: '68%', left: '45%', type: '🪑' },
    { id: 'rent-ev-2', title: 'JBL Sound', price: '₹4.5k/ev', top: '25%', left: '72%', type: '🎉' },
  ];

  return (
    <section className="py-2.5 px-4" aria-label="Interactive Map View of Rentals">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <Map className="w-4 h-4 text-[#FF5200]" />
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Live Map: Available Around You
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Tap any pin to view nearby rentals
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          ● Live Active
        </span>
      </div>

      <div className="w-full h-56 rounded-3xl overflow-hidden relative shadow-md border border-slate-200 bg-slate-900">
        {/* Map stylized background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Current user pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-blue-600/30 animate-ping absolute" />
          <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-[9px] font-bold text-white bg-slate-900/90 px-1.5 py-0.5 rounded mt-1 shadow-xs">
            You are here
          </span>
        </div>

        {/* Interactive rental pins */}
        {pins.map((pin) => (
          <button
            key={pin.id}
            type="button"
            onClick={() => {
              const found = items?.find(i => i.id === pin.id);
              if (found) setSelectedPin(found);
            }}
            style={{ top: pin.top, left: pin.left }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform hover:scale-110 active:scale-95 ${
              selectedPin?.id === pin.id ? 'scale-110' : ''
            }`}
          >
            <div className={`px-2 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-lg border transition-colors ${
              selectedPin?.id === pin.id
                ? 'bg-[#FF5200] text-white border-white'
                : 'bg-white text-slate-900 border-slate-200 hover:bg-orange-50'
            }`}>
              <span>{pin.type}</span>
              <span>{pin.price}</span>
            </div>
          </button>
        ))}

        {/* Selected Item Floating Bottom Card */}
        {selectedPin && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-slate-200/80 shadow-xl flex items-center justify-between gap-3 animate-slide-up">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={selectedPin.image}
                alt={selectedPin.title}
                className="w-11 h-11 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider block">
                  {selectedPin.subcategory}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {selectedPin.title}
                </h4>
                <p className="text-[10px] text-slate-600 font-bold">
                  ₹{selectedPin.price.toLocaleString('en-IN')}/{selectedPin.priceUnit} • {selectedPin.distance}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectItem && onSelectItem(selectedPin)}
              className="bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors shrink-0 shadow-xs"
            >
              View
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
