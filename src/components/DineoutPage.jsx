export const DineoutPageContent = () => {
  return (
    <div className="space-y-6">
      {/* Hero Card: Flat 20% OFF at Social */}
      <div className="w-full px-4 mb-5">
        <div className="w-full relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#e8491d] via-[#dc3e15] to-[#ba2f0b] p-5 text-white shadow-xl">
          {/* Date Badge */}
          <div className="inline-block bg-[#881800]/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-white/10">
            20TH-22ND OCTOBER
          </div>

          {/* Food Dishes Collage */}
          <div className="relative w-full h-48 my-2">
            {/* Ramen Bowl Left */}
            <img
              src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=80"
              alt="Ramen"
              className="absolute left-0 top-4 w-28 h-28 object-cover rounded-full shadow-2xl border-4 border-white/20 z-0"
            />
            {/* Egg Tuck Center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center z-20">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80"
                alt="Egg Tuck"
                className="w-24 h-24 object-cover rounded-3xl shadow-2xl border-4 border-amber-300"
              />
              <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full mt-1 tracking-tight shadow-md">
                EGG TUCK
              </span>
            </div>
            {/* Cheesecake Right */}
            <img
              src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&auto=format&fit=crop&q=80"
              alt="Cheesecake"
              className="absolute right-0 top-2 w-28 h-28 object-cover rounded-full shadow-2xl border-4 border-white/20 z-0"
            />
          </div>

          {/* Offer Details */}
          <div className="flex flex-col items-center text-center mt-4">
            <span className="text-[14px] font-black tracking-[0.2em] text-white/80 uppercase drop-shadow-sm">
              S(#)CIAL
            </span>
            <h3 className="text-[32px] font-black leading-none text-white tracking-tight mt-1">
              Flat 20% OFF
            </h3>
            <p className="text-[12px] text-white/90 font-bold mt-2 uppercase tracking-wide">
              + 20% cashback at Social
            </p>

            <button className="mt-5 px-10 py-2.5 bg-[#8c1800] hover:bg-[#701300] active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl transition-all border border-white/10">
              Grab Now
            </button>
          </div>
        </div>
      </div>

      {/* GIRF Section */}
      <div className="w-full px-4">
        <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest mb-4">
          Great Indian Restaurant Festival
        </h4>

        <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {/* Card 1: UP TO 50% OFF */}
          <div className="w-[140px] h-[140px] shrink-0 bg-slate-50 rounded-[32px] p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">UP TO</span>
            <div className="text-[40px] font-black text-slate-900 leading-none my-1">
              50<span className="text-[20px]">%</span>
            </div>
            <span className="text-[12px] font-black text-slate-900 tracking-widest">OFF</span>
          </div>

          {/* Card 2: Nightlife & Drinks */}
          <div className="w-[140px] h-[140px] shrink-0 bg-slate-50 rounded-[32px] p-4 border border-slate-100 flex flex-col justify-between shadow-sm">
            <h5 className="font-black text-[13px] text-slate-900 leading-tight">
              Nightlife<br />& Drinks
            </h5>
            <div className="flex justify-end">
              <span className="text-3xl">🍷</span>
            </div>
          </div>

          {/* Card 3: Flash Sale */}
          <div className="w-[140px] h-[140px] shrink-0 bg-slate-50 rounded-[32px] p-4 border border-slate-100 flex flex-col justify-between shadow-sm">
            <h5 className="font-black text-[13px] text-slate-900 leading-tight">
              Flash Sale<br />Up To 70%
            </h5>
            <div className="flex justify-end">
              <span className="text-3xl">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Dineout Restaurants - Standard Feed Style */}
      <div className="px-4 pb-8">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Explore Dining in Mumbai</h3>
        <div className="space-y-4">
          {[
            { name: "Bastian Beach", loc: "Worli", discount: "25% OFF", rating: "4.9", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80" },
            { name: "The Bombay Canteen", loc: "Lower Parel", discount: "15% OFF", rating: "4.8", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80" }
          ].map((r, i) => (
            <div key={i} className="flex bg-slate-50 p-4 rounded-[28px] border border-slate-100 shadow-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-between py-1">
                <div>
                   <h4 className="text-[15px] font-black text-slate-900 leading-tight">{r.name}</h4>
                   <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">{r.loc} • {r.rating} ★</p>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{r.discount}</span>
                   <button className="px-5 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase">BOOK TABLE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
