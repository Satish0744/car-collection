import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = cars.filter(c => wishlist.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-display font-bold mb-2">
        My <span className="text-gold">Wishlist</span>
      </h1>
      <p className="text-lux-muted mb-8">{items.length} saved vehicles</p>

      {items.length === 0 ? (
        <div className="text-center py-20 card-lux">
          <Heart className="w-16 h-16 text-lux-gold mx-auto mb-4"/>
          <p className="text-xl mb-2">Your wishlist is empty</p>
          <p className="text-lux-muted mb-6">Save your favorite cars to view them here</p>
          <Link to="/cars" className="btn-gold inline-block">Explore Cars</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
        </div>
      )}
    </div>
  );
}