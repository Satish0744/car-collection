import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (res.ok) navigate('/');
    else setError(res.error);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        className="w-full max-w-md card-lux p-8"
      >
        <h1 className="text-3xl font-display font-bold mb-2 text-center">Welcome <span className="text-gold">Back</span></h1>
        <p className="text-lux-muted text-center mb-6 text-sm">Sign in to continue</p>

        {error && <p className="bg-red-500/20 text-red-300 text-sm p-3 rounded mb-4">{error}</p>}

        <form onSubmit={submit} className="space-y-4">
          <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
            className="input-lux" placeholder="Email" />
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}
            className="input-lux" placeholder="Password" />
          <button className="btn-gold w-full">Sign In</button>
        </form>

        <p className="text-center text-sm text-lux-muted mt-6">
          Don't have an account? <Link to="/signup" className="text-lux-gold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}