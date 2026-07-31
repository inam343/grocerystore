"use client";

import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Cartcard = ({ product }) => {
  const { removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const id = product._id || product.id;
  const wished = isInWishlist(id);

  return (
    <div className="shadow-sm w-full bg-white rounded-md flex my-4 gap-3 p-3 relative border border-gray-100">

      {/* Image */}
      <div className="flex-shrink-0">
        <Link href="/" className="group">
          <div className="overflow-hidden h-[80px] w-[65px] sm:h-[100px] sm:w-[80px] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="transition group-hover:scale-110 object-contain h-full"
            />
          </div>
        </Link>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 mt-1 text-gray-700 pr-6">
        <span className="text-[12px] sm:text-[13px] text-gray-500 block">{product.brand}</span>

        <p className="hover:text-green-700 cursor-pointer text-[13px] sm:text-[15px] font-[600] leading-tight line-clamp-2">
          {product.name}
        </p>

        <Rating name="read-only" value={product.rating || 0} readOnly size="small" />

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <select
            className="border border-gray-300 rounded-md text-[12px] px-2 py-1 text-gray-700 bg-gray-50"
            value={product.quantity || 1}
            onChange={(e) => updateQuantity(id, Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>Qty: {n}</option>
            ))}
          </select>

          <span className="text-[#CB0000] text-[14px] sm:text-[15px] font-[700]">${product.price}</span>

          {product.oldPrice && (
            <span className="text-[#A4A4A4] text-[12px] font-[600] line-through">${product.oldPrice}</span>
          )}
        </div>
      </div>

      {/* Wishlist icon — bottom right */}
      <button
        className="absolute bottom-3 right-3 text-gray-400 hover:text-red-500"
        onClick={() => wished ? removeFromWishlist(id) : addToWishlist(product)}
        title={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wished ? <FaHeart size={16} className="text-red-500" /> : <FaRegHeart size={16} />}
      </button>

      {/* Remove from cart — top right */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        onClick={() => removeFromCart(id)}
      >
        <IoClose size={18} />
      </button>

    </div>
  );
};

export default Cartcard;
