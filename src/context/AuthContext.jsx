import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('velocity_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // fake auth (in real life, call API)
    if (!email || !password) return { ok:false, error:'Fill all fields' };
    const users = JSON.parse(localStorage.getItem('velocity_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { ok:false, error:'Invalid credentials' };
    const u = { name: found.name, email: found.email };
    localStorage.setItem('velocity_user', JSON.stringify(u));
    setUser(u);
    return { ok:true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password) return { ok:false, error:'Fill all fields' };
    if (password.length < 6) return { ok:false, error:'Password ≥ 6 chars' };
    const users = JSON.parse(localStorage.getItem('velocity_users') || '[]');
    if (users.some(u => u.email === email)) return { ok:false, error:'Email exists' };
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('velocity_users', JSON.stringify(users));
    const u = { name, email };
    localStorage.setItem('velocity_user', JSON.stringify(u));
    setUser(u);
    return { ok:true };
  };

  const logout = () => {
    localStorage.removeItem('velocity_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);