"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Helper to get current user ID
  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData._id || userData.id || userData.username || "guest";
    }
    return "guest";
  };

  // Load cart and wishlist for current user
  const loadUserData = () => {
    const userId = getUserId();
    setCurrentUserId(userId);

    const cartKey = `cartItems_${userId}`;
    const wishlistKey = `wishlistItems_${userId}`;

    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]);
    }

    const storedWishlist = localStorage.getItem(wishlistKey);
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    } else {
      setWishlistItems([]);
    }

    setLoaded(true);
  };

  // Load data on mount and listen for storage changes (login/logout)
  useEffect(() => {
    loadUserData();

    // Listen for storage events (e.g., login in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        loadUserData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loaded || !currentUserId) return;
    const cartKey = `cartItems_${currentUserId}`;
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, loaded, currentUserId]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!loaded || !currentUserId) return;
    const wishlistKey = `wishlistItems_${currentUserId}`;
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
  }, [wishlistItems, loaded, currentUserId]);

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
