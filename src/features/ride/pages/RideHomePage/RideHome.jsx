import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, X, ChevronRight, Navigation } from 'lucide-react';
import { RideBookingPage } from '../RideBookingPage/RideBookingPage';
import { OlaMapView } from '@/components/OlaMapView';
import { fetchPlaceSuggestions, DEFAULT_COORDINATES, reverseGeocode, fetchRouteDirections } from '@/services/olaMapsService';

export const RideHome = ({ showToast, onBookingModeChange, savedAddresses = [], onToggleFavorite }) => {
  const [pickupQuery, setPickupQuery] = useState('Current Location: Rayagada Station Road');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [pickupCoord, setPickupCoord] = useState([83.4147, 19.1678]); // [lng, lat] Station Road
  const [destCoord, setDestCoord] = useState(null); // [lng, lat]
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [isBookingPageOpen, setIsBookingPageOpen] = useState(false);
  const [mapTheme, setMapTheme] = useState('standard');
  const [isMapZoomed, setIsMapZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);

  const placeCategories = [
    { id: 'all', label: 'All', icon: '📍' },
    { id: 'saved', label: 'Saved Address', icon: '❤️' },
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

  // Real-time Autocomplete Logic powered by Ola Maps Places API
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      if (pickupQuery.length > 2 && !pickupQuery.startsWith('Current Location')) {
        const results = await fetchPlaceSuggestions(pickupQuery, {
          location: { lat: DEFAULT_COORDINATES.lat, lng: DEFAULT_COORDINATES.lng },
        });
        if (!isCancelled) setPickupSuggestions(results);
      } else {
        if (!isCancelled) setPickupSuggestions([]);
      }
    }, 280);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [pickupQuery]);

  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      if (destinationQuery.length > 2) {
        const results = await fetchPlaceSuggestions(destinationQuery, {
          location: { lat: DEFAULT_COORDINATES.lat, lng: DEFAULT_COORDINATES.lng },
        });
        if (!isCancelled) setDestSuggestions(results);
      } else {
        if (!isCancelled) setDestSuggestions([]);
      }
    }, 280);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [destinationQuery]);

  // Automatically calculate route and polyline coordinates between pickup and destination
  useEffect(() => {
    if (!pickupCoord || !destCoord) {
      setRouteCoordinates([]);
      setRouteInfo(null);
      return;
    }

    let isCancelled = false;
    const calculateRoute = async () => {
      setIsCalculatingRoute(true);
      const dir = await fetchRouteDirections(pickupCoord, destCoord);
      if (!isCancelled && dir) {
        setRouteCoordinates(dir.coordinates);
        setRouteInfo(dir);
        setIsCalculatingRoute(false);
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

  const handleLocateMe = () => {
    if (showToast) showToast('🛰️ Fetching exact GPS location via Ola Maps...');
    if (!navigator.geolocation) {
      setPickupQuery('Rayagada Railway Station Road');
      setPickupCoord([DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat]);
      if (showToast) showToast('📍 Location pinned to Station Road');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPickupCoord([lng, lat]);
        const addr = await reverseGeocode(lat, lng);
        const resolvedName = addr?.name || addr?.formattedAddress || 'My Current Location';
        setPickupQuery(resolvedName);
        if (showToast) showToast(`📍 Locked: ${resolvedName}`);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setPickupQuery('Rayagada Railway Station Road');
        setPickupCoord([DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat]);
        if (showToast) showToast('📍 Defaulted to Station Road (GPS Permission Denied)');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

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
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-md border border-slate-200/80 space-y-2 relative">
          {/* Pickup Input ("From") */}
          <div className="flex flex-col gap-1 relative">
            <div className="flex items-center gap-3">
              <div 
                onClick={handleLocateMe}
                className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 cursor-pointer transition-colors shadow-2xs"
                title="Click to set current location"
              >
                <MapPin size={18} />
              </div>
              <div className="flex flex-col flex-grow min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FROM</span>
                <input 
                  type="text"
                  value={pickupQuery}
                  onChange={(e) => setPickupQuery(e.target.value)}
                  placeholder="Current Location in Rayagada..."
                  className="w-full bg-transparent text-sm font-extrabold text-slate-900 placeholder:text-slate-400 outline-none truncate"
                />
              </div>
              {pickupQuery && (
                <button 
                  onClick={() => setPickupQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Pickup Suggestions Dropdown */}
            {pickupSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-[100] max-h-48 overflow-y-auto no-scrollbar">
                {pickupSuggestions.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => { 
                      setPickupQuery(s.title); 
                      if (s.geometry?.lng && s.geometry?.lat) {
                        setPickupCoord([s.geometry.lng, s.geometry.lat]);
                      }
                      setPickupSuggestions([]); 
                    }}
                    className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none"
                  >
                    <p className="text-xs font-black text-slate-900">{s.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 truncate">{s.subtitle}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Small Divider Line between From & To */}
          <div className="ml-[19px] w-[2px] h-4 bg-slate-300 border-dashed border-l-2" />

          {/* Destination Input ("To") */}
          <div className="flex flex-col gap-1 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
                <Search size={18} />
              </div>
              <div className="flex flex-col flex-grow min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TO</span>
                <input 
                  type="text"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && destinationQuery.trim()) {
                      handleProceedToBooking(destinationQuery, destCoord);
                    }
                  }}
                  placeholder="Search Govt offices, Tourist spots, Bus stand..."
                  className="w-full bg-transparent text-sm font-extrabold text-slate-900 placeholder:text-slate-400 outline-none truncate"
                />
              </div>
              {destinationQuery && (
                <button 
                  onClick={() => {
                    setDestinationQuery('');
                    setDestCoord(null);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Destination Suggestions Dropdown */}
            {destSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-[100] max-h-48 overflow-y-auto no-scrollbar">
                {destSuggestions.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => { 
                      const coord = (s.lng && s.lat) ? [s.lng, s.lat] : (s.geometry?.lng && s.geometry?.lat) ? [s.geometry.lng, s.geometry.lat] : [83.4210, 19.1725];
                      setDestinationQuery(s.title);
                      setDestCoord(coord);
                      setDestSuggestions([]);
                      if (showToast) showToast(`📍 Destination set: ${s.title}`);
                    }}
                    className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none"
                  >
                    <p className="text-xs font-black text-slate-900">{s.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 truncate">{s.subtitle}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Live Navigation Route Summary Banner */}
            {routeInfo && (
              <div className="mt-2.5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white p-3 rounded-xl shadow-md flex items-center justify-between border border-emerald-400/40 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-sm">
                    🛵
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">
                      Route • {routeInfo.distance} (~{routeInfo.durationMins} mins)
                    </span>
                    <span className="text-xs font-bold text-white truncate">
                      Ready to book to {destinationQuery}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleProceedToBooking(destinationQuery, destCoord)}
                  className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-black shrink-0 transition-transform shadow flex items-center gap-1 cursor-pointer"
                >
                  <span>Select Ride</span>
                  <ChevronRight size={13} className="stroke-[3]" />
                </button>
              </div>
            )}

            {/* Continue / Find Rides Action Button */}
            {!routeInfo && destinationQuery.trim().length > 1 && (
              <button
                type="button"
                onClick={() => handleProceedToBooking(destinationQuery, destCoord)}
                className="w-full mt-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-black rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Find Rides to {destinationQuery.length > 25 ? destinationQuery.substring(0, 25) + '...' : destinationQuery}</span>
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

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
                      setDestinationQuery(place.title);
                      setDestCoord(coord);
                      if (showToast) showToast(`📍 Destination selected: ${place.title}`);
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
