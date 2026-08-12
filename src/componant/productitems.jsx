"use client";

import React from "react";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Productitem = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const id = product._id || product.id;
  const wished = isInWishlist(id);

  return (
    <div className="productitem shadow-md w-full bg-white rounded-md flex flex-col gap-1 relative p-2">

      {/* Wishlist icon */}
      <button
        className="absolute top-2 right-2 z-10"
        onClick={() => wished ? removeFromWishlist(id) : addToWishlist(product)}
      >
        {wished
          ? <FaHeart size={16} className="text-red-500" />
          : <FaRegHeart size={16} className="text-gray-400 hover:text-red-400" />
        }
      </button>

      <span className="text-[12px] sm:text-[13px] text-gray-500 truncate">
        {product.brand}
      </span>

      <Link href="/" className="group">
        <div className="img overflow-hidden outline-none flex justify-center py-2 h-[100px] sm:h-[120px]">
          <img
            src={product.image || "/productitems/image3.png"}
            alt={product.name}
            className="transition group-hover:scale-110 object-contain h-full"
            onError={(e) => { e.target.src = "/productitems/image3.png"; }}
          />
        </div>
      </Link>

      <div className="hover:text-green-700 cursor-pointer text-[12px] sm:text-[14px] font-[600] text-center text-gray-700 leading-snug min-h-[36px] flex items-center justify-center px-1">
        <h4 className="line-clamp-2">{product.name}</h4>
      </div>

      <Rating name="read-only" value={product.rating} readOnly size="small" />

      <div className="flex items-center justify-between mt-1">
        <span className="text-[#CB0000] text-[12px] sm:text-[13px] font-[600]">
          ${product.price}
        </span>
        <span className="text-[#A4A4A4] text-[11px] sm:text-[12px] font-[600] line-through">
          ${product.oldPrice}
        </span>
      </div>

      <button
        className="btn-border-g text-[11px] sm:text-[12px] py-1 rounded-md mt-1"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default Productitem;
