"use client";

import React from "react";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Productitem = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const id = product._id || product.id;
  const wished = isInWishlist(id);

  const discount =
    product.oldPrice && product.price < product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Discount badge */}
      {discount && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </span>
      )}

      {/* Wishlist button */}
      <button
        className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${
          wished
            ? "bg-red-50 text-red-500"
            : "bg-white/80 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-50"
        }`}
        onClick={() => (wished ? removeFromWishlist(id) : addToWishlist(product))}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wished ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
      </button>

      {/* Image */}
      <Link href="/" className="block overflow-hidden bg-slate-50 p-4">
        <div className="h-[120px] flex items-center justify-center">
          <img
            src={product.image || "/productitems/image3.png"}
            alt={product.name}
            className="object-contain h-full w-full transition-transform duration-400 group-hover:scale-110"
            onError={(e) => { e.target.src = "/productitems/image3.png"; }}
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide truncate">
          {product.brand || "Fresh Picks"}
        </p>

        <h4 className="text-[13px] font-semibold text-slate-700 leading-snug line-clamp-2 min-h-[36px] hover:text-green-700 cursor-pointer transition-colors">
          {product.name}
        </h4>

        <Rating
          name="read-only"
          value={product.rating || 0}
          readOnly
          size="small"
          sx={{ fontSize: "14px" }}
        />

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[14px] font-bold text-green-700">${product.price}</span>
          {product.oldPrice && (
            <span className="text-[11px] text-slate-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        <button
          className="btn-outline w-full text-[12px] py-2 mt-1.5 flex items-center justify-center gap-1.5"
          onClick={() => addToCart(product)}
        >
          <FaShoppingCart size={11} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productitem;
