import { motion } from 'framer-motion';
import { Award, Users, Car, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-12">
        <p className="text-lux-gold tracking-widest text-sm mb-2">OUR STORY</p>
        <h1 className="text-4xl md:text-6xl font-display font-bold">Driven by <span className="text-gold">Passion</span></h1>
      </motion.div>

      <div className="rounded-2xl overflow-hidden mb-12">
        <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600" alt="" className="w-full h-[400px] object-cover" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <h2 className="text-3xl font-display font-bold mb-4 text-gold">Who We Are</h2>
          <p className="text-lux-muted leading-relaxed mb-4">
            Velocity is the destination for automotive excellence. Since our founding,
            we've curated the world's finest collection of luxury, sports, and exotic
            automobiles — connecting discerning enthusiasts with their dream machines.
          </p>
          <p className="text-lux-muted leading-relaxed">
            From iconic supercars to refined luxury SUVs, every vehicle in our showroom
            is meticulously vetted, verified, and presented with the highest standard
            of care. Our team of automotive specialists are passionate about cars,
            and even more passionate about matching people with vehicles they'll love.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon:Car,   val:'22+', label:'Premium Models' },
            { icon:Award, val:'10',  label:'Elite Brands' },
            { icon:Users, val:'5K+', label:'Happy Clients' },
            { icon:Globe, val:'15+', label:'Showrooms' },
          ].map(s => (
            <div key={s.label} className="card-lux p-6 text-center">
              <s.icon className="w-8 h-8 text-lux-gold mx-auto mb-3"/>
              <p className="text-3xl font-bold text-gold">{s.val}</p>
              <p className="text-sm text-lux-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card-lux p-8">
        <h2 className="text-3xl font-display font-bold mb-6 text-gold">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title:'Curated Excellence', desc:'Every car in our collection is hand-selected, verified, and inspected to the highest standards.' },
            { title:'Client First', desc:'From first enquiry to keys in hand, we deliver a concierge experience at every step.' },
            { title:'Transparency', desc:'No hidden fees. No surprises. Just honest pricing and clear communication.' },
          ].map(v => (
            <div key={v.title}>
              <h3 className="text-xl font-bold mb-2 text-lux-gold">{v.title}</h3>
              <p className="text-lux-muted text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}