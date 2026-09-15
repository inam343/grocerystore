"use client";

import React from "react";
import Link from "next/link";
import Wishlistcard from "@/componant/Wishlistcard";
import { useCart } from "@/context/CartContext";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

const Wishlist = () => {
  const { wishlistItems, wishlistCount, addToCart } = useCart();

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-[860px] mx-auto">

        {/* Page header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <FaHeart size={16} className="text-red-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">My Wishlist</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                {wishlistCount === 0
                  ? "No saved items yet"
                  : `${wishlistCount} saved item${wishlistCount !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          {wishlistItems.length > 0 && (
            <button
              onClick={() => wishlistItems.forEach((p) => addToCart(p))}
              className="btn-primary text-sm py-2.5 flex items-center gap-2"
            >
              <FaShoppingBag size={13} />
              Add All to Cart
            </button>
          )}
        </div>

        {/* Empty state */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center animate-fadeInUp">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaHeart size={32} className="text-red-200" />
            </div>
            <h2 className="text-lg font-bold text-slate-700 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
              Click the ♡ icon on any product to save it here for later.
            </p>
            <Link href="/productListing" className="btn-primary px-8 py-3">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp">
            {wishlistItems.map((product) => (
              <Wishlistcard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
