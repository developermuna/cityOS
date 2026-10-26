import React from 'react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';

export const RentalPlayPage = ({ onBack, showToast }) => {
  const videoCards = [
    {
      title: '360° Virtual Tour: Lakeview Luxury Villa',
      category: 'Property Walkthrough',
      duration: '2:15',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600'
    },
    {
      title: 'How Vehicle Inspection & Handover Works on cityOS',
      category: 'Rental Guide',
      duration: '1:45',
      image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=600'
    },
    {
      title: 'Escrow Security Deposit: 100% Refund Explained',
      category: 'Safety & Trust',
      duration: '1:10',
      image: 'https://images.unsplash.com/photo-1545324418-f1d3c5b53574?w=600'
    }
  ];

  return (
    <div className="w-full pb-20 font-sans bg-[#fff8f5] min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black text-slate-900 leading-tight">Rental Shorts & Tours</h2>
          <span className="text-[10px] text-slate-500 font-medium">Virtual walkthroughs & guides</span>
        </div>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-4">
        {videoCards.map((vid, idx) => (
          <div
            key={idx}
            onClick={() => showToast && showToast(`Playing "${vid.title}"`)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer group"
          >
            <div className="relative aspect-video w-full bg-slate-900">
              <img src={vid.image} alt={vid.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {vid.duration}
              </span>
            </div>

            <div className="p-3.5">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                {vid.category}
              </span>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#FF5200] transition-colors leading-snug">
                {vid.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
