import { motion } from 'framer-motion';
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease:'linear' }}
        className="w-16 h-16 border-4 border-lux-gold border-t-transparent rounded-full"
      />
    </div>
  );
}