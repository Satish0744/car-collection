// Main entry — imports everything and exposes helpers
export { brands } from './brands';
export { categories } from './categories';
export { cars } from './cars/index';

import { cars as allCars } from './cars/index';

export const getCarById     = (id)  => allCars.find(c => c.id === id);
export const getCarsByBrand = (bid) => allCars.filter(c => c.brandId === bid);
export const getRelatedCars = (car, n=5) => {
  const same   = allCars.filter(c => c.brandId === car.brandId && c.id !== car.id);
  const others = allCars.filter(c => c.brandId !== car.brandId && c.category === car.category);
  return [...same, ...others].slice(0, n);
};
export const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p/10000000).toFixed(2)} Cr`;
  if (p >= 100000)   return `₹${(p/100000).toFixed(2)} L`;
  return `₹${p.toLocaleString('en-IN')}`;
};