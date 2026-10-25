import React from 'react';
import { VEHICLE_TIERS } from '@/features/ride/constants/ride.constants';

export const RideTypeSelector = ({
  selectedRide = 'bike',
  onSelectRide,
  estimatedFares = {},
  routeDistanceKm = 0,
}) => {
  const tiers = Object.values(VEHICLE_TIERS);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Choose Ride Option
        </span>
        {routeDistanceKm > 0 && (
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {routeDistanceKm} km trip
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {tiers.map((tier) => {
          const isSelected = selectedRide === tier.id;
          const fareInfo = estimatedFares[tier.id];
          const finalPrice = fareInfo?.finalFare || tier.minFare;
          const originalPrice = fareInfo?.grossFare || Math.round(finalPrice * 1.3);

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onSelectRide && onSelectRide(tier.id)}
              className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 border ${
                isSelected
                  ? 'border-black bg-gray-50/90 shadow-sm ring-1 ring-black/5'
                  : 'border-gray-200/80 bg-white hover:border-gray-300 hover:bg-gray-50/40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform ${
                    isSelected ? 'scale-110 bg-white shadow-xs' : 'bg-gray-100'
                  }`}
                >
                  {tier.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{tier.name}</span>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      {tier.capacity} {tier.capacity === 1 ? 'seat' : 'seats'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{tier.tagline}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1.5">
                  {originalPrice > finalPrice && (
                    <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
                  )}
                  <span className="font-extrabold text-base text-gray-900">₹{finalPrice}</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-600 block mt-0.5">
                  ⚡ 2-4 min away
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
