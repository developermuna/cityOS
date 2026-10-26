import React from 'react';

export const RecommendedServicesSection = ({ services, onSelectService, onBookNow }) => {
  // Take services from index 6 to 10
  const recommendedList = services.slice(6, 10);

  return (
    <section className="px-4" aria-label="Recommended For Your Home">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">
            Recommended For You
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Handpicked by cityOS with 30-day service warranty
          </p>
        </div>
        <span className="text-[10px] font-bold text-[#606C38] bg-[#606C38]/10 border border-[#606C38]/20 px-2 py-0.5 rounded-full">
          🛡️ 30-Day Guarantee
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recommendedList.map((service) => (
          <div
            key={service.id}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex gap-3">
              <div 
                onClick={() => onSelectService(service)}
                className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 cursor-pointer"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#606C38] bg-[#606C38]/10 px-2 py-0.5 rounded-md inline-block">
                  Verified Standard
                </span>
                <h4 
                  onClick={() => onSelectService(service)}
                  className="text-[13px] font-bold text-slate-900 truncate mt-1 cursor-pointer hover:text-[#606C38]"
                >
                  {service.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-slate-900">₹{service.price}</span>
                <span className="text-[10px] text-slate-400 font-medium">starting</span>
              </div>

              <button
                type="button"
                onClick={() => onBookNow(service)}
                className="px-4 py-1.5 rounded-xl bg-[#606C38] hover:bg-[#4A5626] text-white text-[11px] font-black active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
