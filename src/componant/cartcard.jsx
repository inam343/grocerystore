"use client";

import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Cartcard = ({ product }) => {
  const { removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const id = product._id || product.id;
  const wished = isInWishlist(id);
  const qty = product.quantity || 1;
  const lineTotal = (product.price * qty).toFixed(2);

  return (
    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-slate-100 hover:border-green-100 hover:shadow-sm transition-all duration-200 relative group">

      {/* Remove button */}
      <button
        onClick={() => removeFromCart(id)}
        className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Remove item"
      >
        <IoClose size={15} />
      </button>

      {/* Image */}
      <Link href="/" className="flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] flex items-center justify-center hover:bg-green-50 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-1 transition-transform duration-300 hover:scale-110"
          onError={(e) => { e.target.src = "/productitems/image3.png"; }}
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 pr-6">
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        <p className="text-[13px] sm:text-[14px] font-semibold text-slate-700 leading-snug line-clamp-2 hover:text-green-700 cursor-pointer transition-colors mt-0.5">
          {product.name}
        </p>
        <Rating value={product.rating || 0} readOnly size="small" sx={{ fontSize: "12px", mt: "2px" }} />

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[13px] font-bold text-green-700">${product.price}</span>
          {product.oldPrice && (
            <span className="text-[11px] text-slate-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-2.5 flex-wrap">
          {/* Qty stepper */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => qty > 1 && updateQuantity(id, qty - 1)}
              disabled={qty <= 1}
              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-green-50 hover:text-green-700 transition-colors disabled:opacity-30"
            >
              <FaMinus size={9} />
            </button>
            <span className="w-7 text-center text-[13px] font-semibold text-slate-700">{qty}</span>
            <button
              onClick={() => updateQuantity(id, qty + 1)}
              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <FaPlus size={9} />
            </button>
          </div>

          {/* Line total */}
          <span className="text-[13px] font-bold text-slate-800">${lineTotal}</span>

          {/* Wishlist */}
          <button
            onClick={() => wished ? removeFromWishlist(id) : addToWishlist(product)}
            className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${
              wished
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50"
            }`}
          >
            {wished ? <FaHeart size={10} /> : <FaRegHeart size={10} />}
            {wished ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartcard;
