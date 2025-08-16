import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCartItemsForUser,
  createCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../Services/CartService";

// Create the context
const CartContext = createContext();

// Custom hook to use cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart on first render
  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await getCartItemsForUser();
        setCart(items);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Add item
  const addItem = async (item) => {
    const added = await createCartItem(item);
    setCart((prev) => [...prev, added]);
  };

  // Update item (e.g. quantity)
  const updateItem = async (item) => {
    const updated = await updateCartItem(item);
    setCart((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    );
  };

  // Remove item
  const removeItem = async (id) => {
    await removeCartItem(id);
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear cart
  const clear = async () => {
    await clearCart();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addItem, updateItem, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
};
