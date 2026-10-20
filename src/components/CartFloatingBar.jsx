import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, X, CheckCircle2 } from 'lucide-react';

export const CartFloatingBar = ({ cartItems = {}, storeItems = [], onClearCart, isOpen, setIsOpen }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Compute totals
  let totalCount = 0;
  let totalPrice = 0;
  const itemsList = [];

  Object.entries(cartItems).forEach(([id, count]) => {
    if (count > 0) {
      const item = storeItems.find((i) => i.id === id);
      if (item) {
        totalCount += count;
        totalPrice += item.dealPrice * count;
        itemsList.push({ ...item, count });
      }
    }
  });

  if (totalCount === 0 && !isOpen) return null;

  const discountCash = 20;
  const finalPrice = Math.max(0, totalPrice - discountCash);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setIsOpen(false);
      if (onClearCart) onClearCart();
    }, 2800);
  };

  return (
    <>
      {/* Floating Bottom Bar */}
      {totalCount > 0 && !isOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-50 animate-bounce-subtle">
          <div 
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#0f8a65] text-white p-3.5 rounded-2xl shadow-[0_10px_25px_rgba(15,138,101,0.5)] flex items-center justify-between cursor-pointer active:scale-98 transition-all border border-emerald-400/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                <ShoppingBag size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-black uppercase tracking-wider text-emerald-100">
                  {totalCount} {totalCount === 1 ? 'ITEM' : 'ITEMS'} ADDED
                </span>
                <span className="text-[14px] font-black">
                  ₹{totalPrice} <span className="text-xs font-normal text-emerald-200">plus taxes</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-xl font-black text-[12.5px] hover:bg-white/30 transition-colors">
              <span>VIEW CART</span>
              <ArrowRight size={14} className="stroke-[3]" />
            </div>
          </div>
        </div>
      )}

      {/* Slide-up Checkout Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[440px] bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto flex flex-col p-5 animate-slide-up shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#0f8a65]" />
                <h3 className="text-lg font-black text-slate-900">Your cityOS Cart</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {orderPlaced ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <CheckCircle2 size={56} className="text-[#0f8a65] animate-bounce" />
                <h4 className="text-xl font-black text-slate-900 mt-4">Order Confirmed!</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-xs">
                  ⚡ Delivering to Mumbai Central in 15-20 mins. Fresh & hot!
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="py-4 space-y-3">
                  {itemsList.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">₹{item.dealPrice} × {item.count}</span>
                      </div>
                      <span className="font-black text-slate-900">₹{item.dealPrice * item.count}</span>
                    </div>
                  ))}
                </div>

                {/* Free Cash Discount Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🪙</span>
                    <div>
                      <p className="text-xs font-black text-amber-900">₹20 Free Cash Auto-Applied</p>
                      <p className="text-[11px] text-amber-700">Special cityOS perk saving</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700">-₹20</span>
                </div>

                {/* Bill Breakdown */}
                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Item Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery Fee</span>
                    <span className="text-[#0f8a65] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Free Cash Savings</span>
                    <span className="text-[#0f8a65] font-bold">-₹{discountCash}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-2">
                    <span>TO PAY</span>
                    <span>₹{finalPrice}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-5 bg-[#fc8019] hover:bg-[#e27315] active:scale-98 text-white font-black py-3.5 rounded-2xl text-center shadow-lg transition-all"
                >
                  PAY ₹{finalPrice} & PLACE ORDER
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
