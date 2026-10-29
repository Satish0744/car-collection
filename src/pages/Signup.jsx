import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = signup(form.name, form.email, form.password);
    if (res.ok) navigate('/');
    else setError(res.error);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        className="w-full max-w-md card-lux p-8"
      >
        <h1 className="text-3xl font-display font-bold mb-2 text-center">Create <span className="text-gold">Account</span></h1>
        <p className="text-lux-muted text-center mb-6 text-sm">Join Velocity today</p>

        {error && <p className="bg-red-500/20 text-red-300 text-sm p-3 rounded mb-4">{error}</p>}

        <form onSubmit={submit} className="space-y-4">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
            className="input-lux" placeholder="Full Name" />
          <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
            className="input-lux" placeholder="Email" />
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}
            className="input-lux" placeholder="Password (min 6 chars)" />
          <button className="btn-gold w-full">Sign Up</button>
        </form>

        <p className="text-center text-sm text-lux-muted mt-6">
          Already have an account? <Link to="/login" className="text-lux-gold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}