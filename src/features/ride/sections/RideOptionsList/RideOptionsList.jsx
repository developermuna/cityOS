import React, { useState } from 'react';
import { RideOptionCard } from './RideOptionCard';

export const RideOptionsList = ({ showToast }) => {
  const [selectedRide, setSelectedRide] = useState('auto');
  const [booked, setBooked] = useState(false);

  const rideOptions = [
    { id: 'auto', name: 'City Auto', time: '2 mins', price: '₹65', icon: '🛺', desc: 'Fastest in traffic' },
    { id: 'mini', name: 'City Go', time: '3 mins', price: '₹140', icon: '🚗', desc: 'AC hatchback' },
    { id: 'sedan', name: 'City Premier', time: '5 mins', price: '₹210', icon: '🚘', desc: 'Comfortable sedan' },
    { id: 'bike', name: 'Bike Taxi', time: '1 min', price: '₹35', icon: '🛵', desc: 'Super fast' },
  ];

  return (
    <section className="px-4" aria-label="Ride Options">
      <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Choose Your Ride</h3>
      <div className="space-y-3">
        {rideOptions.map((r) => (
          <RideOptionCard 
            key={r.id} 
            ride={r} 
            isSelected={selectedRide === r.id}
            onClick={() => {
              setSelectedRide(r.id);
              if (showToast) showToast(`Selected ${r.name} (${r.price})`);
            }}
          />
        ))}
      </div>

      <button 
        type="button"
        onClick={() => {
          setBooked(true);
          if (showToast) showToast('🚕 Ride Confirmed! Driver arriving in 2 minutes.');
        }}
        className={`w-full mt-6 py-4 rounded-[28px] font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-widest cursor-pointer ${
          booked ? 'bg-emerald-700 text-white shadow-emerald-700/30' : 'bg-[#800020] hover:bg-[#650019] text-white shadow-[#800020]/25'
        }`}
      >
        {booked ? '✓ DISPATCHED • DRIVER ON THE WAY' : 'REQUEST RIDE NOW'}
      </button>
    </section>
  );
};
