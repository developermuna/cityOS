import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { RideBookingPage } from '../RideBookingPage/RideBookingPage';
import { OlaMapView } from '@/components/OlaMapView';
import { DEFAULT_COORDINATES, reverseGeocode, fetchRouteDirections } from '@/services/olaMapsService';

export const RideHome = ({ 
  showToast, 
  onBookingModeChange, 
  savedAddresses = [], 
  onToggleFavorite,
  ridePickup,
  setRidePickup,
  rideDestination,
  setRideDestination
}) => {
  const pickupQuery = ridePickup;
  const setPickupQuery = setRidePickup;
  const destinationQuery = rideDestination;
  const setDestinationQuery = setRideDestination;

  const [pickupCoord, setPickupCoord] = useState([83.4147, 19.1678]); // [lng, lat] Station Road
  const [destCoord, setDestCoord] = useState(null); // [lng, lat]
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isBookingPageOpen, setIsBookingPageOpen] = useState(false);
  const [mapTheme, setMapTheme] = useState('standard');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const placeCategories = [
    { id: 'all', label: 'All', icon: '📍' },
    { id: 'saved', label: 'Saved Address', icon: '❤️', prominent: true },
    { id: 'govt', label: 'Govt Offices', icon: '🏛️' },
    { id: 'tourist', label: 'Tourist Spots', icon: '🌺' },
    { id: 'nearby', label: 'Nearby Towns', icon: '🏙️' },
    { id: 'transit', label: 'Transit Hubs', icon: '🚌' },
    { id: 'local', label: 'Local Spots', icon: '🏫' },
  ];

  const rayagadaPlaces = [
    // Govt Offices
    {
      id: 'collectorate',
      category: 'govt',
      title: 'District Collectorate Rayagada',
      subtitle: 'Gautam Nagar, Main Administrative Block, Rayagada',
      badge: 'Govt Office',
      icon: '🏛️',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'sp-office',
      category: 'govt',
      title: 'SP Office Rayagada',
      subtitle: 'Police Line Road, Station Colony, Rayagada',
      badge: 'Govt Office',
      icon: '🚓',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'drda-office',
      category: 'govt',
      title: 'DRDA & Sub-Collector Office',
      subtitle: 'Subash Bose Road, New Colony, Rayagada',
      badge: 'Govt Office',
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'tehsil-rto',
      category: 'govt',
      title: 'Rayagada Tehsil & RTO Office',
      subtitle: 'JK Pur Highway Junction, Rayagada',
      badge: 'Govt Office',
      icon: '📋',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
    },

    // Tourist Places
    {
      id: 'majhighouri',
      category: 'tourist',
      title: 'Maa Majhighouri Temple',
      subtitle: 'Main Temple Road, Town Center, Rayagada',
      badge: 'Famous Temple',
      icon: '🌺',
      image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'hanging-bridge',
      category: 'tourist',
      title: 'Chekkaguda Hanging Bridge',
      subtitle: 'Nagavali River Riverside Park, Rayagada',
      badge: 'Scenic Spot',
      icon: '🌉',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'devagiri',
      category: 'tourist',
      title: 'Devagiri Hill Cave Temple',
      subtitle: '400ft Hill Cave Shrine, Kalyansingpur Rd',
      badge: 'Tourist Spot',
      icon: '⛰️',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'hatipathar',
      category: 'tourist',
      title: 'Hatipathar Waterfalls',
      subtitle: 'Nagavali River Rock Boulders & Picnic Spot',
      badge: 'Waterfall',
      icon: '🌊',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&auto=format&fit=crop&q=80'
    },

    // Nearby Places & Towns
    {
      id: 'jk-pur',
      category: 'nearby',
      title: 'JK Pur Industrial Township',
      subtitle: 'Paper Mill Colony & Market (10 km from town)',
      badge: '10 km away',
      icon: '🏭',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'gunupur',
      category: 'nearby',
      title: 'Gunupur Town & Sub-Division',
      subtitle: 'Vamsadhara River Basin Hub (65 km away)',
      badge: '65 km away',
      icon: '🏙️',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'muniguda',
      category: 'nearby',
      title: 'Muniguda Station Town',
      subtitle: 'Major Intercity Junction & Market (55 km)',
      badge: '55 km away',
      icon: '🚆',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'bisam-cuttack',
      category: 'nearby',
      title: 'Bisam Cuttack (Christian Hospital)',
      subtitle: 'Health Hub & Niyamgiri Foothills (45 km)',
      badge: '45 km away',
      icon: '🏥',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80'
    },

    // Transit Hubs
    {
      id: 'airport',
      category: 'transit',
      title: 'Rayagada Airstrip / Airport Feeder',
      subtitle: 'Air Transit Hub, SH-18, Rayagada',
      badge: 'Airport',
      icon: '✈️',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'railway',
      category: 'transit',
      title: 'Rayagada Railway Station',
      subtitle: 'Station Road, Railway Colony Junction (RGDA)',
      badge: 'Junction Hub',
      icon: '🚉',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'bus-stand',
      category: 'transit',
      title: 'New Bus Stand Rayagada',
      subtitle: 'Rama Krishna Nagar, SH-18 Bypass, Rayagada',
      badge: 'Bus Terminal',
      icon: '🚌',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80'
    },

    // Local Spots
    {
      id: 'giet-gate',
      category: 'local',
      title: 'GIET University Campus Gate',
      subtitle: 'Govindpur Educational Complex, Rayagada',
      badge: 'University',
      icon: '🎓',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'gcd-ground',
      category: 'local',
      title: 'GCD High School Ground & Stadium',
      subtitle: 'College Road, Sports Complex, Rayagada',
      badge: 'Landmark',
      icon: '🏟️',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&auto=format&fit=crop&q=80'
    }
  ];

  // Helper for transit hub sorting priority: 1) Airport, 2) Railway Station, 3) Bus Stop/Stand, 4) Others
  const getPlacePriority = (place) => {
    const text = (place.title + ' ' + place.subtitle + ' ' + (place.badge || '') + ' ' + place.id).toLowerCase();
    if (text.includes('airport') || text.includes('airstrip')) return 1;
    if (text.includes('railway') || text.includes('station') || text.includes('rgda')) return 2;
    if (text.includes('bus')) return 3;
    return 4;
  };

  const rawPlaces = selectedCategory === 'all' 
    ? rayagadaPlaces 
    : selectedCategory === 'saved'
    ? rayagadaPlaces.filter(p => savedAddresses.some(s => s.id === p.id))
    : rayagadaPlaces.filter(p => p.category === selectedCategory);

  const filteredPlaces = [...rawPlaces].sort((a, b) => getPlacePriority(a) - getPlacePriority(b));

  const displayPlaces = destinationQuery.trim()
    ? rayagadaPlaces.filter(p => 
        p.title.toLowerCase().includes(destinationQuery.toLowerCase()) || 
        p.subtitle.toLowerCase().includes(destinationQuery.toLowerCase())
      )
    : filteredPlaces;

  // Automatically calculate route and polyline coordinates between pickup and destination
  useEffect(() => {
    if (!pickupCoord || !destCoord) {
      setRouteCoordinates([]);
      return;
    }

    let isCancelled = false;
    const calculateRoute = async () => {
      const dir = await fetchRouteDirections(pickupCoord, destCoord);
      if (!isCancelled && dir) {
        setRouteCoordinates(dir.coordinates);
      }
    };

    calculateRoute();
    return () => {
      isCancelled = true;
    };
  }, [pickupCoord, destCoord]);

  const isReadyForBooking = isBookingPageOpen && pickupQuery.trim() !== '' && destinationQuery.trim() !== '';

  const handleProceedToBooking = (destTitle, coord) => {
    if (destTitle) setDestinationQuery(destTitle);
    if (coord) {
      setDestCoord(coord);
    } else if (!destCoord) {
      setDestCoord([83.4210, 19.1725]);
    }
    if (!pickupQuery.trim()) {
      setPickupQuery('Rayagada Railway Station Road');
      setPickupCoord([83.4147, 19.1678]);
    }
    setIsBookingPageOpen(true);
  };

  useEffect(() => {
    if (onBookingModeChange) {
      const timeout = setTimeout(() => {
        onBookingModeChange(isReadyForBooking);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isReadyForBooking, onBookingModeChange]);



  const exploreModes = [
    { id: 'parcel', label: 'Parcel on Bike', icon: '📦', badge: 'Fast' },
    { id: 'auto', label: 'Auto', icon: '🛺', badge: 'Popular' },
    { id: 'bike', label: 'Bike', icon: '🛵', badge: 'Quick' }
  ];

  if (isReadyForBooking) {
    return (
      <RideBookingPage 
        pickup={pickupQuery}
        destination={destinationQuery}
        pickupCoord={pickupCoord}
        destCoord={destCoord}
        onBack={() => {
          setIsBookingPageOpen(false);
        }}
        showToast={showToast}
      />
    );
  }

  return (
    <div className="w-full pb-4 font-sans select-none space-y-4">
      {/* 1. Interactive Ola Maps Header Canvas */}
      <div className="relative w-full h-52 bg-[#F1F3F4] overflow-hidden border-b border-slate-200/80 shadow-inner">
        <OlaMapView
          center={pickupCoord || [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat]}
          zoom={14}
          pickupCoord={pickupCoord}
          destCoord={destCoord}
          routeCoordinates={routeCoordinates}
          mapTheme={mapTheme}
          onThemeChange={setMapTheme}
          onLocationFound={({ lat, lng, name, address }) => {
            setPickupCoord([lng, lat]);
            setPickupQuery(name || address);
            if (showToast) showToast(`📍 GPS Locked: ${name || 'Present Location'}`);
          }}
          showControls={true}
        />
      </div>

      <div className="px-4 space-y-4 -mt-2 relative z-30">
        {/* 2. Unified From & To Route Card with Connecting Vertical Line */}


        {/* 3. Rayagada Place Category Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span>📍</span> Rayagada Places & Hubs
            </h3>
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {filteredPlaces.length} Locations
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {placeCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : cat.prominent 
                      ? 'bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100'
                      : 'bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Quick Address List (Simple Line Divider Layout, Max 3-5 Visible with Internal Scrolling) */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="max-h-[220px] overflow-y-auto divide-y divide-slate-100 divide-solid no-scrollbar">
            {displayPlaces.length === 0 ? (
              <div className="p-4 text-center text-xs font-bold text-slate-400">
                No addresses found for "{destinationQuery}"
              </div>
            ) : (
              displayPlaces.map((place) => {
                return (
                  <div
                    key={place.id}
                    onClick={() => {
                      const coord = (place.lng && place.lat) ? [place.lng, place.lat] : [83.4210, 19.1725];
                      handleProceedToBooking(place.title, coord);
                    }}
                    className="flex items-center justify-between p-3 hover:bg-amber-50/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-base shrink-0 group-hover:bg-amber-100 group-hover:scale-105 transition-all">
                        {place.icon || '📍'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs font-black text-slate-900 truncate group-hover:text-amber-800 transition-colors">
                            {place.title}
                          </span>
                          {place.badge && (
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60 shrink-0">
                              {place.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 truncate">
                          {place.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleFavorite) onToggleFavorite(place);
                        }}
                        className={`p-1.5 rounded-full transition-colors ${
                          savedAddresses.some(a => a.id === place.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                        }`}
                        title={savedAddresses.some(a => a.id === place.id) ? "Saved" : "Save location"}
                      >
                        <Heart size={14} className={savedAddresses.some(a => a.id === place.id) ? "fill-rose-500" : ""} />
                      </button>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>



        {/* 5. Explore Services Grid */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">Quick Ride Modes</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {exploreModes.map((mode) => (
              <div 
                key={mode.id}
                onClick={() => {
                  if (showToast) showToast(`Selected ${mode.label} service`);
                }}
                className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover:bg-white hover:border-amber-300 transition-all cursor-pointer group flex flex-col items-center justify-center"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {mode.icon}
                </div>
                <h4 className="text-xs font-black text-slate-900">{mode.label}</h4>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1">
                  {mode.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Custom Image Banner Design - Reverted to Previous Local Image Asset with Feathered Radial Mask */}
        <div 
          className="relative flex justify-center items-center my-1 overflow-hidden rounded-2xl"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 10%, rgba(0, 0, 0, 0.5) 70%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 10%, rgba(0, 0, 0, 0.5) 70%, transparent 100%)'
          }}
        >
          <img 
            src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_12.24.03_AM_47eedbfa.jpeg" 
            alt="Made for India • Crafted in Rayagada" 
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop&q=80';
            }}
            className="w-full h-auto object-cover block mix-blend-multiply opacity-95 transition-opacity"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 15%, rgba(0,0,0,0.6) 75%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 15%, rgba(0,0,0,0.6) 75%, transparent 100%)'
            }}
          />
        </div>

        {/* 7. Bottom Branding Footer - Zero Blank Space Below */}
        <div className="pt-0 pb-0 text-center space-y-0.5 opacity-90">
          <div className="text-xl font-black tracking-tighter text-slate-800 italic">
            #go<span className="text-amber-500">cityOS</span> ride
          </div>
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1">🇮🇳 Made for India</span>
            <span>•</span>
            <span className="flex items-center gap-1">❤️ Crafted in Rayagada</span>
          </div>
        </div>
      </div>
    </div>
  );
};
