import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Navigation, Plus, ChevronDown, User, ChevronRight, Clock, Calendar, X, Check, CreditCard, Tag, Phone, MessageSquare, RotateCcw, Star, Layers, ShieldAlert, PhoneCall, Share2, Send, Siren, ShieldCheck, PhoneOff, Mic, MicOff, Volume2, VolumeX, ThumbsUp } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const driversData = {
  bike: {
    name: 'Rajesh Kumar',
    rating: 4.9,
    trips: '1,240 rides',
    experience: '3.5 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Honda Shine 125cc',
    vehicleColor: 'Gloss Black',
    licensePlate: 'OD 18 B 4509',
    badges: ['Top Captain', 'Vaccinated'],
    language: 'Hindi, Odia, English',
    satisfaction: '99% positive reviews',
    phone: '+91 98765 43210',
  },
  auto: {
    name: 'Suresh Chandra Mohanty',
    rating: 4.85,
    trips: '2,180 rides',
    experience: '5 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Bajaj RE Auto Rickshaw',
    vehicleColor: 'Yellow & Green',
    licensePlate: 'OD 18 A 2012',
    badges: ['Top Captain'],
    language: 'Odia, Hindi',
    satisfaction: '98% positive reviews',
    phone: '+91 98765 12345',
  },
  mini: {
    name: 'Amitabh Pradhan',
    rating: 4.92,
    trips: '3,410 rides',
    experience: '4 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Maruti Suzuki WagonR AC',
    vehicleColor: 'Silver Metallic',
    licensePlate: 'OD 18 C 9812',
    badges: ['Clean Vehicle', 'AC Specialist'],
    language: 'Odia, English, Hindi',
    satisfaction: '99.5% positive reviews',
    phone: '+91 98765 67890',
  },
  sedan: {
    name: 'Vikramaditya Patnaik',
    rating: 4.98,
    trips: '4,520 rides',
    experience: '6 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Hyundai Aura Sedan AC',
    vehicleColor: 'Pearl White',
    licensePlate: 'OD 18 D 7700',
    badges: ['Premier Driver', 'Comfort Expert'],
    language: 'English, Odia, Hindi',
    satisfaction: '100% positive reviews',
    phone: '+91 98765 99999',
  },
};



export const RideBookingPage = ({ pickup, destination, onBack, showToast }) => {
  const [selectedRide, setSelectedRide] = useState('bike');
  const vehicleIcon = selectedRide === 'bike' ? '🛵' : selectedRide === 'auto' ? '🛺' : selectedRide === 'mini' ? '🚗' : '🚘';
  const [booked, setBooked] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDriverProfileOpen, setIsDriverProfileOpen] = useState(false);

  // SOS Emergency Safety States
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);

  // Map Style & Control States
  const [mapTheme, setMapTheme] = useState('standard'); // 'standard' | 'satellite'
  const [isTrafficEnabled, _setIsTrafficEnabled] = useState(true);
  const [mapZoom, _setMapZoom] = useState(1);


  // Payment & Coupon States
  const [selectedPayment, setSelectedPayment] = useState('Pay Now');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState('SECOND50');
  const [couponInput, setCouponInput] = useState('');
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  // Schedule States
  const [todayStr] = useState(() => new Date().toISOString().split('T')[0]);
  const [tomorrowStr] = useState(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);

  const [scheduleDate, setScheduleDate] = useState(tomorrowStr);
  const [scheduleTime, setScheduleTime] = useState('10:30');
  const [scheduledLabel, setScheduledLabel] = useState(null);

  // Real-time Ride Tracking States
  const routePathRef = useRef(null);
  const chatMessagesEndRef = useRef(null);
  const [vehiclePos, setVehiclePos] = useState({ x: 80, y: 180 });
  const [etaSeconds, setEtaSeconds] = useState(135);

  // Driver Direct Call States
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isCallingActive, setIsCallingActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // Driver Interactive Chat Drawer States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInputText, setChatInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'driver', text: 'Namaste! I am on my way to your pickup location.', time: '11:42 PM' },
    { id: 2, sender: 'driver', text: 'Please keep the OTP 4829 ready for verification.', time: '11:42 PM' },
  ]);

  // Auto scroll chat to latest message
  useEffect(() => {
    if (isChatOpen) {
      const timeout = setTimeout(() => {
        chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [chatMessages, isChatOpen]);

  // Post-Ride Rating States
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['Safe Driving', 'Clean Vehicle']);
  const [ratingComment, setRatingComment] = useState('');
  const [tipAmount, setTipAmount] = useState('₹20');
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Active Driver Info
  const activeDriver = driversData[selectedRide] || driversData.bike;

  // Captain Assigning / Search States
  const [isSearchingCaptain, setIsSearchingCaptain] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [addedTip, setAddedTip] = useState(0);

  const [showUpiQr, setShowUpiQr] = useState(false);

  // 5 Nearby Captains Coordinates relative to map center
  const nearbyCaptains = [
    { id: 1, name: 'Captain Rajesh (1240+ rides)', dist: '0.2 km', x: 95, y: 180 },
    { id: 2, name: 'Captain Suresh (2180+ rides)', dist: '0.3 km', x: 140, y: 240 },
    { id: 3, name: 'Captain Amitabh (3410+ rides)', dist: '0.4 km', x: 180, y: 150 },
    { id: 4, name: 'Captain Vikram (4520+ rides)', dist: '0.5 km', x: 110, y: 280 },
    { id: 5, name: 'Captain Deepak (980+ rides)', dist: '0.6 km', x: 230, y: 190 },
  ];

  // Prevent background scrolling when any popup modal is active
  useEffect(() => {
    if (isSearchingCaptain || isScheduleModalOpen || isPaymentModalOpen || isCouponModalOpen || isDriverProfileOpen || isSosModalOpen || isCallModalOpen || isChatOpen || isRatingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchingCaptain, isScheduleModalOpen, isPaymentModalOpen, isCouponModalOpen, isDriverProfileOpen, isSosModalOpen, isCallModalOpen, isChatOpen, isRatingModalOpen]);

  // Real-time Captain Matching Auto Sequence
  useEffect(() => {
    if (!isSearchingCaptain) return;

    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        const next = prev + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSearchingCaptain(false);
            setBooked(true);
            if (showToast) {
              showToast(`🎉 Captain Assigned! ${activeDriver.name} is on the way ${vehicleIcon}`);
            }
          }, 0);
          return 100;
        }
        return next;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isSearchingCaptain, activeDriver.name, vehicleIcon, showToast]);

  // Active In-App Call Timer
  useEffect(() => {
    if (!isCallingActive) return;
    
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCallingActive]);

  const startCall = () => {
    setCallDuration(0);
    setIsCallingActive(true);
  };

  const endCall = () => {
    setIsCallingActive(false);
    setCallDuration(0);
    setIsCallModalOpen(false);
  };

  const formatCallTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || chatInputText;
    if (!text.trim()) return;

    setChatMessages((prev) => {
      const userMsg = {
        id: prev.length + 1,
        sender: 'user',
        text: text.trim(),
        time: 'Just now',
      };
      return [...prev, userMsg];
    });

    if (!textToSend) setChatInputText('');

    // Simulated driver auto reply after 1.2s
    setTimeout(() => {
      const driverReplies = [
        `Got it! Reaching ${pickup ? pickup.substring(0, 15) : 'pickup point'} in 1 minute.`,
        "Yes sir, standing right at the main entrance gate.",
        "Understood! Please keep the OTP 4829 ready.",
        "On my way, traffic is completely clear!",
        "Thanks for informing! See you in a moment.",
      ];

      setChatMessages((prev) => {
        const replyIndex = prev.length % driverReplies.length;
        const randomReply = driverReplies[replyIndex];
        return [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'driver',
            text: randomReply,
            time: 'Just now',
          },
        ];
      });
    }, 1200);
  };

  const handleSubmitRating = () => {
    setIsRatingSubmitted(true);
    if (showToast) {
      showToast(`⭐ Rated ${ratingStars} Stars for ${activeDriver.name}! Thank you.`);
    }
    setTimeout(() => {
      setIsRatingSubmitted(false);
      setIsRatingModalOpen(false);
      setBooked(false); // Reset ride state cleanly after rating
    }, 1500);
  };

  // Real-time Vehicle Tracking Animation along SVG Route Path
  useEffect(() => {
    if (!booked) return;

    let animationFrameId;
    let startTime = null;
    const duration = 14000; // 14s loop along route

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = (elapsed % duration) / duration;

      if (routePathRef.current) {
        try {
          const totalLen = routePathRef.current.getTotalLength();
          const point = routePathRef.current.getPointAtLength(currentProgress * totalLen);
          setVehiclePos({ x: point.x, y: point.y });
        } catch {
          // Fallback if SVG not yet rendered
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Live ETA Countdown Interval
    const etaInterval = setInterval(() => {
      setEtaSeconds((prev) => (prev > 5 ? prev - 1 : 120));
    }, 1000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(etaInterval);
    };
  }, [booked]);

  const pickupLabel = pickup ? (pickup.length > 14 ? pickup.substring(0, 14) + '...' : pickup) : 'Rayagada, R...';
  const destLabel = destination ? (destination.length > 14 ? destination.substring(0, 14) + '...' : destination) : 'Rayagada Bu...';

  const rideOptions = [
    { id: 'bike', name: 'Bike', tag: 'FASTEST', desc: 'Quick Bike rides', time: '3 mins away • Drop 11:54 pm', price: '₹12', origPrice: '₹24', icon: '🛵', people: '1' },
    { id: 'auto', name: 'Auto', tag: 'POPULAR', desc: 'Auto rickshaw at your doorstep', time: '5 mins away • Drop 11:56 pm', price: '₹57', origPrice: '₹70', icon: '🛺', people: '3' },
    { id: 'mini', name: 'Cab Go', tag: 'AC HATCHBACK', desc: 'Comfortable compact cars', time: '4 mins away • Drop 12:02 am', price: '₹140', origPrice: '₹180', icon: '🚗', people: '4' },
    { id: 'sedan', name: 'Sedan', tag: 'TOP COMFORT', desc: 'Spacious sedans with top drivers', time: '6 mins away • Drop 12:08 am', price: '₹210', origPrice: '₹260', icon: '🚘', people: '4' },
  ];

  const quickTimes = [
    { label: '08:00 AM', value: '08:00' },
    { label: '10:30 AM', value: '10:30' },
    { label: '05:00 PM', value: '17:00' },
    { label: '08:30 PM', value: '20:30' },
  ];

  const handleConfirmSchedule = () => {
    const isTomorrow = scheduleDate === tomorrowStr;
    const isToday = scheduleDate === todayStr;
    const dayText = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : scheduleDate;
    
    let formattedTime = scheduleTime;
    if (scheduleTime) {
      const [h, m] = scheduleTime.split(':');
      const hourNum = parseInt(h, 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;
      formattedTime = `${hour12}:${m} ${ampm}`;
    }

    const finalLabel = `${dayText}, ${formattedTime}`;
    setScheduledLabel(finalLabel);
    setIsScheduleModalOpen(false);
    if (showToast) {
      showToast(`⏰ Ride scheduled for ${finalLabel}`);
    }
  };

  const formatEta = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="w-full relative font-sans select-none bg-slate-100 min-h-screen flex flex-col">
      {/* 1. Full Ola Maps Header Canvas */}
      <div className={`relative w-full h-[360px] overflow-hidden shrink-0 transition-colors duration-500 ${mapTheme === 'satellite' ? 'bg-[#121a24]' : 'bg-[#F1F3F4]'}`}>
        
        {/* We use SVG overlays to maintain the visual design and performance */}

        
        {/* Google Maps Vector Styling Engine */}
        <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `scale(${mapZoom})` }}>
          <svg className="absolute inset-0 w-full h-full" fill="none">
            {/* Background Land Polygons & Blocks */}
            <rect width="100%" height="100%" fill={mapTheme === 'satellite' ? '#1e293b' : '#f1f3f4'} />

            {/* Urban Building Blocks */}
            <g fill={mapTheme === 'satellite' ? '#334155' : '#e2e8f0'} opacity="0.7">
              <rect x="20" y="20" width="70" height="40" rx="4" />
              <rect x="110" y="25" width="80" height="35" rx="4" />
              <rect x="210" y="15" width="60" height="50" rx="4" />
              <rect x="300" y="30" width="90" height="40" rx="4" />

              <rect x="15" y="140" width="45" height="60" rx="4" />
              <rect x="130" y="145" width="85" height="55" rx="4" />
              <rect x="235" y="150" width="70" height="45" rx="4" />
              <rect x="320" y="160" width="75" height="50" rx="4" />

              <rect x="180" y="250" width="90" height="45" rx="4" />
              <rect x="290" y="260" width="65" height="50" rx="4" />
            </g>

            {/* Google Water Features (Nagavali River) */}
            <path 
              d="M 280 0 C 310 80, 360 140, 480 210 L 480 0 Z" 
              fill={mapTheme === 'satellite' ? '#0f172a' : '#A5C9EB'} 
            />
            <path 
              d="M 280 0 C 310 80, 360 140, 480 210" 
              stroke={mapTheme === 'satellite' ? '#1e3a8a' : '#81B4E3'} 
              strokeWidth="4" 
            />
            <text x="350" y="80" fill={mapTheme === 'satellite' ? '#60a5fa' : '#2563eb'} fontSize="10" fontWeight="800" opacity="0.8" transform="rotate(25 350 80)">
              Nagavali River
            </text>

            {/* Google Parks & Greenery Polygons */}
            <g>
              {/* Town Park */}
              <path 
                d="M 20 80 Q 80 70, 110 120 Q 50 150, 10 120 Z" 
                fill={mapTheme === 'satellite' ? '#14532d' : '#C8E6C9'} 
                stroke={mapTheme === 'satellite' ? '#166534' : '#A5D6A7'} 
                strokeWidth="1.5" 
              />
              <text x="32" y="110" fill={mapTheme === 'satellite' ? '#86efac' : '#2e7d32'} fontSize="9" fontWeight="900">
                🌳 Town Garden
              </text>

              {/* Gandhi Stadium */}
              <path 
                d="M 260 210 Q 330 190, 360 240 Q 300 280, 240 250 Z" 
                fill={mapTheme === 'satellite' ? '#14532d' : '#D8EAD3'} 
                stroke={mapTheme === 'satellite' ? '#166534' : '#B7E1CD'} 
                strokeWidth="1.5" 
              />
              <text x="270" y="235" fill={mapTheme === 'satellite' ? '#86efac' : '#1b5e20'} fontSize="9" fontWeight="900">
                🏟️ Gandhi Stadium
              </text>
            </g>

            {/* Street Grid Base Network (Standard White Google Streets) */}
            <g strokeLinecap="round" strokeLinejoin="round">
              {/* Local Streets Background Casing */}
              <path d="M 0 70 L 450 70 M 0 135 L 450 135 M 0 210 L 450 210 M 0 280 L 450 280" stroke={mapTheme === 'satellite' ? '#334155' : '#D1D5DB'} strokeWidth="6" />
              <path d="M 80 0 L 80 360 M 170 0 L 170 360 M 270 0 L 270 360 M 370 0 L 370 360" stroke={mapTheme === 'satellite' ? '#334155' : '#D1D5DB'} strokeWidth="6" />

              {/* Local Streets Inner White Fill */}
              <path d="M 0 70 L 450 70 M 0 135 L 450 135 M 0 210 L 450 210 M 0 280 L 450 280" stroke={mapTheme === 'satellite' ? '#1e293b' : '#FFFFFF'} strokeWidth="4" />
              <path d="M 80 0 L 80 360 M 170 0 L 170 360 M 270 0 L 270 360 M 370 0 L 370 360" stroke={mapTheme === 'satellite' ? '#1e293b' : '#FFFFFF'} strokeWidth="4" />

              {/* National Highway (NH 326 / Yellow Google Major Road) */}
              {/* Highway Outer Casing */}
              <path d="M 0 220 C 130 90, 240 290, 450 110" stroke="#E5A100" strokeWidth="11" />
              {/* Highway Inner Yellow Fill */}
              <path d="M 0 220 C 130 90, 240 290, 450 110" stroke="#FDE293" strokeWidth="7.5" />
            </g>

            {/* Google Live Traffic Overlay (Green / Yellow / Red) */}
            {isTrafficEnabled && (
              <g strokeLinecap="round" opacity="0.9">
                {/* Clear Traffic (Green) */}
                <path d="M 0 220 C 60 180, 90 140, 110 120" stroke="#34A853" strokeWidth="3.5" />
                {/* Moderate Traffic (Yellow) */}
                <path d="M 110 120 C 150 90, 200 180, 230 240" stroke="#FBBC04" strokeWidth="3.5" />
                {/* Slow Traffic (Red) */}
                <path d="M 230 240 C 270 280, 320 200, 380 120" stroke="#EA4335" strokeWidth="3.5" />
              </g>
            )}

            {/* Road Names & Street Labels */}
            <g fill={mapTheme === 'satellite' ? '#94a3b8' : '#5f6368'} fontSize="9" fontWeight="800">
              <text x="15" y="210" transform="rotate(-15 15 210)">NH 326 (Station Rd)</text>
              <text x="180" y="130">Market Square Ave</text>
              <text x="285" y="275">College Rd</text>
            </g>

            {/* Static Suggested Route Path (Google Maps Alternate Grey) */}
            {!booked && (
              <path 
                d="M 70 220 C 130 90, 240 290, 380 120" 
                stroke="#BDC1C6" 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}

            {/* Active Primary Google Blue Navigation Polyline */}
            <g>
              {/* Outer Glow Halo */}
              <path 
                ref={routePathRef}
                d="M 70 220 C 130 90, 240 290, 380 120" 
                stroke="#1A73E8" 
                strokeWidth="11" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                opacity="0.25"
              />
              {/* Primary Google Navigation Blue Polyline */}
              <path 
                d="M 70 220 C 130 90, 240 290, 380 120" 
                stroke="#4285F4" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Animated Inner Directional Pulse Chevrons */}
              <path 
                d="M 70 220 C 130 90, 240 290, 380 120" 
                stroke="#FFFFFF" 
                strokeWidth="2.5" 
                strokeDasharray="6 8"
                strokeLinecap="round" 
                className="animate-pulse"
              />
            </g>
          </svg>

          {/* 5 Nearby Captain Markers on Surrounding Streets (Real Rapido Radar) */}
          {!booked && (
            <>
              {nearbyCaptains.map((cap) => (
                <div 
                  key={cap.id} 
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer group"
                  style={{ left: `${cap.x}px`, top: `${cap.y}px` }}
                  title={`${cap.name} • ${cap.dist}`}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="hidden group-hover:flex bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap mb-0.5 shadow-md border border-amber-400 z-30">
                      {cap.name} • {cap.dist}
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-1.5 rounded-full bg-amber-400/40 animate-ping" />
                      <div className="w-7 h-7 rounded-full bg-[#FFC107] border-2 border-slate-950 flex items-center justify-center text-sm shadow-lg text-slate-950 font-black">
                        {vehicleIcon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Real-time Booked Vehicle Pin moving along route */}
          {booked && (
            <div 
              className="absolute z-30 transition-all duration-100 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: `${vehiclePos.x}px`, top: `${vehiclePos.y}px` }}
            >
              {/* Floating Live Vehicle Tag */}
              <div className="bg-slate-900/95 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xl border border-amber-400 flex items-center gap-1.5 mb-1 whitespace-nowrap animate-bounce">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="bg-[#FFD600] text-slate-950 font-mono font-black text-[9px] px-1.5 py-0.5 rounded border border-black/80 uppercase">{activeDriver.licensePlate}</span>
                <span>• {vehicleIcon}</span>
                <span className="text-amber-400 font-black">{activeDriver.rating}★</span>
              </div>

              {/* Vehicle Icon Circle with Glowing Pulse */}
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-slate-950 shadow-xl flex items-center justify-center text-xl text-slate-900 font-black z-10">
                  {vehicleIcon}
                </div>
              </div>
            </div>
          )}

          {/* CUSTOM STYLIZED SVG PICKUP MARKER (Green Pin with Pulsing Accuracy Ring & Floating Badge) */}
          <div className="absolute top-[220px] left-[70px] -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center pointer-events-auto group">
            {/* Ground Contact Pulse & Shadow */}
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Accuracy Ring */}
              <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-pulse" />
              
              {/* Contact Point Ellipse Shadow */}
              <svg width="32" height="12" viewBox="0 0 32 12" className="absolute bottom-[-6px] pointer-events-none">
                <ellipse cx="16" cy="6" rx="14" ry="4" fill="#0f172a" opacity="0.3" filter="blur(1px)" />
              </svg>
            </div>

            {/* Floating Pickup Location Badge */}
            <div className="mb-1 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/80 shadow-xl flex items-center gap-2 text-white text-[10px] font-black whitespace-nowrap group-hover:scale-105 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 uppercase tracking-wider font-extrabold text-[9px]">PICKUP</span>
              <span className="text-slate-300">•</span>
              <span className="font-extrabold">{pickupLabel}</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-[9px] px-1.5 py-0.5 rounded-md font-black">3 min away</span>
            </div>

            {/* Custom Stylized SVG Pickup Pin */}
            <div className="relative z-10 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg">
              <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pickupPinGrad" x1="19" y1="0" x2="19" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34D399" />
                    <stop offset="0.5" stopColor="#10B981" />
                    <stop offset="1" stopColor="#047857" />
                  </linearGradient>
                  <filter id="pickupGlow" x="-2" y="-2" width="42" height="52" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.35" />
                  </filter>
                </defs>
                {/* Main Teardrop Pin Path */}
                <path 
                  d="M19 0C8.50659 0 0 8.50659 0 19C0 31.5 19 46 19 46C19 46 38 31.5 38 19C38 8.50659 29.4934 0 19 0Z" 
                  fill="url(#pickupPinGrad)" 
                  stroke="#FFFFFF" 
                  strokeWidth="2"
                  filter="url(#pickupGlow)"
                />
                {/* Outer White Ring */}
                <circle cx="19" cy="18" r="10" fill="#FFFFFF" />
                {/* Inner Green Dot */}
                <circle cx="19" cy="18" r="6" fill="#059669" />
                {/* Center Core GPS Dot */}
                <circle cx="19" cy="18" r="2.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* CUSTOM STYLIZED SVG DROP-OFF MARKER (Red Target Teardrop Pin with Ground Reticle) */}
          <div className="absolute top-[120px] left-[380px] -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center pointer-events-auto group">
            {/* Ground Contact Target Reticle & Shadow */}
            <div className="relative flex items-center justify-center">
              {/* Target Crosshair Ground Ring */}
              <svg width="40" height="16" viewBox="0 0 40 16" className="absolute bottom-[-8px] pointer-events-none">
                <ellipse cx="20" cy="8" rx="18" ry="6" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                <ellipse cx="20" cy="8" rx="10" ry="3.5" fill="#EF4444" opacity="0.2" />
                <ellipse cx="20" cy="8" rx="16" ry="5" fill="#0f172a" opacity="0.3" filter="blur(1px)" />
              </svg>
            </div>

            {/* Floating Drop-off Location Badge */}
            <div className="mb-1 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-400/80 shadow-xl flex items-center gap-2 text-white text-[10px] font-black whitespace-nowrap group-hover:scale-105 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-rose-400 uppercase tracking-wider font-extrabold text-[9px]">DROP-OFF</span>
              <span className="text-slate-300">•</span>
              <span className="font-extrabold">{destLabel}</span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/50 text-[9px] px-1.5 py-0.5 rounded-md font-black">11 min trip</span>
            </div>

            {/* Custom Stylized SVG Drop-off Pin */}
            <div className="relative z-10 hover:scale-110 transition-transform cursor-pointer drop-shadow-xl">
              <svg width="42" height="52" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="dropPinGrad" x1="21" y1="0" x2="21" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F87171" />
                    <stop offset="0.5" stopColor="#EF4444" />
                    <stop offset="1" stopColor="#B91C1C" />
                  </linearGradient>
                  <filter id="dropGlow" x="-2" y="-2" width="46" height="56" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.4" />
                  </filter>
                </defs>
                {/* Outer Teardrop SVG Pin Frame */}
                <path 
                  d="M21 0C9.40202 0 0 9.40202 0 21C0 34.5 21 50 21 50C21 50 42 34.5 42 21C42 9.40202 32.598 0 21 0Z" 
                  fill="url(#dropPinGrad)" 
                  stroke="#FFFFFF" 
                  strokeWidth="2.5"
                  filter="url(#dropGlow)"
                />
                {/* White Concentric Ring */}
                <circle cx="21" cy="20" r="11" fill="#FFFFFF" />
                {/* Inner Red Target Ring */}
                <circle cx="21" cy="20" r="7.5" fill="#EF4444" />
                {/* Target Bullseye Square / Dot */}
                <rect x="18" y="17" width="6" height="6" rx="1.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>

        {/* 5 Captains found nearby Floating Pill Banner when selecting ride */}
        {!booked && !isSearchingCaptain && (
          <div className="absolute top-4 left-16 z-30 pointer-events-auto">
            <div className="bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-amber-400 shadow-lg flex items-center gap-2 text-xs font-black animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-400">5 Captains found nearby</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200">2 min pickup</span>
            </div>
          </div>
        )}

        {/* Top Left Arrow Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer z-40 shadow-md"
          aria-label="Go Back"
        >
          <ArrowLeft size={18} className="stroke-[2.5]" />
        </button>

        {/* Floating Google Maps Style Controls (Right Stack) */}
        <div className="absolute right-3 top-4 flex flex-col gap-2 z-30">
          {/* Map Layer Theme Toggle (Standard / Satellite) */}
          <button 
            type="button" 
            onClick={() => {
              const nextTheme = mapTheme === 'standard' ? 'satellite' : 'standard';
              setMapTheme(nextTheme);
              if (showToast) showToast(`Switched to ${nextTheme} map layer`);
            }} 
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-md ${
              mapTheme === 'satellite' ? 'bg-slate-900 text-amber-400 border-slate-950' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Satellite / Standard"
          >
            <Layers size={16} />
          </button>

          {/* Center GPS Location Target Button */}
          <button 
            type="button" 
            onClick={() => showToast && showToast('Centering on your location...')} 
            className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-[#1A73E8] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-md"
            title="Center on my location"
          >
            <Navigation size={17} className="fill-[#1A73E8]/20" />
          </button>
        </div>

        {/* Add Stop Floating Pill Button */}
        {!booked && (
          <div className="absolute bottom-3 right-3 z-30">
            <button 
              type="button" 
              onClick={() => showToast && showToast('Add stop opened')} 
              className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200/90 flex items-center gap-1.5 text-xs font-black text-slate-900 hover:bg-white active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Plus size={14} className="stroke-[3] text-slate-800" />
              <span>Add stop</span>
            </button>
          </div>
        )}

        {/* AUTHENTIC GOOGLE WATERMARK & COPYRIGHT FOOTER */}
        <div className="absolute bottom-2 left-3 z-20 flex items-center gap-2 pointer-events-none select-none">
          <div className="bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-black tracking-tight flex items-center gap-0.5 shadow-2xs border border-slate-200/60">
            <span className="text-[#4285F4] font-black">G</span>
            <span className="text-[#EA4335] font-black">o</span>
            <span className="text-[#FBBC04] font-black">o</span>
            <span className="text-[#4285F4] font-black">g</span>
            <span className="text-[#34A853] font-black">l</span>
            <span className="text-[#EA4335] font-black">e</span>
          </div>
          <span className="text-[9px] font-semibold text-slate-600 bg-white/70 px-1.5 py-0.5 rounded">
            ©2026 Google • Map data
          </span>
        </div>
      </div>

      {/* 2. MAIN SHEET CONTENT */}
      {!booked ? (
        /* Ride Options Sheet when NOT booked */
        <div className="bg-white rounded-t-[32px] border-t border-slate-200 -mt-6 relative z-30 flex-grow flex flex-col pb-36">
          <div className="p-4 space-y-3">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto -mt-1 mb-1" />
            
            {scheduledLabel ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 flex items-center justify-between text-xs font-extrabold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-600" />
                  Scheduled: {scheduledLabel}
                </span>
                <button onClick={() => setScheduledLabel(null)} className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded-full hover:bg-amber-300 cursor-pointer">
                  Reset
                </button>
              </div>
            ) : (
              <div className="text-center text-xs font-black text-emerald-800 py-1 tracking-tight">
                You get ₹12 off & 12 coins cashback!
              </div>
            )}

            <div className="space-y-2.5 pt-1">
              {rideOptions.map((r) => {
                const isSelected = selectedRide === r.id;
                return (
                  <div key={r.id} onClick={() => { setSelectedRide(r.id); if (showToast) showToast(`Selected ${r.name}`); }} className={`p-3.5 rounded-2xl transition-all cursor-pointer relative ${isSelected ? 'border-2 border-slate-800 bg-white' : 'border border-slate-200/90 bg-white/60 hover:bg-white'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="text-3xl shrink-0">{r.icon}</div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2"><h4 className="text-sm font-black text-slate-900">{r.name}</h4>{r.tag && (<span className="text-[9px] font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded tracking-wider uppercase">{r.tag}</span>)}</div>
                          <p className="text-[11px] font-bold text-slate-500 truncate">{r.desc}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 pt-0.5"><span>{r.time}</span><span>•</span><span className="flex items-center gap-0.5"><User size={11} className="text-slate-400" />{r.people}</span></div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pl-2"><div className="text-base font-black text-slate-900">{r.price}</div>{r.origPrice && (<div className="text-[11px] font-bold text-slate-400 line-through">{r.origPrice}</div>)}</div>
                    </div>
                    {isSelected && (<div className="flex justify-center -mb-2 mt-1"><ChevronDown size={18} className="text-slate-800" /></div>)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* LIVE DRIVER & RIDE TRACKING SHEET when BOOKED */
        <div className="bg-white rounded-t-[32px] border-t border-slate-200 -mt-6 relative z-30 flex-grow flex flex-col space-y-3 p-4">
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto -mt-1" />

          {/* SINGLE INTEGRATED PRIMARY DRIVER CARD */}
          <div className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 rounded-2xl p-4 shadow-sm relative space-y-3 mb-0">
            {/* Status Pill & SHARE OTP header bar */}
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide">Driver En Route</span>
                  <span className="text-[11px] font-bold text-slate-500">• Arriving in {formatEta(etaSeconds)}</span>
                </div>
              </div>

              {/* Share OTP Display Badge */}
              <div className="bg-white border border-emerald-400 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs shrink-0">
                <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">SHARE OTP</span>
                <span className="text-sm font-black text-slate-900 tracking-wider">4829</span>
              </div>
            </div>

            {/* Primary Driver Details & Inline Call/Message Actions */}
            <div className="flex items-center justify-between pt-0.5">
              <div 
                onClick={() => setIsDriverProfileOpen(true)}
                className="flex items-center gap-3 cursor-pointer group min-w-0"
                title="Click to view full driver profile"
              >
                {/* High quality portrait avatar with online status ring */}
                <div className="relative shrink-0">
                  <img 
                    src={activeDriver.photo} 
                    alt={activeDriver.name} 
                    className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-xs">
                    <Check size={10} className="stroke-[3]" />
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1 truncate">
                      <span>{activeDriver.name}</span>
                      <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </h3>
                    
                    <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-2xs shrink-0">
                      <Star size={10} className="fill-slate-950 text-slate-950" />
                      <span>{activeDriver.rating}</span>
                    </span>
                  </div>

                  {/* Formatted License Plate Badge & Vehicle Model */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-slate-700 truncate">{activeDriver.vehicleName}</span>
                    <span className="bg-[#FFD600] text-slate-950 font-mono font-black text-[10px] tracking-wider px-2 py-0.5 rounded border border-black/80 shadow-xs uppercase shrink-0">
                      {activeDriver.licensePlate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call & Message Action Buttons inline in Driver Card */}
              <div className="flex items-center gap-2 shrink-0 pl-2">
                <button 
                  type="button"
                  onClick={() => setIsCallModalOpen(true)}
                  className="w-10 h-10 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="Call Captain"
                >
                  <PhoneCall size={18} className="text-white" />
                </button>

                <button 
                  type="button"
                  onClick={() => setIsChatOpen(true)}
                  className="w-10 h-10 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="Message Captain"
                >
                  <MessageSquare size={18} className="text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. STRICTLY FIXED BOTTOM SECTION */}
      {!booked ? (
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-40 bg-white border-t border-slate-200/90 p-3.5 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] space-y-2.5">

          {/* Payment & Coupon Row */}
          <div className="flex items-center justify-between text-xs font-black text-slate-900 px-1 py-1 gap-2">
            <button 
              type="button" 
              onClick={() => setIsPaymentModalOpen(true)} 
              className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 px-2.5 py-1.5 rounded-xl transition-colors min-w-0 border border-slate-100"
            >
              <span className="text-base shrink-0">
                {selectedPayment === 'Pay Now' ? '💳' : selectedPayment === 'Cash' ? '💵' : '🪙'}
              </span>
              <span className="truncate">{selectedPayment}</span>
              <ChevronRight size={14} className="text-slate-400 shrink-0" />
            </button>

            <div className="w-[1px] h-4 bg-slate-200 shrink-0" />

            <button 
              type="button" 
              onClick={() => setIsCouponModalOpen(true)} 
              className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 px-2.5 py-1.5 rounded-xl transition-colors min-w-0 text-right border border-slate-100"
            >
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-[10px] shrink-0">
                %
              </div>
              <div className="text-left min-w-0">
                <span className="block text-[11px] leading-tight font-black uppercase truncate">
                  {appliedCoupon ? appliedCoupon : 'APPLY COUPON'}
                </span>
                <span className="block text-[9px] text-slate-400 font-semibold truncate">
                  {appliedCoupon ? 'Coupon applied' : 'Offers & discount'}
                </span>
              </div>
              <ChevronRight size={14} className="text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Action Buttons Row: Schedule Button on Left + Book Bike on Right */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-black text-xs cursor-pointer transition-all active:scale-[0.96] flex items-center gap-1.5 shrink-0 shadow-sm"
              title="Schedule ride for later"
            >
              <Clock size={16} className="text-amber-400" />
              <span>Schedule</span>
            </button>

            <button 
              type="button" 
              onClick={() => { 
                setSearchProgress(0);
                setIsSearchingCaptain(true); 
                if (showToast) showToast(scheduledLabel ? `Searching captains for scheduled ride (${scheduledLabel})...` : `Searching 5 nearby captains for your ${selectedRide === 'bike' ? 'Bike' : selectedRide === 'auto' ? 'Auto' : 'Ride'}...`); 
              }} 
              className="flex-1 py-3.5 px-4 rounded-full font-black text-sm tracking-wide cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2 bg-[#FFC107] text-slate-950 hover:bg-[#ffca28] shadow-md"
            >
              <span>
                {scheduledLabel 
                  ? `Schedule ${selectedRide === 'bike' ? 'Bike' : selectedRide === 'auto' ? 'Auto' : 'Ride'}` 
                  : `Book ${selectedRide === 'bike' ? 'Bike' : selectedRide === 'auto' ? 'Auto' : 'Ride'}`}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* FIXED BOTTOM BAR FOR LIVE RIDE TRACKING STATE */
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-40 bg-white border-t border-slate-200/90 p-3.5 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] space-y-2">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => { 
                setBooked(false); 
                if (showToast) showToast('Ride cancelled. Re-select options.'); 
              }} 
              className="flex-1 py-3 px-3 rounded-full font-black text-xs tracking-wide cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-1 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            >
              <RotateCcw size={14} className="text-slate-500" />
              <span>Cancel Ride</span>
            </button>

            {/* Complete Ride Trigger Button */}
            <button
              type="button"
              onClick={() => setIsRatingModalOpen(true)}
              className="px-3.5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-black text-xs cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-md shrink-0"
              title="Complete ride and open rating"
            >
              <Check size={15} className="text-amber-400 stroke-[3]" />
              <span>End Ride</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. PAYMENT SELECTION POPUP CARD MODAL */}
      {isPaymentModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsPaymentModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 shadow-2xl relative z-50 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Select Payment Method</h3>
                  <p className="text-[11px] font-bold text-slate-400">Choose your preferred option</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Payment Modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'Pay Now', name: 'Pay Now', desc: 'UPI, QR, Cards & NetBanking', icon: '💳', tag: 'RECOMMENDED' },
                { id: 'Cash', name: 'Cash', desc: 'Pay cash directly to driver after trip', icon: '💵', tag: null },
                { id: 'Pay through Coin', name: 'Pay through Coin', desc: 'Use 120 Coins available in wallet', icon: '🪙', tag: 'SAVE ₹12' },
              ].map((method) => {
                const isSelected = selectedPayment === method.id;
                return (
                  <div key={method.id} className="space-y-3">
                    <div
                      onClick={() => {
                        setSelectedPayment(method.id);
                        if (method.id === 'Pay Now') {
                          setShowUpiQr(!showUpiQr);
                        } else {
                          setShowUpiQr(false);
                          setIsPaymentModalOpen(false);
                        }
                        if (showToast) showToast(`Payment method set to ${method.name}`);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                          : 'border-slate-200 bg-slate-50/80 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black">{method.name}</span>
                            {method.tag && (
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded tracking-wider ${
                                isSelected ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-900'
                              }`}>
                                {method.tag}
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {method.desc}
                          </p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check size={12} className="stroke-[3]" />}
                      </div>
                    </div>

                    {isSelected && method.id === 'Pay Now' && showUpiQr && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-200">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                          <QRCodeCanvas 
                            value={`upi://pay?pa=gocityos@bank&pn=GoCityOS&am=${(parseInt((rideOptions.find(r => r.id === selectedRide)?.price || '12').replace('₹', ''), 10) + addedTip)}&cu=INR`}
                            size={120}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scan to Pay using any UPI App</p>
                          <div className="flex items-center gap-3 mt-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Google_Pay_Logo.svg" alt="GPay" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-4" />
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsPaymentModalOpen(false)}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-wider"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. COUPON SELECTION POPUP CARD MODAL */}
      {isCouponModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCouponModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 shadow-2xl relative z-50 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Tag size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Apply Coupon Code</h3>
                  <p className="text-[11px] font-bold text-slate-400">Save extra discount on your ride</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setIsCouponModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Coupon Modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Coupon Code</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Enter code (e.g. CITY50)..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:border-slate-800 uppercase placeholder:normal-case transition-colors"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!couponInput.trim()) return;
                    setAppliedCoupon(couponInput.trim());
                    setIsCouponModalOpen(false);
                    if (showToast) showToast(`🎉 Coupon ${couponInput.trim()} applied!`);
                    setCouponInput('');
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black cursor-pointer transition-all active:scale-95 shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Available Coupons</span>
              <div className="space-y-2">
                {[
                  { code: 'SECOND50', title: '50% OFF up to ₹50', desc: 'Valid on all bike & auto rides today', tag: 'BEST VALUE' },
                  { code: 'CITY20', title: 'Flat ₹20 OFF', desc: 'Applicable on rides above ₹30', tag: 'POPULAR' },
                  { code: 'FREERIDE', title: '100% Coins Cashback', desc: 'Get full ride value in Coins', tag: 'CASHBACK' },
                ].map((c) => {
                  const isCurrent = appliedCoupon === c.code;
                  return (
                    <div 
                      key={c.code}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                        isCurrent 
                          ? 'border-emerald-500 bg-emerald-50/60' 
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 uppercase tracking-wide">{c.code}</span>
                          <span className="text-[9px] font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded tracking-wider">{c.tag}</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-800 pt-0.5">{c.title}</p>
                        <p className="text-[10px] text-slate-500 truncate">{c.desc}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (isCurrent) {
                            setAppliedCoupon('');
                            if (showToast) showToast('Coupon removed');
                          } else {
                            setAppliedCoupon(c.code);
                            setIsCouponModalOpen(false);
                            if (showToast) showToast(`🎉 Coupon ${c.code} applied!`);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                          isCurrent 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isCurrent ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SCHEDULE POPUP CARD MODAL */}
      {isScheduleModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsScheduleModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 shadow-2xl relative z-50 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Schedule Your Ride</h3>
                  <p className="text-[11px] font-bold text-slate-400">Pick date & time for pickup</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Schedule Modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between bg-amber-50 p-3 rounded-2xl border border-amber-200/80">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-700" />
                <span className="text-xs font-black text-amber-950">Need a ride tomorrow?</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setScheduleDate(tomorrowStr);
                  if (showToast) showToast('Set date to Tomorrow');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  scheduleDate === tomorrowStr 
                    ? 'bg-amber-500 text-slate-950 shadow-xs' 
                    : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {scheduleDate === tomorrowStr ? '✓ Tomorrow Selected' : 'Tomorrow Quick'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Select Date</label>
                <input 
                  type="date"
                  min={todayStr}
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Select Time</label>
                <input 
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 outline-none focus:border-slate-800 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Popular Time Slots</span>
              <div className="grid grid-cols-2 gap-2">
                {quickTimes.map((slot) => {
                  const isSelected = scheduleTime === slot.value;
                  return (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => setScheduleTime(slot.value)}
                      className={`p-2.5 rounded-xl border text-xs font-black text-center transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs' 
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{slot.label}</span>
                      {isSelected && <Check size={14} className="text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmSchedule}
                className="w-full py-3.5 rounded-2xl bg-[#FFC107] hover:bg-[#ffca28] text-slate-950 font-black text-xs uppercase tracking-wider transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={16} className="stroke-[3]" />
                <span>Confirm Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. DRIVER PROFILE POPUP CARD MODAL */}
      {isDriverProfileOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDriverProfileOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 shadow-2xl relative z-50 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            {/* Header / Close button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Captain Profile</h3>
                  <p className="text-[11px] font-bold text-slate-400">Verified driver details & ratings</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setIsDriverProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Driver Profile Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Avatar Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden shadow-md">
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative shrink-0">
                <img 
                  src={activeDriver.photo} 
                  alt={activeDriver.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="text-base font-black text-white truncate">{activeDriver.name}</h3>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs">
                    <Star size={11} className="fill-slate-950 text-slate-950" />
                    <span>{activeDriver.rating} Rating</span>
                  </span>
                  
                  <span className="text-slate-300 text-xs font-bold">{activeDriver.trips}</span>
                </div>

                <p className="text-[11px] text-amber-300 font-semibold">{activeDriver.experience}</p>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3.5 space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider">Assigned Vehicle</span>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">{activeDriver.vehicleName}</h4>
                  <p className="text-xs font-bold text-slate-500">Color: {activeDriver.vehicleColor}</p>
                </div>

                <div className="bg-[#FFD600] text-slate-950 font-mono font-black text-xs tracking-wider px-3 py-1 rounded-lg border border-black shadow-xs uppercase">
                  {activeDriver.licensePlate}
                </div>
              </div>
            </div>

            {/* Languages & Reviews */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Driver Details</span>
              
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="font-bold text-slate-500">Spoken Languages:</span>
                  <span className="font-black text-slate-900">{activeDriver.language}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="font-bold text-slate-500">Customer Rating:</span>
                  <span className="font-black text-emerald-700">{activeDriver.satisfaction}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-500">Emergency Contact:</span>
                  <span className="font-mono font-black text-slate-900">Masked for Privacy</span>
                </div>
              </div>
            </div>

            {/* Direct Call / Message Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                type="button"
                onClick={() => {
                  setIsDriverProfileOpen(false);
                  window.location.href = 'tel:1122334455';
                  if (showToast) showToast('📞 Opening dialpad with 1122334455...');
                }}
                className="py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
              >
                <Phone size={16} className="text-amber-400" />
                <span>Call {activeDriver.name}</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  setIsDriverProfileOpen(false);
                  setIsChatOpen(true);
                  if (showToast) showToast('💬 Message window opened');
                }}
                className="py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
              >
                <MessageSquare size={16} className="text-slate-950" />
                <span>Message Driver</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. DISCREET SOS EMERGENCY SAFETY POPUP MODAL CARD */}
      {isSosModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSosModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-5 border border-rose-200 shadow-2xl relative z-50 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Header with Red Safety Shield */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <ShieldAlert size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-rose-950 uppercase tracking-wide">Emergency SOS Center</h3>
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-500">Instant Helpline & Live GPS Broadcast</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSosModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close SOS Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Emergency Call Helplines */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Quick Emergency Helplines</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = 'tel:112';
                    if (showToast) showToast('🚨 Dialing Police Emergency Helpline (112)...');
                  }}
                  className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 rounded-2xl flex items-center gap-2.5 transition-all text-left cursor-pointer group shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-rose-950">Call Police</span>
                    <span className="block text-[10px] font-bold text-rose-700">Dial 112 / 100</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = 'tel:108';
                    if (showToast) showToast('🚑 Dialing Medical Ambulance Service (108)...');
                  }}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-2xl flex items-center gap-2.5 transition-all text-left cursor-pointer group shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-emerald-950">Call Ambulance</span>
                    <span className="block text-[10px] font-bold text-emerald-700">Dial 108</span>
                  </div>
                </button>
              </div>

              {/* 24x7 Safety Control Room Helpline */}
              <button
                type="button"
                onClick={() => {
                  window.location.href = 'tel:18001237274';
                  if (showToast) showToast('🛡️ Dialing 24x7 Rapido Safety Control Room...');
                }}
                className="w-full p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl flex items-center justify-between transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black">Rapido 24x7 Safety Desk</span>
                    <span className="block text-[10px] text-slate-300 font-medium">1800 123 7274 (Toll Free)</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Share Live Trip Location */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Share Live Trip Location</span>
              
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Share2 size={16} className="text-amber-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-xs font-black text-slate-900 truncate">Live GPS Tracking Link</span>
                    <span className="block text-[10px] font-mono text-slate-400 truncate">rapido.app/track/live?ride=RPD8829</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (showToast) showToast('📋 Live tracking link copied to clipboard! Share with family.');
                  }}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shrink-0 transition-colors cursor-pointer shadow-2xs"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Pre-set Emergency Contacts */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Pre-set Emergency Contacts</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">3 Contacts Saved</span>
              </div>

              <div className="space-y-1.5">
                {[
                  { name: 'Dad (Ramesh Sharma)', phone: '+91 98765 00001', rel: 'Primary Contact' },
                  { name: 'Mom (Sunita Sharma)', phone: '+91 98765 00002', rel: 'Secondary Contact' },
                  { name: 'Priya (Sister)', phone: '+91 98765 00003', rel: 'Family' },
                ].map((c) => (
                  <div key={c.phone} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <div>
                        <span className="font-extrabold text-slate-900 block leading-tight">{c.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.phone}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {c.rel}
                    </span>
                  </div>
                ))}
              </div>

              {/* One-Tap Send Alert to All Emergency Contacts */}
              <button
                type="button"
                onClick={() => {
                  setSosSent(true);
                  if (showToast) showToast('🚨 SOS ALERT SENT! Emergency SMS with live GPS link dispatched to 3 contacts.');
                  setTimeout(() => setSosSent(false), 4000);
                }}
                className={`w-full py-3 px-4 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  sosSent 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-98'
                }`}
              >
                {sosSent ? (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    <span>SOS Alert Sent to 3 Contacts!</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Instant SOS SMS to All Contacts</span>
                  </>
                )}
              </button>
            </div>

            {/* Loud Siren Emergency Alarm Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Siren size={18} className={sirenActive ? 'text-rose-600 animate-bounce' : 'text-slate-400'} />
                <div>
                  <span className="block text-xs font-black text-slate-900">Loud Siren Sound</span>
                  <span className="block text-[10px] text-slate-400 font-medium">Attract nearby attention</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const nextState = !sirenActive;
                  setSirenActive(nextState);
                  if (showToast) showToast(nextState ? '🚨 LOUD SIREN ALARM ACTIVATED!' : 'Siren Alarm deactivated');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer border ${
                  sirenActive
                    ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {sirenActive ? 'STOP SIREN' : 'START SIREN'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. DRIVER CALL POPUP MODAL */}
      {isCallModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCallModalOpen(false);
              setIsCallingActive(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-slate-900 text-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-6 border border-slate-800 shadow-2xl relative z-50 space-y-5 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Call Captain</h3>
                  <p className="text-[11px] font-bold text-slate-400">Encrypted Masked Calling</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setIsCallModalOpen(false);
                  setIsCallingActive(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Call Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Driver Call Info & Pulse State */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
              <div className="relative">
                {isCallingActive && (
                  <div className="absolute -inset-3 rounded-full bg-emerald-500/30 animate-ping" />
                )}
                <img 
                  src={activeDriver.photo} 
                  alt={activeDriver.name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-emerald-400 shadow-xl relative z-10"
                />
              </div>

              <div>
                <h4 className="text-lg font-black text-white">{activeDriver.name}</h4>
                <p className="text-xs text-amber-400 font-bold">{activeDriver.vehicleName} • {activeDriver.licensePlate}</p>
              </div>

              {isCallingActive ? (
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-mono font-black animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>In Call • {formatCallTime(callDuration)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Free Internet Voice Call</p>
                </div>
              ) : (
                <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-full text-xs font-bold text-emerald-400 animate-pulse">
                  Connecting via Secure Masked Line...
                </div>
              )}
            </div>

            {/* Active Call Control Buttons */}
            {isCallingActive ? (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  className={`py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 font-black text-xs transition-colors cursor-pointer ${
                    isMuted ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                  <span>{isMuted ? 'Muted' : 'Mute'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSpeakerOn((prev) => !prev)}
                  className={`py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 font-black text-xs transition-colors cursor-pointer ${
                    isSpeakerOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  <span>{isSpeakerOn ? 'Speaker ON' : 'Speaker'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    endCall();
                    if (showToast) showToast('Call ended');
                  }}
                  className="py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl flex flex-col items-center justify-center gap-1.5 font-black text-xs transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <PhoneOff size={20} />
                  <span>End Call</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    startCall();
                    if (showToast) showToast(`📞 Calling ${activeDriver.name}... Voice connected!`);
                  }}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 uppercase tracking-wider"
                >
                  <PhoneCall size={18} />
                  <span>Start Free In-App Internet Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCallModalOpen(false);
                    // Masked call simulation
                    if (showToast) showToast(`📞 Connecting secure call to ${activeDriver.name}...`);
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
                >
                  <Phone size={15} />
                  <span>Call {activeDriver.name}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. DRIVER CHAT INTERACTIVE DRAWER MODAL */}
      {isChatOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsChatOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-end justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-4 border border-slate-200 shadow-2xl relative z-50 space-y-3 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img 
                    src={activeDriver.photo} 
                    alt={activeDriver.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <span>{activeDriver.name}</span>
                    <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                      ★ {activeDriver.rating}
                    </span>
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500">
                    {activeDriver.vehicleName} • Arriving in {formatEta(etaSeconds)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Chat Message History */}
            <div className="flex-1 overflow-y-auto space-y-2.5 p-2 bg-slate-50 rounded-2xl border border-slate-200/80 min-h-[220px] max-h-[300px]">
              {chatMessages.map((msg) => {
                const isDriver = msg.sender === 'driver';
                return (
                  <div key={msg.id} className={`flex flex-col ${isDriver ? 'items-start' : 'items-end'}`}>
                    <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs font-semibold shadow-2xs ${
                      isDriver 
                        ? 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs' 
                        : 'bg-slate-900 text-white rounded-tr-xs'
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 px-1 pt-0.5">{msg.time}</span>
                  </div>
                );
              })}
              <div ref={chatMessagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="space-y-1 shrink-0">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Quick Suggestions</span>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  "I'm at the pickup point 📍",
                  "Wearing blue shirt 👕",
                  "Wait 2 mins please ⏳",
                  "Please turn on AC ❄️",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-[10px] font-bold text-slate-700 whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 pt-1 shrink-0"
            >
              <input 
                type="text"
                placeholder="Type message to driver..."
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-extrabold text-slate-900 outline-none focus:border-slate-800 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInputText.trim()}
                className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0"
                aria-label="Send Message"
              >
                <Send size={16} className="translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. POST-RIDE RATING POPUP CARD MODAL */}
      {isRatingModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsRatingModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 shadow-2xl relative z-50 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Star size={18} className="fill-amber-600 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Ride Completed! 🎉</h3>
                  <p className="text-[11px] font-bold text-slate-400">Rate your experience with captain</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRatingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Rating Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Driver Profile Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center gap-3">
              <img 
                src={activeDriver.photo} 
                alt={activeDriver.name} 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div>
                <h4 className="text-xs font-black text-slate-900">{activeDriver.name}</h4>
                <p className="text-[10px] font-bold text-slate-500">{activeDriver.vehicleName} • {activeDriver.licensePlate}</p>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Trip Completed • {selectedPayment}
                </span>
              </div>
            </div>

            {/* Interactive 5-Star Selector */}
            <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tap Stars to Rate</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverStars || ratingStars) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverStars(star)}
                      onMouseLeave={() => setHoverStars(0)}
                      onClick={() => setRatingStars(star)}
                      className="p-1 transition-transform active:scale-125 cursor-pointer"
                    >
                      <Star 
                        size={32} 
                        className={active ? 'fill-amber-400 text-amber-500 drop-shadow-sm' : 'text-slate-300'} 
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-black text-amber-700 pt-0.5">
                {ratingStars === 5 ? 'Excellent! Loved the ride! ⭐⭐⭐⭐⭐' :
                 ratingStars === 4 ? 'Very Good Experience! ⭐⭐⭐⭐' :
                 ratingStars === 3 ? 'Good Ride ⭐⭐⭐' :
                 ratingStars === 2 ? 'Fair ⭐⭐' : 'Poor ⭐'}
              </span>
            </div>

            {/* Quick Feedback Tags */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Compliments & Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Safe Driving', 'Punctual Arrival', 'Clean Vehicle', 
                  'Polite Captain', 'Great Route', 'AC Comfort', 'Smooth Driving'
                ].map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedTags(prev => prev.filter(t => t !== tag));
                        } else {
                          setSelectedTags(prev => [...prev, tag]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        isSelected 
                          ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-2xs' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tip Driver Option */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tip Captain (Optional)</span>
              <div className="grid grid-cols-4 gap-2">
                {['No Tip', '₹10', '₹20', '₹50'].map((amt) => {
                  const isSelected = tipAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTipAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer border text-center ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-2xs' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {amt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comments Textarea */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Comment / Feedback</label>
              <textarea 
                rows="2"
                placeholder="Write a compliment for the captain..."
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 outline-none focus:border-slate-800 transition-colors resize-none"
              />
            </div>

            {/* Submit Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleSubmitRating}
                disabled={isRatingSubmitted}
                className="w-full py-3.5 bg-[#FFC107] hover:bg-[#ffca28] text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
              >
                {isRatingSubmitted ? (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    <span>Rating Submitted! Thank You</span>
                  </>
                ) : (
                  <>
                    <ThumbsUp size={16} />
                    <span>Submit Rating & Feedback</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsRatingModalOpen(false);
                  setBooked(false);
                  if (showToast) showToast('Ride finished! Ready for next booking.');
                }}
                className="w-full py-2 text-center text-xs font-black text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. RAPIDO REAL-TIME CAPTAIN ASSIGNING MODAL / OVERLAY */}
      {isSearchingCaptain && (
        <div 
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-300 animate-in fade-in"
          aria-modal="true"
          role="dialog"
        >
          {/* Top Bar */}
          <div className="w-full max-w-[440px] flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Captain Assigning</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSearchingCaptain(false);
                if (showToast) showToast('Search cancelled');
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Cancel Search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Center Radar Scanner Graphic */}
          <div className="w-full max-w-[440px] flex flex-col items-center justify-center text-center space-y-5 my-auto py-4">
            {/* Animated Concentric Radar Rings */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute w-56 h-56 rounded-full border border-amber-500/10 animate-ping duration-1000" />
              <div className="absolute w-44 h-44 rounded-full border-2 border-amber-500/20 animate-pulse duration-700" />
              <div className="absolute w-32 h-32 rounded-full bg-amber-500/5 border border-amber-500/30" />
              
              {/* Center Vehicle Pulsing Pin */}
              <div className="w-20 h-20 rounded-full bg-[#FFC107] border-4 border-white shadow-xl flex items-center justify-center text-3xl text-slate-950 z-10 animate-bounce">
                {vehicleIcon}
              </div>
            </div>

            {/* Dynamic Search Status Text */}
            <div className="space-y-1 px-4">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {searchProgress < 35 
                  ? 'Searching 5 nearby captains...' 
                  : searchProgress < 75 
                  ? `Connecting to Captain ${activeDriver.name}...` 
                  : 'Matching fare & assigning ride...'}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                {searchProgress < 35 
                  ? '5 Captains notified within 1 km radius' 
                  : searchProgress < 75 
                  ? `${activeDriver.vehicleName} • ${activeDriver.rating}★` 
                  : 'Locking trip price and dispatching OTP'}
              </p>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-[#FFC107] h-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: `${searchProgress}%` }}
              />
            </div>

            {/* Tip Captain to match faster */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-left">
                <div>
                  <span className="block text-xs font-black text-slate-900">Tip Captain to match faster</span>
                  <span className="block text-[10px] text-slate-500 font-medium">100% tip goes directly to captain</span>
                </div>
                {addedTip > 0 && (
                  <span className="text-xs font-black text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                    +₹{addedTip} Tip
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map((amount) => {
                  const isSelected = addedTip === amount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        const nextTip = isSelected ? 0 : amount;
                        setAddedTip(nextTip);
                        if (showToast) showToast(nextTip > 0 ? `Added ₹${nextTip} tip for faster captain matching!` : 'Tip removed');
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#FFC107] text-slate-950 border-[#FFC107] shadow-sm' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      +₹{amount}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trip Details Recap */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs">
              <div className="text-left space-y-0.5 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 font-black text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{pickupLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 font-black text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="truncate">{destLabel}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="block text-slate-400 uppercase text-[9px] font-black">FARE</span>
                <span className="block text-base font-black text-slate-900">
                  ₹{(parseInt((rideOptions.find(r => r.id === selectedRide)?.price || '12').replace('₹', ''), 10) + addedTip)}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Cancel Button */}
          <div className="w-full max-w-[440px] pb-2">
            <button
              type="button"
              onClick={() => {
                setIsSearchingCaptain(false);
                if (showToast) showToast('Search cancelled. Re-select ride option.');
              }}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-black text-xs uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <RotateCcw size={15} />
              <span>Cancel Captain Search</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

