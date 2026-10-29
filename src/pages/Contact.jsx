import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Toast from '../components/Toast';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [toast, setToast] = useState({ show:false });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ show:true, msg:'Please fill all fields', type:'error' });
    } else {
      setToast({ show:true, msg:'Message sent! We\'ll reply soon.', type:'success' });
      setForm({ name:'', email:'', message:'' });
    }
    setTimeout(()=>setToast({ show:false }), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
        <p className="text-lux-gold tracking-widest text-sm mb-2">GET IN TOUCH</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold">Contact <span className="text-gold">Us</span></h1>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon:MapPin, title:'Visit Us', text:'Marine Drive, Mumbai 400020, India' },
            { icon:Phone,  title:'Call Us',  text:'+91 22 4567 8900' },
            { icon:Mail,   title:'Email',    text:'hello@velocity.com' },
          ].map(c => (
            <div key={c.title} className="card-lux p-6 flex gap-4">
              <c.icon className="w-8 h-8 text-lux-gold shrink-0"/>
              <div>
                <p className="font-semibold text-lux-gold">{c.title}</p>
                <p className="text-lux-muted">{c.text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl overflow-hidden">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=Marine%20Drive%20Mumbai&z=13&output=embed"
              className="w-full h-64 border-0"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="card-lux p-6 space-y-4">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
            className="input-lux" placeholder="Your Name" />
          <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
            className="input-lux" placeholder="Your Email" />
          <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})}
            rows={6} className="input-lux" placeholder="Your Message" />
          <button className="btn-gold w-full flex items-center justify-center gap-2">
            <Send className="w-4 h-4"/> Send Message
          </button>
        </form>
      </div>
      <Toast show={toast.show} message={toast.msg} type={toast.type} />
    </div>
  );
}