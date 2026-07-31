"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Get the current logged-in user's ID for scoping storage
const getUserId = () => {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData._id || userData.id || userData.username || "guest";
    }
  } catch (_) {}
  return "guest";
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState("guest");

  // Load cart and wishlist for the given user
  const loadUserData = () => {
    const uid = getUserId();
    setUserId(uid);

    const storedCart = localStorage.getItem(`cartItems_${uid}`);
    setCartItems(storedCart ? JSON.parse(storedCart) : []);

    const storedWishlist = localStorage.getItem(`wishlistItems_${uid}`);
    setWishlistItems(storedWishlist ? JSON.parse(storedWishlist) : []);

    setLoaded(true);
  };

  // Initial load
  useEffect(() => {
    loadUserData();
  }, []);

  // Save cart whenever it changes (per user)
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
  }, [cartItems, loaded, userId]);

  // Save wishlist whenever it changes (per user)
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(`wishlistItems_${userId}`, JSON.stringify(wishlistItems));
  }, [wishlistItems, loaded, userId]);

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
        reloadUserData: loadUserData,
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
