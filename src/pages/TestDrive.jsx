import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, CheckCircle } from 'lucide-react';
import { cars } from '../data/cars';
import Toast from '../components/Toast';

export default function TestDrive() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', carId:'', date:'', time:'', showroom:'' });
  const [toast, setToast] = useState({ show:false, msg:'', type:'success' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.carId || !form.date || !form.time || !form.showroom) {
      setToast({ show:true, msg:'Please fill all fields', type:'error' });
      setTimeout(()=>setToast({ show:false }), 2500);
      return;
    }
    const car = cars.find(c => c.id === form.carId);
    setToast({ show:true, msg:`Test drive booked for ${car.model}! We'll contact you shortly.`, type:'success' });
    setForm({ name:'', email:'', phone:'', carId:'', date:'', time:'', showroom:'' });
    setTimeout(()=>setToast({ show:false }), 3000);
  };

  const selectedCar = cars.find(c => c.id === form.carId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
          Book a <span className="text-gold">Test Drive</span>
        </h1>
        <p className="text-lux-muted mb-8">Experience your dream car in person</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={submit} className="card-lux p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Calendar className="text-lux-gold"/> Booking Details</h2>
          <input name="name"  value={form.name}  onChange={handle} className="input-lux" placeholder="Full Name" />
          <input name="email" value={form.email} onChange={handle} className="input-lux" placeholder="Email" type="email" />
          <input name="phone" value={form.phone} onChange={handle} className="input-lux" placeholder="Phone Number" />
          <select name="carId" value={form.carId} onChange={handle} className="input-lux">
            <option value="">Select a car</option>
            {cars.map(c => <option key={c.id} value={c.id}>{c.brand} {c.model}</option>)}
          </select>
          {selectedCar && (
            <select name="showroom" value={form.showroom} onChange={handle} className="input-lux">
              <option value="">Select showroom</option>
              <option value={selectedCar.showroom.name}>{selectedCar.showroom.name}</option>
            </select>
          )}
          <div className="grid grid-cols-2 gap-3">
            <input name="date" value={form.date} onChange={handle} type="date" className="input-lux" />
            <input name="time" value={form.time} onChange={handle} type="time" className="input-lux" />
          </div>
          <button type="submit" className="btn-gold w-full">Confirm Booking</button>
        </form>

        <div className="card-lux p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Car className="text-lux-gold"/> Preview</h2>
          {selectedCar ? (
            <>
              <img src={selectedCar.images[0]} className="rounded-lg mb-4 w-full aspect-[16/10] object-cover" alt="" />
              <p className="text-lux-muted text-sm">{selectedCar.brand}</p>
              <p className="text-2xl font-bold mb-2">{selectedCar.model}</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-lux-gold"/> {selectedCar.specs.horsepower}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-lux-gold"/> {selectedCar.specs.acceleration}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-lux-gold"/> {selectedCar.showroom.name}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-lux-gold"/> {selectedCar.showroom.address}</li>
              </ul>
            </>
          ) : (
            <p className="text-lux-muted">Select a car to preview details</p>
          )}
        </div>
      </div>
      <Toast show={toast.show} message={toast.msg} type={toast.type} />
    </div>
  );
}