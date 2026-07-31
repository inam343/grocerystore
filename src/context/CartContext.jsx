"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart and wishlist from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));

    const storedWishlist = localStorage.getItem("wishlistItems");
    if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));

    setLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, loaded]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems, loaded]);

  // Cart functions
  const addToCart = (product) => {
    setCartItems((prev) => {
      const id = product._id || product.id;
      const existing = prev.find((item) => (item._id || item.id) === id);
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => (item._id || item.id) !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        (item._id || item.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const id = product._id || product.id;
      const exists = prev.find((item) => (item._id || item.id) === id);
      if (exists) return prev; // already in wishlist, don't duplicate
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => (item._id || item.id) !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => (item._id || item.id) === productId);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount,
        wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
