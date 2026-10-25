import React from 'react';
import { Clock, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

export const RideHistoryPage = ({ onSelectRide, showToast }) => {
  const pastTrips = [
    {
      id: 'COS-TRIP-9081',
      date: 'Today, 4:15 PM',
      tier: 'Bike Taxi',
      icon: '🛵',
      captain: 'Rajesh Kumar',
      pickup: 'Rayagada Railway Station',
      destination: 'Maa Majhighouri Temple',
      fare: '₹25',
      status: 'Completed',
    },
    {
      id: 'COS-TRIP-8842',
      date: 'Yesterday, 11:30 AM',
      tier: 'Auto Rickshaw',
      icon: '🛺',
      captain: 'Suresh Chandra Mohanty',
      pickup: 'Collectorate Gautam Nagar',
      destination: 'JK Pur Township',
      fare: '₹75',
      status: 'Completed',
    },
    {
      id: 'COS-TRIP-7719',
      date: '21 Oct, 7:45 PM',
      tier: 'Cab Economy',
      icon: '🚗',
      captain: 'Amitabh Pradhan',
      pickup: 'Chekkaguda Bridge',
      destination: 'Station Road Market',
      fare: '₹120',
      status: 'Completed',
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="font-extrabold text-gray-900 text-base">Your Past Trips</h3>
        <span className="text-xs font-semibold text-gray-500">{pastTrips.length} Rides</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {pastTrips.map((trip) => (
          <div
            key={trip.id}
            className="p-3.5 rounded-2xl border border-gray-200/80 bg-white hover:border-gray-300 shadow-xs flex flex-col gap-2 transition-all cursor-pointer"
            onClick={() => showToast && showToast(`Viewing invoice for ${trip.id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{trip.icon}</span>
                <div>
                  <span className="font-bold text-xs text-gray-900 block">{trip.tier}</span>
                  <span className="text-[10px] text-gray-400">{trip.date} • {trip.captain}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-sm text-gray-900">{trip.fare}</span>
                <span className="text-[10px] font-semibold text-emerald-600 flex items-center justify-end gap-0.5 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> {trip.status}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-gray-600 bg-gray-50 rounded-xl p-2 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">{trip.pickup}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span className="truncate">{trip.destination}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
