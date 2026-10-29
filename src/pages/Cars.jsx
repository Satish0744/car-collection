import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { cars, brands, categories } from '../data/cars';
import CarCard from '../components/CarCard';

export default function Cars() {
  const [search, setSearch]   = useState('');
  const [brand, setBrand]     = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy]   = useState('popular');

  const filtered = useMemo(() => {
    let list = [...cars];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.model.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.specs.fuelType.toLowerCase().includes(q)
      );
    }
    if (brand)    list = list.filter(c => c.brandId === brand);
    if (category) list = list.filter(c => c.category === category);

    if (sortBy === 'price-low')  list.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-high') list.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     list.sort((a,b) => b.rating - a.rating);
    if (sortBy === 'year')       list.sort((a,b) => b.year - a.year);
    return list;
  }, [search, brand, category, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="mb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
          The <span className="text-gold">Collection</span>
        </h1>
        <p className="text-lux-muted">{filtered.length} vehicles available</p>
      </motion.div>

      <div className="card-lux p-4 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lux-muted" />
          <input
            value={search} onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by model, brand, fuel..."
            className="input-lux pl-10"
          />
        </div>
        <select value={brand} onChange={(e)=>setBrand(e.target.value)} className="input-lux">
          <option value="">All Brands</option>
          {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="input-lux">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="input-lux md:col-span-4">
          <option value="popular">Sort: Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="year">Newest</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-lux-muted">
          <p className="text-2xl mb-2">No cars match your filters</p>
          <button onClick={() => { setSearch(''); setBrand(''); setCategory(''); }}
            className="btn-outline mt-4">Reset</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
        </div>
      )}
    </div>
  );
}