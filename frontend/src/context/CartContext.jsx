import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          item.id !== id || item.size !== size || item.color !== color
      )
    );
  };

  const updateQuantity = (id, size, color, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
