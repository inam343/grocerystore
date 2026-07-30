"use client";

import React from "react";
import Cartcard from "@/componant/cartcard";
import { useCart } from "@/context/CartContext";

const AddToCart = () => {
  const { cartItems, cartCount } = useCart();

  return (
    <div className="flex justify-center items-center bg-[#FAFAFA] min-h-screen">
      <div className="bg-white w-[500px] p-4 m-6 rounded-md">
        <div className="gap-2">
          <h2 className="font-[600] dark:text-black text-[15px]">Your Cart</h2>
          <p className="font-[300]">
            {cartCount === 0
              ? "Your cart is empty"
              : `There are ${cartCount} item${cartCount !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>
        <hr className="border-zinc-800 my-3" />

        {cartItems.length === 0 ? (
          <p className="text-center dark:text-black text-gray-400 py-10">
            No items added yet. Start shopping!
          </p>
        ) : (
          <div>
            {cartItems.map((product) => (
              <Cartcard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
