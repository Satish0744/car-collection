import { Link } from 'react-router-dom';
import { GitCompare } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

export default function Compare() {
  const { compareList, clearCompare } = useCompare();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-4xl font-display font-bold">
            Compare <span className="text-gold">Vehicles</span>
          </h1>
          <p className="text-lux-muted">{compareList.length} of 4 selected</p>
        </div>
        {compareList.length > 0 && (
          <button onClick={clearCompare} className="btn-outline text-sm !py-2 !px-4">Clear All</button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="text-center py-20 card-lux">
          <GitCompare className="w-16 h-16 text-lux-gold mx-auto mb-4"/>
          <p className="text-xl mb-2">No cars selected</p>
          <p className="text-lux-muted mb-6">Add 2-4 cars to compare side-by-side</p>
          <Link to="/cars" className="btn-gold inline-block">Browse Cars</Link>
        </div>
      ) : (
        <>
          <p className="text-lux-muted text-sm mb-4">
            Click "Compare Now" at the bottom bar to view the head-to-head breakdown.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.filter(c => compareList.some(x => x.id === c.id))
              .map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
          </div>
        </>
      )}
    </div>
  );
}