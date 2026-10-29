import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q:'How do I book a test drive?', a:'Click "Test Drive" in the navigation, select your preferred car, date, and showroom. Our team will contact you within 24 hours to confirm.' },
  { q:'What documents are required to purchase a car?', a:'You need a valid driver\'s license, government-issued ID (Aadhaar/PAN), proof of address, and proof of income (for financing).' },
  { q:'Do you offer financing options?', a:'Yes, we partner with leading banks and NBFCs to offer flexible EMI plans starting from 7.5% interest rates.' },
  { q:'Can I compare multiple cars?', a:'Yes! Add up to 4 cars to compare and click the "Compare Now" button to view a detailed side-by-side breakdown.' },
  { q:'How long is the warranty?', a:'Warranty varies by brand — typically 3 years / 100,000 km. Electric vehicles carry an 8-year battery warranty.' },
  { q:'Do you deliver cars across India?', a:'Yes, we deliver nationwide. Delivery time ranges 3-7 business days based on your location.' },
  { q:'Are the cars new or used?', a:'We only sell brand-new vehicles sourced directly from authorized dealerships.' },
  { q:'What payment methods do you accept?', a:'We accept bank transfers, certified checks, credit cards, and financing options.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
        <p className="text-lux-gold tracking-widest text-sm mb-2">SUPPORT</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold">Frequently Asked <span className="text-gold">Questions</span></h1>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i * 0.05 }}
            className="card-lux overflow-hidden"
          >
            <button
              onClick={()=>setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-lux-dark transition"
            >
              <span className="font-semibold pr-4">{f.q}</span>
              {open === i ? <Minus className="text-lux-gold shrink-0"/> : <Plus className="text-lux-gold shrink-0"/>}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-lux-muted text-sm leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}