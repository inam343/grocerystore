"use client";

import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

const Cartcard = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const id = product._id || product.id;

  return (
    <div className="productitem shadow-md w-full bg-white rounded-md flex my-5 gap-4 p-3 relative">

      <div>
        <Link href="/" className="group">
          <div className="img overflow-hidden outline-none h-[100px] w-[80px] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="transition group-hover:scale-110 object-contain h-full"
            />
          </div>
        </Link>
      </div>

      <div className="flex-1 mt-1 text-gray-700">
        <span className="text-[14px] text-gray-500 block">
          {product.brand}
        </span>

        <p className="hover:text-green-700 cursor-pointer text-[15px] font-[600] leading-tight">
          {product.name}
        </p>

        <Rating
          name="read-only"
          value={product.rating || 0}
          readOnly
          size="small"
        />

        <div className="flex items-center gap-3 mt-2">
          <select
            className="border border-gray-300 rounded-md text-[13px] px-2 py-1 text-gray-700 bg-gray-50"
            value={product.quantity || 1}
            onChange={(e) => updateQuantity(id, Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>Qty: {n}</option>
            ))}
          </select>

          <span className="text-[#CB0000] text-[15px] font-[700]">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="text-[#A4A4A4] text-[13px] font-[600] line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>

      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        onClick={() => removeFromCart(id)}
      >
        <IoClose size={20} />
      </button>

    </div>
  );
};

export default Cartcard;
