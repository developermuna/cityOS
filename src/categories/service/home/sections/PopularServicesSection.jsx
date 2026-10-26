import React from 'react';

export const PopularServicesSection = ({ services, onSelectService, onBookNow }) => {
  const popularList = services.slice(0, 6);

  return (
    <section className="px-4" aria-label="Most Booked Services">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">
            Popular Right Now
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Most requested services in your neighborhood
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {popularList.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group"
          >
            <div 
              onClick={() => onSelectService(service)}
              className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 cursor-pointer"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div 
                onClick={() => onSelectService(service)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13px] font-bold text-slate-900 truncate leading-tight group-hover:text-[#606C38] transition-colors">
                    {service.title}
                  </h4>
                  {service.isEmergency && (
                    <span className="text-[9px] font-black text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded-md">
                      FAST
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                  <span className="text-amber-600 font-bold">★ {service.rating}</span>
                  <span>•</span>
                  <span>⏱ {service.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
                <span className="text-sm font-black text-slate-900">
                  ₹{service.price}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookNow(service)}
                    className="px-3 py-1 rounded-xl bg-[#606C38] hover:bg-[#4A5626] text-white text-[11px] font-black active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
