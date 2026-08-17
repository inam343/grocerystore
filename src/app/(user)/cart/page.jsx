"use client";

import React from "react";
import Link from "next/link";
import Cartcard from "@/componant/cartcard";
import { useCart } from "@/context/CartContext";

const AddToCart = () => {
  const { cartItems, cartCount } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalOldPrice = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice || item.price) * (item.quantity || 1),
    0
  );

  const totalSavings = totalOldPrice - totalPrice;

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-6 px-4 sm:px-6 md:px-10">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[960px] mx-auto">

        {/* Cart Items */}
        <div className="bg-white flex-1 p-4 sm:p-6 rounded-md shadow-sm">
          <h2 className="font-[600] text-[16px] sm:text-[18px]">Your Cart</h2>
          <p className="font-[300] text-gray-500 text-[13px] mt-1">
            {cartCount === 0
              ? "Your cart is empty"
              : `There are ${cartCount} item${cartCount !== 1 ? "s" : ""} in your cart`}
          </p>
          <hr className="border-zinc-200 my-3" />

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-[14px]">
              No items added yet. Start shopping!
            </p>
          ) : (
            <div>
              {cartItems.map((product) => (
                <Cartcard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white w-full lg:w-[280px] p-4 sm:p-5 rounded-md shadow-sm h-fit">
            <h2 className="font-[600] text-[15px] sm:text-[16px] mb-3">Order Summary</h2>
            <hr className="border-zinc-200 mb-4" />

            <div className="flex flex-col gap-3 text-[13px] text-gray-600">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-[600] text-gray-800">{cartCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Products</span>
                <span className="font-[600] text-gray-800">{cartItems.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Original Price</span>
                <span className="font-[600] text-gray-400 line-through">
                  ${totalOldPrice.toFixed(2)}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between">
                  <span>You Save</span>
                  <span className="font-[600] text-green-600">
                    -${totalSavings.toFixed(2)}
                  </span>
                </div>
              )}

              <hr className="border-zinc-200" />

              <div className="flex justify-between text-[15px]">
                <span className="font-[600] text-gray-800">Total Price</span>
                <span className="font-[700] text-[#CB0000]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn-border-g w-full mt-5 text-[13px] font-[600] py-2 rounded-md flex items-center justify-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddToCart;
