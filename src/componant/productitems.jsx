"use client";

import React from "react";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Productitem = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="productitem shadow-md w-full bg-white rounded-md flex flex-col gap-1">

      <span className="text-[14px] text-gray-700">
        {product.brand}
      </span>

      <Link href="/" className="group">
        <div className="img overflow-hidden outline-none flex py-3">
          <img
            src={product.image}
            alt={product.name}
            className="transition group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="hover:text-green-700 cursor-pointer text-[15px] font-[600] text-center mt-3 text-gray-700">
        <h4>{product.name}</h4>
      </div>

      <Rating
        name="read-only"
        value={product.rating}
        readOnly
        size="small"
      />

      <div className="flex items-center justify-between">
        <span className="text-[#CB0000] text-[13px] font-[600]">
          ${product.price}
        </span>

        <span className="text-[#A4A4A4] text-[13px] font-[600] line-through">
          ${product.oldPrice}
        </span>
      </div>

      <button
        className="btn-border-g"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default Productitem;
