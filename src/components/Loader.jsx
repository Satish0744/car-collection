import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-lux-black z-[9999] flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease:'linear' }}
        className="w-24 h-24 border-4 border-lux-gold border-t-transparent rounded-full"
      />
      <motion.p
        initial={{ opacity:0, y:10 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.3 }}
        className="mt-8 text-gold text-3xl font-display font-bold tracking-widest"
      >
        VELOCITY
      </motion.p>
      <p className="text-lux-muted text-sm mt-2 tracking-[0.3em]">LOADING EXCELLENCE</p>
    </div>
  );
}