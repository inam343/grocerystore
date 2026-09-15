"use client";

import React from "react";
import { Rating } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Cartcard = ({ product }) => {
  const { removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const id      = product._id || product.id;
  const wished  = isInWishlist(id);
  const qty     = product.quantity || 1;
  const lineTotal = (product.price * qty).toFixed(2);



  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row gap-0">

      {/* ── Image block ── */}
      <div className="relative flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center w-full sm:w-[140px] h-[140px] sm:h-auto">
    
        {/* Remove button */}
        <button
          onClick={() => removeFromCart(id)}
          className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Remove"
        >
          <IoClose size={14} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.target.src = "/productitems/image3.png"; }}
        />
      </div>

      {/* ── Details block ── */}
      <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
        <div>
          {product.brand && (
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {product.brand}
            </p>
          )}
          <p className="text-[14px] sm:text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-green-700 cursor-pointer transition-colors">
            {product.name}
          </p>
          <div className="mt-1">
            <Rating value={product.rating || 0} readOnly size="small" sx={{ fontSize: "13px" }} />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[16px] font-extrabold text-green-700">${product.price}</span>
            {product.oldPrice && (
              <span className="text-[12px] text-gray-400 line-through">${product.oldPrice}</span>
            )}

          </div>
        </div>

        {/* ── Controls row ── */}
        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          {/* Qty stepper */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => qty > 1 && updateQuantity(id, qty - 1)}
              disabled={qty <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FaMinus size={10} />
            </button>
            <span className="w-8 text-center text-[13px] font-bold text-gray-800">{qty}</span>
            <button
              onClick={() => updateQuantity(id, qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <FaPlus size={10} />
            </button>
          </div>

          {/* Line total */}
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-extrabold text-gray-900">${lineTotal}</span>

            {/* Wishlist toggle */}
            <button
              onClick={() => wished ? removeFromWishlist(id) : addToWishlist(product)}
              className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                wished
                  ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                  : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50"
              }`}
            >
              {wished ? <FaHeart size={10} /> : <FaRegHeart size={10} />}
              {wished ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartcard;
