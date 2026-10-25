import React from 'react';
import { X, Home, Briefcase, MapPin } from 'lucide-react';
import { CurrentLocationButton } from './CurrentLocationButton';
import { AddressActionButtons } from './AddressActionButtons';
import { SavedAddressItem } from './SavedAddressItem';
import { RecentSearches } from './RecentSearches';

export const AddressSelector = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const savedAddresses = [
    { id: 1, type: 'Home', address: 'Rama Krishna Nagar, Rayagada, Odisha 765001', icon: Home },
    { id: 2, type: 'Work', address: 'District Collectorate Complex, Gautam Nagar, Rayagada', icon: Briefcase },
    { id: 3, type: 'Other', address: 'Maa Majhighouri Temple Road, Rayagada', icon: MapPin },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center sm:items-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[440px] bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300">
        <div className="w-full flex justify-center py-3">
          <div className="w-10 h-1.5 bg-slate-200 rounded-full" />
        </div>

        <div className="px-6 flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Select Address</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-8 overflow-y-auto max-h-[70vh]">
          <CurrentLocationButton onClick={() => { onSelect('Current Location'); onClose(); }} />
          <AddressActionButtons />

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Saved Addresses</h3>
            <div className="space-y-2">
              {savedAddresses.map((addr) => (
                <SavedAddressItem 
                  key={addr.id} 
                  address={addr} 
                  onClick={() => { onSelect(addr.address); onClose(); }} 
                />
              ))}
            </div>
          </div>
          
          <RecentSearches />
        </div>
      </div>
    </div>
  );
};
