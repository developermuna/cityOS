import React from 'react';
import { ServiceCard } from './ServiceCard';

export const ServiceList = ({ showToast, onAddToCart }) => {
  const services = [
    { id: 'srv-1', title: 'AC Jet Cleaning & Service', time: 'Arrives in 25 mins', price: '₹499', dealPrice: 499, rating: '4.8 ★ (12k)', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?w=200&auto=format&fit=crop&q=80' },
    { id: 'srv-2', title: 'Full Home Deep Cleaning', time: 'Next slot at 11 AM', price: '₹1,499', dealPrice: 1499, rating: '4.9 ★ (8k)', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=200&auto=format&fit=crop&q=80' },
    { id: 'srv-3', title: 'Instant Electrician / Plumber', time: 'Arrives in 15 mins', price: '₹199', dealPrice: 199, rating: '4.7 ★ (22k)', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80' },
  ];

  return (
    <section className="px-4" aria-label="Top Rated Services">
      <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Top Rated Services</h3>
      <div className="space-y-4">
        {services.map((s, i) => (
          <ServiceCard 
            key={i} 
            service={s} 
            onAddToCart={onAddToCart} 
            showToast={showToast} 
          />
        ))}
      </div>
    </section>
  );
};
