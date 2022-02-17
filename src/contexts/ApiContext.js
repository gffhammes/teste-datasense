import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

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

  const removeItem = (item) => {
    const index = cartItems.indexOf(item);

    const newCartItems = cartItems;

    if (index > -1) {
      newCartItems.splice(index, 1);
    }

    setCartItems([...newCartItems]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    let url = "https://fakestoreapi.com/products";
    axios
      .get(url)
      .then(function (response) {
        setAllProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ApiContext.Provider
      value={{
        cartItems,
        saveItem,
        removeItem,
        clearCart,
        allProducts,
        isLoading,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default CartProvider;
