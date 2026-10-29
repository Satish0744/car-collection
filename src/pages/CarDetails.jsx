import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, GitCompare, Star, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail, Check, Gauge, Fuel, Users, Cog, Zap, Award
} from 'lucide-react';
import { getCarById, getRelatedCars, formatPrice } from '../data/cars';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import CarCard from '../components/CarCard';
import Toast from '../components/Toast';

export default function CarDetails() {
  const { id } = useParams();
  const car = getCarById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [toast, setToast] = useState({ show:false });
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();

  if (!car) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-4">Car not found</p>
        <Link to="/cars" className="btn-outline">Back to Collection</Link>
      </div>
    );
  }

  const related = getRelatedCars(car, 5);

  const keySpecs = [
    { icon:Gauge, label:'Horsepower',    value:car.specs.horsepower },
    { icon:Zap,   label:'0-100 km/h',    value:car.specs.acceleration },
    { icon:Fuel,  label:'Fuel',          value:car.specs.fuelType },
    { icon:Users, label:'Seats',         value:car.specs.seating },
    { icon:Cog,   label:'Transmission',  value:car.specs.transmission },
    { icon:Award, label:'Top Speed',     value:car.specs.topSpeed },
  ];

  const allSpecs = [
    ['Engine',        car.specs.engine],
    ['Horsepower',    car.specs.horsepower],
    ['Torque',        car.specs.torque],
    ['Transmission',  car.specs.transmission],
    ['Drivetrain',    car.specs.drivetrain],
    ['0-100 km/h',    car.specs.acceleration],
    ['Top Speed',     car.specs.topSpeed],
    ['Fuel Type',     car.specs.fuelType],
    ['Mileage/Range', car.specs.mileage],
    ['Seating',       car.specs.seating],
    ['Body Type',     car.specs.bodyType],
    ['Ground Clearance', car.specs.groundClearance],
    ['Boot Space',    car.specs.bootSpace],
    ['Fuel Tank/Capacity', car.specs.fuelTank],
    ['Kerb Weight',   car.specs.kerbWeight],
    ['Length',        car.specs.length],
    ['Width',         car.specs.width],
    ['Height',        car.specs.height],
    ['Wheelbase',     car.specs.wheelbase],
    ['Warranty',      car.specs.warranty],
  ];

  const handleCompare = () => {
    const res = addToCompare(car);
    setToast({ show:true, type:res.ok ? 'success' : 'error', msg:res.ok ? 'Added to compare' : res.error });
    setTimeout(()=>setToast({ show:false }), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <p className="text-sm text-lux-muted mb-4">
        <Link to="/cars" className="hover:text-lux-gold">Collection</Link> / {car.brand} / {car.model}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="relative rounded-2xl overflow-hidden aspect-[16/10]"
          >
            <img src={car.images[activeImg]} alt={car.model} className="w-full h-full object-cover" />
            <button onClick={()=>setActiveImg(p => (p - 1 + car.images.length) % car.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-lux-gold hover:text-black">
              <ChevronLeft/>
            </button>
            <button onClick={()=>setActiveImg(p => (p + 1) % car.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-lux-gold hover:text-black">
              <ChevronRight/>
            </button>
          </motion.div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {car.images.map((img, i) => (
              <button key={i} onClick={()=>setActiveImg(i)}
                className={`rounded-lg overflow-hidden aspect-[16/10] ${i === activeImg ? 'ring-2 ring-lux-gold' : 'opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-lux-gold text-lux-black px-2 py-1 rounded text-xs uppercase tracking-wider">{car.category}</span>
            <span className="flex items-center gap-1 text-lux-gold text-sm">
              <Star className="w-4 h-4 fill-lux-gold"/> {car.rating} ({car.reviews} reviews)
            </span>
          </div>
          <p className="text-lux-muted uppercase tracking-widest text-sm">{car.brand} · {car.year}</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-3">{car.model}</h1>
          <p className="text-3xl text-gold font-bold mb-6">{formatPrice(car.price)}</p>

          {/* Key specs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {keySpecs.map(s => (
              <div key={s.label} className="bg-lux-card border border-lux-border rounded-lg p-3 text-center">
                <s.icon className="w-5 h-5 text-lux-gold mx-auto mb-1" />
                <p className="text-xs text-lux-muted">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Colors */}
          <p className="text-sm text-lux-muted mb-2">Available Colors</p>
          <div className="flex gap-2 mb-6">
            {car.colors.map(c => (
              <div key={c.name} className="group relative">
                <div className="w-10 h-10 rounded-full border-2 border-lux-border" style={{ background:c.hex }} />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-lux-black px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition">{c.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleCompare}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
                isInCompare(car.id)
                  ? 'bg-lux-gold text-lux-black'
                  : 'btn-outline'
              }`}>
              <GitCompare className="w-4 h-4"/> {isInCompare(car.id) ? 'Added to Compare' : 'Add to Compare'}
            </button>
            <button onClick={() => toggleWishlist(car.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition border-2 ${
                isWishlisted(car.id) ? 'border-red-500 text-red-500' : 'border-lux-gold text-lux-gold hover:bg-lux-gold hover:text-lux-black'
              }`}>
              <Heart className={`w-4 h-4 ${isWishlisted(car.id) ? 'fill-red-500' : ''}`}/>
              {isWishlisted(car.id) ? 'Wishlisted' : 'Wishlist'}
            </button>
            <Link to="/test-drive" className="btn-gold">Book Test Drive</Link>
          </div>
        </div>
      </div>

      {/* Showroom */}
      <section className="card-lux mt-10 p-6">
        <h2 className="text-2xl font-display font-bold mb-4 text-gold">Showroom Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="font-semibold text-lg">{car.showroom.name}</p>
            <p className="flex items-center gap-2 text-lux-muted"><MapPin className="w-4 h-4 text-lux-gold"/>{car.showroom.address}</p>
            <p className="flex items-center gap-2 text-lux-muted"><Phone className="w-4 h-4 text-lux-gold"/>{car.showroom.phone}</p>
            <p className="flex items-center gap-2 text-lux-muted"><Mail className="w-4 h-4 text-lux-gold"/>{car.showroom.email}</p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe
              title="showroom"
              src={`https://maps.google.com/maps?q=${car.showroom.lat},${car.showroom.lng}&z=14&output=embed`}
              className="w-full h-56 border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-display font-bold text-gold">Specifications</h2>
          <button onClick={()=>setShowAllSpecs(!showAllSpecs)}
            className="btn-outline text-sm !py-2 !px-4">
            {showAllSpecs ? 'Show Less' : 'Show All'}
          </button>
        </div>
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(showAllSpecs ? allSpecs : allSpecs.slice(0, 8)).map(([k, v]) => (
            <div key={k} className="card-lux p-4">
              <p className="text-xs text-lux-muted uppercase">{k}</p>
              <p className="text-sm font-semibold mt-1">{v}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-display font-bold text-gold">Features</h2>
          <button onClick={()=>setShowAllFeatures(!showAllFeatures)}
            className="btn-outline text-sm !py-2 !px-4">
            {showAllFeatures ? 'Show Less' : `Show All (${car.features.length})`}
          </button>
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {(showAllFeatures ? car.features : car.features.slice(0, 9)).map(f => (
            <div key={f} className="flex items-center gap-2 text-lux-text bg-lux-card border border-lux-border rounded-lg px-4 py-2">
              <Check className="w-4 h-4 text-lux-gold shrink-0"/>
              <span className="text-sm">{f}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Related */}
      <section className="mt-12">
        <h2 className="text-2xl font-display font-bold text-gold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((r, i) => <CarCard key={r.id} car={r} index={i} />)}
        </div>
      </section>

      <Toast show={toast.show} message={toast.msg} type={toast.type} />
    </div>
  );
}