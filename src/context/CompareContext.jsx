import { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const addToCompare = (car) => {
    if (compareList.length >= 4) return { ok:false, error:'Max 4 cars can be compared' };
    if (compareList.some(c => c.id === car.id)) return { ok:false, error:'Already added' };
    setCompareList(prev => [...prev, car]);
    return { ok:true };
  };

  const removeFromCompare = (id) =>
    setCompareList(prev => prev.filter(c => c.id !== id));

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{
      compareList, addToCompare, removeFromCompare,
      clearCompare, showCompare, setShowCompare,
      isInCompare: (id) => compareList.some(c => c.id === id),
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);