"use client";

import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart, FaTag } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Wishlistcard = ({ product }) => {
  const { removeFromWishlist, addToCart } = useCart();
  const id = product._id || product.id;

  const discount =
    product.oldPrice && product.price < product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <div className="group flex gap-3 sm:gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-green-200 hover:shadow-md transition-all duration-200 relative">

      {/* Remove */}
      <button
        onClick={() => removeFromWishlist(id)}
        className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all"
        aria-label="Remove from wishlist"
      >
        <IoClose size={15} />
      </button>

      {/* Image */}
      <Link href="/" className="flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden hover:bg-green-50 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { e.target.src = "/productitems/image3.png"; }}
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 pr-5 flex flex-col gap-1">
        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{product.brand}</p>

        <p className="text-[13px] sm:text-[14px] font-semibold text-slate-700 line-clamp-2 hover:text-green-700 cursor-pointer transition-colors leading-snug">
          {product.name}
        </p>

        <Rating value={product.rating || 0} readOnly size="small" sx={{ fontSize: "13px" }} />

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[14px] font-bold text-green-700">${product.price}</span>
          {product.oldPrice && (
            <span className="text-[11px] text-slate-400 line-through">${product.oldPrice}</span>
          )}
          {discount && (
            <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <FaTag size={8} />-{discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="btn-primary mt-2 w-full sm:w-auto sm:self-start text-[12px] py-2 px-4 flex items-center gap-1.5"
        >
          <FaShoppingCart size={11} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Wishlistcard;
