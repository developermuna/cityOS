import React from 'react';
import { RentalImageGallery } from '../components/RentalImageGallery';

export const RentalGallerySection = ({ images, title }) => {
  return (
    <section className="px-4 pt-3 pb-2" aria-label="Rental Images">
      <RentalImageGallery images={images} title={title} />
    </section>
  );
};
