import React from 'react';

export const Bestsellers = ({ deals, onAddToCart, onSelectProduct, showToast }) => {
  return (
    <section className="px-4 pb-6" aria-label="Bestsellers">
      <div className="w-full bg-[#0F2C59] rounded-[40px] p-6 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-black text-[20px] tracking-tight">Bestsellers of the sale</h3>
          <div className="w-14 h-14 bg-amber-400 rounded-full flex flex-col items-center justify-center text-center p-1.5 border-2 border-white shadow-xl ring-4 ring-amber-400/20">
            <span className="text-[7px] font-black leading-none text-slate-900">THE BIG</span>
            <span className="text-[10px] font-black leading-none text-slate-900">BILLION</span>
            <span className="text-[7px] font-black leading-none text-slate-900">DAYS</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {deals.map(item => (
            <article 
              key={item.id} 
              onClick={() => {
                if (onSelectProduct) {
                  onSelectProduct(item);
                } else if (onAddToCart) {
                  onAddToCart({
                    id: `shop-best-${item.id}`,
                    name: item.name,
                    fullName: item.name,
                    dealPrice: 10390,
                    originalPrice: 14999,
                    image: item.image
                  });
                } else if (showToast) {
                  showToast(`Selected bestseller: ${item.name}`);
                }
              }}
              className="flex flex-col group cursor-pointer active:scale-95 transition-transform" 
              aria-label={`Bestseller: ${item.name}`}
            >
              <div className="w-full aspect-square rounded-[24px] overflow-hidden border border-white/20 shadow-lg mb-3 group-hover:scale-105 transition-transform duration-300">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl py-1.5 px-1 mb-2 border border-white/10">
                 <p className="text-white text-[9px] font-black text-center whitespace-nowrap">{item.price}</p>
              </div>
              <p className="text-white/90 text-[11px] font-bold text-center truncate px-1">{item.name}</p>
            </article>
          ))}
        </div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/10 rotate-45" />
        <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};
