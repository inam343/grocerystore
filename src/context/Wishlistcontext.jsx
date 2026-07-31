"use client"
import {createContext, useContext, useState, useEffect} from "react";

const createContext=createContext();
export function Wishlistprovider({children}) {
    const [wishlistitems, setwishlistitems]=useState([])
    const [loaded, setLoaded]=useState(false);


    //load wishlist from local storage first
    useEffect(()=>{
        const stored=localStorage.getitem("wishlistitems");
        if(stored){
            setwishlistitems(JSON.parse(stored));
        }
        setLoaded(true);
    },[]);

    useEffect(()=>{
    if(!loaded) return;
     localStorage.setitems("wishlistitems", JSON.stringify(wishlistitems))
      },[wishlistitems , loaded]);
   
      
       const addToCart = (product) => {
          setwishlistitems((prev) => {
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
          setwishlistitems((prev) =>
            prev.filter((item) => (item._id || item.id) !== productId)
          );
        };
      
        const updateQuantity = (productId, quantity) => {
          if (quantity < 1) return;
          setwishlistitems((prev) =>
            prev.map((item) =>
              (item._id || item.id) === productId ? { ...item, quantity } : item
            )
          );
        };
      
        const clearCart = () => {
          setwishlistitems([]);
        };
      
        const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
      
        return (
          <Wishlistprovider.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
          >
            {children}
          </Wishlistprovider.Provider>
        );
      }
      
      export function useCart() {
        const context = useContext(wishlistcontext);
        if (!context) {
          throw new Error("useCart must be used inside CartProvider");
        }
        return context;
}
