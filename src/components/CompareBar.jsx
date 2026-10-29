import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

export default function CompareBar() {
  const { compareList, removeFromCompare, setShowCompare, clearCompare } = useCompare();
  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y:120 }} animate={{ y:0 }} exit={{ y:120 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-lux-card border-t-2 border-lux-gold shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
            <GitCompare className="text-lux-gold" />
            <span className="text-sm text-lux-muted hidden sm:block">Compare ({compareList.length}/4):</span>
            <div className="flex-1 flex flex-wrap gap-2">
              {compareList.map(c => (
                <div key={c.id} className="flex items-center gap-2 bg-lux-dark px-3 py-1.5 rounded-lg text-sm">
                  <img src={c.images[0]} alt="" className="w-6 h-6 rounded object-cover" />
                  <span>{c.model}</span>
                  <button onClick={()=>removeFromCompare(c.id)}><X className="w-3 h-3 hover:text-red-500"/></button>
                </div>
              ))}
            </div>
            <button onClick={clearCompare} className="text-xs text-lux-muted hover:text-red-400">Clear</button>
            <button
              onClick={()=>setShowCompare(true)}
              disabled={compareList.length < 2}
              className="btn-gold text-sm !py-2 !px-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Compare Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}