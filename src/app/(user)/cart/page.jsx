"use client";

import React from "react";
import Link from "next/link";
import Cartcard from "@/componant/cartcard";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart, FaArrowRight, FaTag, FaTruck } from "react-icons/fa";

const AddToCart = () => {
  const { cartItems, cartCount } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1), 0
  );
  const totalOldPrice = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice || item.price) * (item.quantity || 1), 0
  );
  const totalSavings = totalOldPrice - totalPrice;
  const deliveryFee = totalPrice >= 50 ? 0 : 5;
  const grandTotal = totalPrice + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center animate-fadeInUp">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingCart size={36} className="text-green-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">
            Looks like you haven't added anything yet. Explore our fresh products!
          </p>
          <Link href="/productListing" className="btn-primary px-8 py-3">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1000px] mx-auto">

        {/* Page title */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
            <FaShoppingCart size={16} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Shopping Cart</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Items list ── */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="w-[88px]">Product</span>
              <span>Details</span>
              <span>Subtotal</span>
            </div>

            <div className="flex flex-col gap-0 divide-y divide-slate-50 p-3 sm:p-4">
              {cartItems.map((product) => (
                <div key={product._id || product.id} className="py-2 first:pt-0 last:pb-0">
                  <Cartcard product={product} />
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="px-5 py-4 border-t border-slate-50 bg-slate-50/50">
              <Link
                href="/productListing"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Order summary ── */}
          <div className="w-full lg:w-[300px] flex-shrink-0 sticky top-[140px]">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-[15px] font-bold text-slate-800 mb-4">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-slate-700">${totalPrice.toFixed(2)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1.5">
                      <FaTag size={11} /> Savings
                    </span>
                    <span className="font-semibold">-${totalSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <FaTruck size={11} /> Delivery
                  </span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : "text-slate-700"}`}>
                    {deliveryFee === 0 ? "Free 🎉" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[11px] text-slate-400 bg-amber-50 border border-amber-100 px-3 py-2 rounded-lg">
                    Add <span className="font-semibold text-amber-600">${(50 - totalPrice).toFixed(2)}</span> more for free delivery
                  </p>
                )}

                <div className="border-t border-slate-100 pt-3 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-base">Total</span>
                    <span className="font-bold text-green-700 text-xl">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full mt-5 py-3 text-sm flex items-center gap-2"
              >
                Proceed to Checkout
                <FaArrowRight size={12} />
              </Link>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-50">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">🔒 Secure</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">↩️ Easy returns</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">🚚 Fast delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddToCart;
