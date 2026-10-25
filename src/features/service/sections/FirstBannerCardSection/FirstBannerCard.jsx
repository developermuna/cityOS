import React, { useState, useEffect } from 'react';

const SERVICE_ADS = [
  {
    id: 's-ad-1',
    badge: 'URBANCRAFT EXCLUSIVE',
    title: 'AC Jet Cleaning & Appliance Care',
    desc: '30-min home dispatch with 30 days warranty.',
    cta: 'BOOK AT ₹499',
    gradient: 'bg-gradient-to-r from-[#2E1065] via-[#4C1D95] to-[#1E1B4B]',
    icon: '❄️'
  },
  {
    id: 's-ad-2',
    badge: 'LUXURY SALON AT HOME',
    title: 'Glow Beauty & Spa Sessions',
    desc: '100% hygienic, single-use kits & certified beauticians.',
    cta: 'FLAT 50% OFF',
    gradient: 'bg-gradient-to-r from-[#831843] via-[#BE185D] to-[#500724]',
    icon: '💅'
  },
  {
    id: 's-ad-3',
    badge: 'EXPERT ELECTRICIAN & PLUMBER',
    title: 'Instant Fix & Deep Home Care',
    desc: 'Background verified professionals in under 15 minutes.',
    cta: 'FIX NOW',
    gradient: 'bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#022C22]',
    icon: '⚡'
  }
];

export const FirstBannerCard = ({ showToast }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto sliding timer (changes every 3.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SERVICE_ADS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeAd = SERVICE_ADS[currentSlide];

  return (
    <section className="px-4 pt-2 pb-1 select-none" style={{ perspective: '1200px' }} aria-label="Service Advertising Banner">
      <div 
        onClick={() => showToast && showToast(`🛠️ ${activeAd.title}: ${activeAd.cta}`)}
        className={`w-full h-[140px] p-4 rounded-[24px] ${activeAd.gradient} text-white shadow-md relative overflow-hidden flex flex-col justify-between cursor-pointer active:scale-[0.99] transition-all duration-700`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/5 pointer-events-none" />
        
        {/* Floating Category Icon */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
            <span className="text-2xl">{activeAd.icon}</span>
          </div>
        </div>

        {/* Top Badge */}
        <div className="z-10">
          <span className="text-[9px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-3 py-1 rounded-full inline-block border border-amber-300 shadow-2xs">
            {activeAd.badge}
          </span>
          <h2 className="text-2xl font-black leading-tight mt-2 drop-shadow-sm">
            {activeAd.title}
          </h2>
          <p className="text-xs text-white/90 mt-1 font-semibold max-w-[80%]">
            {activeAd.desc}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between z-10 pt-2 border-t border-white/15">
          <span className="text-[10px] font-black bg-white text-slate-950 px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
            {activeAd.cta}
          </span>
        </div>
      </div>
    </section>
  );
};
