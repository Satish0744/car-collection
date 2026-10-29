import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, LogOut, Menu, X, GitCompare } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';

const links = [
  { to:'/',           label:'Home' },
  { to:'/cars',       label:'Cars' },
  { to:'/brands',     label:'Brands' },
  { to:'/compare',    label:'Compare' },
  { to:'/test-drive', label:'Test Drive' },
  { to:'/about',      label:'About' },
  { to:'/contact',    label:'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y:-80 }} animate={{ y:0 }}
      className="sticky top-0 z-50 bg-lux-black/90 backdrop-blur border-b border-lux-border"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-display font-bold text-gold">VELOCITY</Link>

        <div className="hidden lg:flex gap-6">
          {links.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-lux-gold' : 'text-lux-text hover:text-lux-gold'}`
              }>{l.label}</NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/wishlist" className="relative">
            <Heart className="w-5 h-5 hover:text-lux-gold" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-lux-gold text-lux-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/compare" className="relative">
            <GitCompare className="w-5 h-5 hover:text-lux-gold" />
            {compareList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-lux-gold text-lux-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-lux-muted">Hi, {user.name}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="text-lux-gold">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-gold text-sm !py-2 !px-4 flex items-center gap-2">
              <User className="w-4 h-4"/> Login
            </Link>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
          className="lg:hidden bg-lux-card border-t border-lux-border px-6 py-4 space-y-3">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={()=>setOpen(false)}
              className="block text-lux-text hover:text-lux-gold py-2">{l.label}</NavLink>
          ))}
          <Link to="/wishlist" onClick={()=>setOpen(false)} className="block py-2">Wishlist ({wishlist.length})</Link>
          <Link to="/compare"  onClick={()=>setOpen(false)} className="block py-2">Compare ({compareList.length})</Link>
          {user ? (
            <button onClick={()=>{ logout(); setOpen(false); }} className="btn-outline w-full">Logout</button>
          ) : (
            <Link to="/login" onClick={()=>setOpen(false)} className="btn-gold w-full block text-center">Login</Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}