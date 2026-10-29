import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Star, Gauge } from 'lucide-react';
import { cars, brands } from '../data/cars';
import CarCard from '../components/CarCard';

const stats = [
  { icon:Gauge,  value:'22+',   label:'Premium Models' },
  { icon:Zap,    value:'10',    label:'Elite Brands' },
  { icon:Shield, value:'100%',  label:'Verified' },
  { icon:Star,   value:'4.9★',  label:'Avg Rating' },
];

export default function Home() {
  const featured = cars.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale:1.2, opacity:0 }}
          animate={{ scale:1, opacity:1 }}
          transition={{ duration:1.6, ease:'easeOut' }}
          className="absolute inset-0"
        >
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920"
            alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-lux-black/70 via-lux-black/50 to-lux-black" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5 }}
            className="text-lux-gold tracking-[0.4em] text-sm mb-4"
          >
            PREMIUM · PERFORMANCE · PASSION
          </motion.p>
          <motion.h1
            initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.7 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Drive Your <span className="text-gold">Dream</span>
          </motion.h1>
          <motion.p
            initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.9 }}
            className="text-lg md:text-xl text-lux-muted mb-10 max-w-2xl mx-auto"
          >
            Explore the world's most exclusive automobiles — from iconic supercars
            to refined luxury SUVs, curated for the true connoisseur.
          </motion.p>
          <motion.div
            initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/cars" className="btn-gold flex items-center justify-center gap-2">
              Explore Collection <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/test-drive" className="btn-outline text-center">
              Book Test Drive
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y:[0, 10, 0] }} transition={{ duration:2, repeat:Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-lux-gold text-xs tracking-widest"
        >
          SCROLL TO DISCOVER
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:i * 0.1 }}
            className="card-lux p-6 text-center"
          >
            <s.icon className="w-8 h-8 text-lux-gold mx-auto mb-3" />
            <p className="text-3xl font-bold text-gold">{s.value}</p>
            <p className="text-lux-muted text-sm mt-1">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* FEATURED CARS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-lux-gold tracking-widest text-sm mb-2">CURATED COLLECTION</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Featured <span className="text-gold">Vehicles</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
        </div>
        <div className="text-center mt-12">
          <Link to="/cars" className="btn-outline inline-flex items-center gap-2">
            View All Cars <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* BRANDS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-lux-gold tracking-widest text-sm mb-2">WORLD-CLASS MARQUES</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Explore <span className="text-gold">Brands</span></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {brands.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ delay:i * 0.05 }}
              whileHover={{ scale:1.05 }}
            >
              <Link to="/brands" className="card-lux p-6 text-center block hover:border-lux-gold transition">
                <div className="text-4xl mb-2">{b.logo}</div>
                <p className="font-semibold text-lux-text">{b.name}</p>
                <p className="text-xs text-lux-muted">{b.country}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600"
            alt="cta" className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-lux-black via-lux-black/70 to-transparent flex items-center">
            <div className="p-8 md:p-16 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Ready for the <span className="text-gold">Ultimate Drive?</span>
              </h2>
              <p className="text-lux-muted mb-8">Book a personalized test drive at your nearest showroom.</p>
              <Link to="/test-drive" className="btn-gold inline-block">Book Test Drive</Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}