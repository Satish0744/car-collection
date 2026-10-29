import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, GitCompare, Star } from 'lucide-react';
import { formatPrice } from '../data/cars';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useState } from 'react';
import Toast from './Toast';

export default function CarCard({ car, index = 0 }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const [toast, setToast] = useState({ show:false, msg:'', type:'success' });

  const handleCompare = (e) => {
    e.preventDefault();
    const res = addToCompare(car);
    setToast({
      show:true, type: res.ok ? 'success' : 'error',
      msg: res.ok ? `${car.model} added to compare` : res.error,
    });
    setTimeout(() => setToast({ show:false }), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y:-8 }}
        className="card-lux group"
      >
        <Link to={`/cars/${car.id}`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={car.images[0]} alt={car.model}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-lux-black/70 backdrop-blur rounded-full px-2 py-1 text-xs text-lux-gold">
              <Star className="w-3 h-3 fill-lux-gold"/> {car.rating}
            </div>
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(car.id); }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-lux-black/70 backdrop-blur flex items-center justify-center hover:bg-lux-gold hover:text-lux-black transition"
            >
              <Heart className={`w-4 h-4 ${isWishlisted(car.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <span className="absolute bottom-3 left-3 text-xs uppercase tracking-wider bg-lux-gold text-lux-black px-2 py-1 rounded">
              {car.category}
            </span>
          </div>

          <div className="p-4">
            <p className="text-lux-muted text-xs uppercase tracking-widest">{car.brand}</p>
            <h3 className="text-lg font-bold text-lux-text mt-1">{car.model}</h3>
            <p className="text-xs text-lux-muted mt-1">
              {car.year} · {car.specs.fuelType} · {car.specs.transmission}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-gold font-bold text-lg">{formatPrice(car.price)}</span>
              <button
                onClick={handleCompare}
                className={`text-xs px-3 py-1.5 rounded-md border transition flex items-center gap-1 ${
                  isInCompare(car.id)
                    ? 'bg-lux-gold text-lux-black border-lux-gold'
                    : 'border-lux-gold text-lux-gold hover:bg-lux-gold hover:text-lux-black'
                }`}
              >
                <GitCompare className="w-3 h-3"/> {isInCompare(car.id) ? 'Added' : 'Compare'}
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
      <Toast show={toast.show} message={toast.msg} type={toast.type} />
    </>
  );
}