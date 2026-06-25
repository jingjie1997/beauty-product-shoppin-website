import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    // Sample data so the checkout flow can be tested immediately
    { id: 1, product_id: 1, name: '水潤保濕精華', price: 580, quantity: 2 },
    { id: 2, product_id: 2, name: '玫瑰漾色唇膏', price: 320, quantity: 1 },
  ]);

  const clearCart = () => setCartItems([]);

  const addItem = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product_id === item.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item, id: Date.now() }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, total, addItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
