/**
 * CartContext.jsx
 * 
 * Global shopping cart context
 * Stores: cart items, total price, add/remove functions
 * Used across entire app for cart state
 * 
 * Usage:
 *   const { items, total, addItem, removeItem } = useContext(CartContext);
 */

import { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const value = {
    items,
    setItems,
    total,
    setTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
