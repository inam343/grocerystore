"use client";

import React from "react";
import Wishlistcard from "@/componant/Wishlistcard";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { wishlistItems, wishlistCount } = useCart();

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-6 px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-[960px] mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-md shadow-sm">
          <h2 className="font-[600] text-[16px] sm:text-[18px]">Your Wishlist</h2>
          <p className="font-[300] text-gray-500 text-[13px] mt-1">
            {wishlistCount === 0
              ? "Your wishlist is empty"
              : `You have ${wishlistCount} item${wishlistCount !== 1 ? "s" : ""} in your wishlist`}
          </p>
          <hr className="border-zinc-200 my-3" />

          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-[14px]">
              No items in wishlist. Click the heart icon on products to save them!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistItems.map((product) => (
                <Wishlistcard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
