import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { brands, getCarsByBrand, formatPrice } from '../data/cars';

export default function Brands() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
        Our <span className="text-gold">Brands</span>
      </h1>
      <p className="text-lux-muted mb-10">10 legendary marques, one standard of excellence</p>

      <div className="space-y-8">
        {brands.map((brand, i) => {
          const bCars = getCarsByBrand(brand.id);
          return (
            <motion.div
              key={brand.id}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * 0.05 }}
              className="card-lux p-6"
            >
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{brand.logo}</span>
                  <div>
                    <h2 className="text-2xl font-display font-bold">{brand.name}</h2>
                    <p className="text-sm text-lux-muted">{brand.tagline}</p>
                    <p className="text-xs text-lux-muted">{brand.country} · Est. {brand.founded}</p>
                  </div>
                </div>
                <span className="text-lux-gold text-sm">{bCars.length} models</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bCars.map(car => (
                  <Link key={car.id} to={`/cars/${car.id}`}
                    className="flex items-center gap-3 bg-lux-dark rounded-lg p-3 hover:bg-lux-border transition">
                    <img src={car.images[0]} alt="" className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{car.model}</p>
                      <p className="text-xs text-lux-muted">{car.year} · {car.specs.horsepower}</p>
                      <p className="text-sm text-gold font-semibold">{formatPrice(car.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}