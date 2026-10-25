import React from 'react';
import { ShoppingBag, Heart, ChevronRight, Landmark, CreditCard, Receipt, Clock, Gift, ShieldCheck, Globe, Bell, Mail, User2, MessageCircle, Star, ExternalLink, Share2, PlayCircle, Briefcase, HelpCircle } from 'lucide-react';

export const AccountMenuList = ({ showToast, onOpenOrders, onOpenWishlist }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f9fafb]">
      
      {/* 1. Membership Card */}
      <div className="px-4 py-3">
        <div className="w-full rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12" />
          <div className="flex justify-between items-start relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-[13px]">
                <span>You're a</span>
                <span className="inline-flex items-center gap-1 text-indigo-600 bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                  <Star size={12} className="fill-indigo-600" />
                  Plus Silver
                </span>
                <span>member</span>
              </div>
              <p className="text-slate-500 text-[11px] font-medium mt-1">Valid till March 01, 2027</p>
            </div>
            <div className="bg-white px-2 py-1 rounded-full border border-indigo-100 flex items-center gap-1 shadow-sm">
              <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-black text-slate-900">0</div>
              <span className="text-[11px] font-black text-indigo-900 uppercase">Coins</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-indigo-100/50">
            <span className="text-[12px] font-black text-indigo-950 uppercase tracking-tight">Upgrade to <span className="text-[#800020]">BLACK</span> Membership</span>
            <ChevronRight size={16} className="text-indigo-900" />
          </div>
        </div>
      </div>

      {/* 2. Quick Actions: Orders & Wishlist */}
      <div className="px-4 py-2 flex gap-3">
        <button 
          type="button"
          onClick={() => {
            if (onOpenOrders) onOpenOrders();
            else if (showToast) showToast('Opening orders...');
          }}
          className="flex-1 bg-white rounded-xl border border-slate-200 py-3 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:border-slate-300"
        >
          <ShoppingBag size={18} className="text-[#800020]" />
          <span className="text-[13px] font-black text-slate-800">Orders</span>
        </button>
        <button 
          type="button"
          onClick={() => {
            if (onOpenWishlist) onOpenWishlist();
            else if (showToast) showToast('Opening wishlist...');
          }}
          className="flex-1 bg-white rounded-xl border border-slate-200 py-3 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:border-slate-300"
        >
          <Heart size={18} className="text-[#800020] fill-[#800020]" />
          <span className="text-[13px] font-black text-slate-800">Wishlist</span>
        </button>
      </div>

      {/* 3. Finance Options */}
      <div className="mt-6">
        <div className="px-5 mb-3 flex items-center justify-between">
          <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Finance Options</h3>
        </div>
        <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
          <FinanceItem onClick={() => showToast && showToast('Opening Personal Loan options')} icon={Landmark} title="Personal Loan" sub="Up to ₹10 Lakh | Instant disbursal" />
          <FinanceItem onClick={() => showToast && showToast('Checking Credit Card eligibility')} icon={CreditCard} title="Credit Card" sub="1% cashback on UPI & Non-UPI | 100% Appro..." />
          <FinanceItem onClick={() => showToast && showToast('Opening EMI deals')} icon={Receipt} title="EMI - The Big Deal Special!" sub="Up to ₹2 Lakh Credit | ₹1,000 Discount* | No ..." />
          <FinanceItem onClick={() => showToast && showToast('Opening Pay Later balance')} icon={Clock} title="Pay Later - Almost there" sub="Upto ₹200 off on CityOS, Shop | Zero charges" />
        </div>
      </div>

      {/* 4. Recently Viewed Stores */}
      <div className="mt-6">
        <div className="px-5 mb-4 flex items-center justify-between">
          <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Recently Viewed Stores</h3>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
          <StoreItem onClick={() => showToast && showToast('Viewing Wired Earphones')} image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200" name="Wired Earp..." />
          <StoreItem onClick={() => showToast && showToast('Viewing Office Study')} image="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200" name="Office Stud..." />
          <StoreItem onClick={() => showToast && showToast('Viewing Wireless Headphones')} image="https://images.unsplash.com/photo-1583394838336-acd990731a8b?w=200" name="Wireless H..." />
          <StoreItem onClick={() => showToast && showToast('Viewing Office Desk')} image="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=200" name="Office Desk" />
        </div>
      </div>

      {/* 5. Coupons & Offers */}
      <div className="px-4 mt-6">
        <div 
          onClick={() => showToast && showToast('Checking latest coupons & offers...')}
          className="w-full rounded-2xl bg-purple-50 border border-purple-100 p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
              <Gift size={20} className="fill-current" />
            </div>
            <span className="text-[14px] font-black text-purple-900">Explore and grab the best deals</span>
          </div>
          <ChevronRight size={18} className="text-purple-400" />
        </div>
      </div>

      {/* 6. Sponsored Ad */}
      <div className="px-4 mt-6">
        <div 
          onClick={() => showToast && showToast('Applying for special card offer...')}
          className="w-full rounded-2xl overflow-hidden bg-slate-900 aspect-[2/1] relative group cursor-pointer shadow-lg border border-white/10"
        >
          <img 
            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80" 
            alt="Ad" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-md text-[8px] font-black text-white/80 border border-white/10 uppercase tracking-widest">AD</div>
            <h4 className="text-white font-black text-[18px] leading-tight">Apply now</h4>
            <p className="text-white/60 text-[10px] font-bold mt-1">Limited time offer on credit cards</p>
          </div>
        </div>
      </div>

      {/* 7. Menu Groups */}
      <div className="mt-8 space-y-6">
        <MenuGroup title="Profile Settings">
          <MenuItem onClick={() => showToast && showToast('Opening Profile Editor')} icon={User2} label="Edit profile" />
          <MenuItem onClick={() => showToast && showToast('Viewing Saved Addresses')} icon={Landmark} label="Saved addresses" />
          <MenuItem onClick={() => showToast && showToast('Language: English')} icon={Globe} label="Change language" rightText="English" />
          <MenuItem onClick={() => showToast && showToast('Opening Notification Preferences')} icon={Bell} label="Notification settings" />
          <MenuItem onClick={() => showToast && showToast('Viewing Active Subscriptions')} icon={Mail} label="My subscriptions" />
        </MenuGroup>

        <MenuGroup title="Payments & Wallets">
          <MenuItem onClick={() => showToast && showToast('Opening Gift Cards')} icon={CreditCard} label="Gift card" rightAction="Add gift card" />
          <MenuItem onClick={() => showToast && showToast('Viewing Saved Cards & UPI')} icon={Receipt} label="Saved payment methods" />
        </MenuGroup>

        <MenuGroup title="Privacy & Security">
          <MenuItem onClick={() => showToast && showToast('Opening Privacy Center')} icon={ShieldCheck} label="Privacy center" />
          <MenuItem onClick={() => showToast && showToast('1 active login session')} icon={Clock} label="Manage devices" rightText="1 active device" />
        </MenuGroup>

        <MenuGroup title="Earn with CityOS">
          <MenuItem onClick={() => showToast && showToast('Opening Affiliate Portal')} icon={ExternalLink} label="Affiliate program" />
          <MenuItem onClick={() => showToast && showToast('Opening Seller Onboarding')} icon={ShoppingBag} label="Sell on CityOS" />
        </MenuGroup>

        <MenuGroup title="FAQ & Terms">
          <MenuItem onClick={() => showToast && showToast('Opening Help & Support FAQ')} icon={HelpCircle} label="FAQs" />
          <MenuItem onClick={() => showToast && showToast('Viewing Terms & Policies')} icon={ShieldCheck} label="Terms, Policies & Licences" />
        </MenuGroup>

        <MenuGroup title="My Activity">
          <MenuItem onClick={() => showToast && showToast('Viewing Community Questions')} icon={MessageCircle} label="Questions & Answers" />
        </MenuGroup>
      </div>

      {/* Social Follow */}
      <div className="px-4 mt-8 flex gap-2">
        <SocialBtn onClick={() => showToast && showToast('Opening CityOS Instagram')} icon={Share2} label="Instagram" />
        <SocialBtn onClick={() => showToast && showToast('Opening CityOS YouTube channel')} icon={PlayCircle} label="YouTube" />
        <SocialBtn onClick={() => showToast && showToast('Opening CityOS LinkedIn page')} icon={Briefcase} label="Linkedin" />
      </div>

      {/* Trusted Footer */}
      <div className="mt-12 mb-10 flex flex-col items-center opacity-40 select-none px-10 text-center">
        <h4 className="text-[28px] font-black text-slate-400 tracking-tighter leading-none grayscale contrast-125">
          Trusted by <br /> 50 Cr+ Users
        </h4>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">v3.25.02.00</p>
      </div>

    </div>
  );
};

const FinanceItem = ({ icon: Icon, title, sub, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-4 px-5 py-4 cursor-pointer active:bg-slate-50 transition-colors">
    <div className="w-10 h-10 rounded-full bg-[#800020]/5 flex items-center justify-center text-[#800020]">
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <h4 className="text-[14px] font-black text-slate-800 leading-tight">{title}</h4>
      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{sub}</p>
    </div>
    <ChevronRight size={16} className="text-slate-300" />
  </div>
);

const StoreItem = ({ image, name, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
    <div className="w-[85px] h-[85px] rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white p-1">
      <img src={image} alt={name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform" />
    </div>
    <span className="text-[10px] font-bold text-slate-600 line-clamp-1 w-20 text-center">{name}</span>
  </div>
);

const MenuGroup = ({ title, children }) => (
  <div className="flex flex-col">
    <div className="px-5 mb-2">
      <h3 className="text-[15px] font-black text-slate-900 tracking-tight">{title}</h3>
    </div>
    <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
      {children}
    </div>
  </div>
);

const MenuItem = ({ icon: Icon, label, rightText, rightAction, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-4 px-5 py-3.5 cursor-pointer active:bg-slate-50 transition-colors group">
    <Icon size={18} className="text-[#800020] opacity-70 group-hover:opacity-100" />
    <span className="flex-1 text-[13.5px] font-bold text-slate-700">{label}</span>
    {rightText && <span className="text-[12px] font-black text-[#800020] bg-[#800020]/5 px-2 py-0.5 rounded-full">{rightText}</span>}
    {rightAction && <span className="text-[11px] font-black text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md hover:bg-blue-50">{rightAction}</span>}
    {!rightAction && <ChevronRight size={16} className="text-slate-300" />}
  </div>
);

const SocialBtn = ({ icon: Icon, label, onClick }) => (
  <button type="button" onClick={onClick} className="flex-1 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all group cursor-pointer">
    <Icon size={18} className="text-slate-400 group-hover:text-[#800020] transition-colors" />
    <span className="text-[11px] font-black text-slate-600 group-hover:text-slate-900">{label}</span>
  </button>
);
