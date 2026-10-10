import { createContext, useContext, useState } from 'react';
import { byId, shippingFor } from './data.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // shortcut: cart lives in memory only, lost on reload; persist (localStorage or backend) once real checkout exists.
  const [items, setItems] = useState([]);

  const add = (id, qty) =>
    setItems(list => (list.some(x => x.id === id)
      ? list.map(x => (x.id === id ? { ...x, qty: x.qty + qty } : x))
      : [...list, { id, qty }]));
  const change = (id, d) => setItems(list => list.map(x => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const remove = id => setItems(list => list.filter(x => x.id !== id));

  const count = items.reduce((a, x) => a + x.qty, 0);
  const subtotal = items.reduce((a, x) => a + byId(x.id).price * x.qty, 0);
  const shipping = shippingFor(subtotal);

  return (
    <CartContext.Provider value={{ items, add, change, remove, count, subtotal, shipping, total: subtotal + shipping }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
