import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const saveItem = (item) => {
    const found = cartItems.some((e) => e.id === item.id);

    if (!found) {
      const newItem = { id: item.id, qty: "1" };
      setCartItems([...cartItems, newItem]);
    } else {
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.qty = parseInt(cartItem.qty) + 1;
        }
      });
      setCartItems([...cartItems]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, saveItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
