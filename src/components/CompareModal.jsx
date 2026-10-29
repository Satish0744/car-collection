import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../data/cars';

const FIELDS = [
  { key:'price',           label:'Price',         format:(c)=>formatPrice(c.price), numeric:true, lowerBetter:true },
  { key:'year',            label:'Year',          format:(c)=>c.year },
  { key:'rating',          label:'Rating',        format:(c)=>`${c.rating}★`, numeric:true },
  { key:'engine',          label:'Engine',        format:(c)=>c.specs.engine },
  { key:'horsepower',      label:'Horsepower',    format:(c)=>c.specs.horsepower, numeric:true },
  { key:'torque',          label:'Torque',        format:(c)=>c.specs.torque,     numeric:true },
  { key:'acceleration',    label:'0–100 km/h',    format:(c)=>c.specs.acceleration, numeric:true, lowerBetter:true },
  { key:'topSpeed',        label:'Top Speed',     format:(c)=>c.specs.topSpeed,   numeric:true },
  { key:'transmission',    label:'Transmission',  format:(c)=>c.specs.transmission },
  { key:'drivetrain',      label:'Drivetrain',    format:(c)=>c.specs.drivetrain },
  { key:'fuelType',        label:'Fuel Type',     format:(c)=>c.specs.fuelType },
  { key:'mileage',         label:'Mileage/Range', format:(c)=>c.specs.mileage },
  { key:'seating',         label:'Seating',       format:(c)=>c.specs.seating },
  { key:'bodyType',        label:'Body Type',     format:(c)=>c.specs.bodyType },
  { key:'bootSpace',       label:'Boot Space',    format:(c)=>c.specs.bootSpace },
  { key:'kerbWeight',      label:'Kerb Weight',   format:(c)=>c.specs.kerbWeight },
  { key:'warranty',        label:'Warranty',      format:(c)=>c.specs.warranty },
];

const num = (s) => parseFloat(String(s).replace(/[^0-9.]/g,'')) || 0;

export default function CompareModal() {
  const { compareList, showCompare, setShowCompare, removeFromCompare } = useCompare();
  if (!showCompare || compareList.length < 2) return null;

  // determine best per row
  const winner = (car, field) => {
    if (!field.numeric) return false;
    const values = compareList.map(c => num(field.format(c)));
    const best = field.lowerBetter ? Math.min(...values) : Math.max(...values);
    return num(field.format(car)) === best;
  };

  // overall winner: count wins
  const score = compareList.map(c => {
    let s = 0;
    FIELDS.forEach(f => { if (winner(c, f)) s++; });
    return s;
  });
  const winnerIdx = score.indexOf(Math.max(...score));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md overflow-y-auto p-4"
        onClick={()=>setShowCompare(false)}
      >
        <motion.div
          initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }}
          onClick={(e)=>e.stopPropagation()}
          className="max-w-6xl mx-auto my-8 bg-lux-card rounded-2xl border border-lux-border overflow-hidden"
        >
          <div className="flex justify-between items-center p-5 border-b border-lux-border">
            <h2 className="text-2xl font-display font-bold text-gold">Head-to-Head Comparison</h2>
            <button onClick={()=>setShowCompare(false)}><X /></button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lux-dark">
                  <th className="text-left p-4 text-lux-muted min-w-[140px]">Spec</th>
                  {compareList.map((c, i) => (
                    <th key={c.id} className="p-4 text-center min-w-[200px]">
                      <div className="relative">
                        {i === winnerIdx && (
                          <div className="absolute -top-1 right-0 bg-lux-gold text-lux-black px-2 py-0.5 rounded text-xs flex items-center gap-1">
                            <Trophy className="w-3 h-3"/> Best
                          </div>
                        )}
                        <img src={c.images[0]} alt="" className="w-full h-24 object-cover rounded-lg mb-2" />
                        <p className="font-bold text-lux-text">{c.brand}</p>
                        <p className="text-lux-gold">{c.model}</p>
                        <button onClick={()=>removeFromCompare(c.id)}
                          className="text-xs text-lux-muted hover:text-red-400 mt-1">Remove</button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIELDS.map((f, ri) => (
                  <tr key={f.key} className={ri % 2 ? 'bg-lux-dark/50' : ''}>
                    <td className="p-4 text-lux-muted font-medium">{f.label}</td>
                    {compareList.map(c => (
                      <td key={c.id}
                        className={`p-4 text-center ${winner(c, f) ? 'text-lux-gold font-bold bg-lux-gold/5' : 'text-lux-text'}`}>
                        {f.format(c)}
                        {winner(c, f) && ' ✓'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}