"use client";

import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

const Wishlistcard = ({ product }) => {
  const { removeFromWishlist, addToCart } = useCart();
  const id = product._id || product.id;

  return (
    <div className="shadow-sm w-full bg-white rounded-md flex gap-3 p-3 relative border border-gray-100">

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
          <span className="text-[#CB0000] text-[14px] sm:text-[15px] font-[700]">${product.price}</span>
          {product.oldPrice && (
            <span className="text-[#A4A4A4] text-[12px] font-[600] line-through">${product.oldPrice}</span>
          )}
        </div>

        <button
          className="btn-border-g mt-3 text-[11px] sm:text-[12px] px-3 py-1 rounded-md"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>

      {/* Remove from wishlist */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        onClick={() => removeFromWishlist(id)}
      >
        <IoClose size={18} />
      </button>

    </div>
  );
};

export default Wishlistcard;
