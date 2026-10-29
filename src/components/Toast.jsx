import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Toast({ message, type='success', show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x:400, opacity:0 }}
          animate={{ x:0, opacity:1 }}
          exit={{ x:400, opacity:0 }}
          className={`fixed top-24 right-6 z-[1000] px-6 py-4 rounded-lg flex items-center gap-3 shadow-2xl ${
            type==='success' ? 'bg-green-600' : 'bg-red-600'
          } text-white font-semibold`}
        >
          {type === 'success' ? <CheckCircle/> : <XCircle/>}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}