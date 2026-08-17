"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaTruck, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, cartCount, clearCart, updateQuantity, removeFromCart } = useCart();

  const [user, setUser] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // Auto-fill from localStorage profile
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
        setForm((prev) => ({
          ...prev,
          fullName: userData.fullName || userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          zip: userData.zip || "",
        }));
      }
    } catch (_) {}
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const totalOldPrice = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice || item.price) * (item.quantity || 1),
    0
  );
  const totalSavings = totalOldPrice - totalPrice;
  const deliveryFee = totalPrice >= 50 ? 0 : 5;
  const grandTotal = totalPrice + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Save order to localStorage for Orders page
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      items: cartItems,
      shippingInfo: { ...form },
      paymentMethod: "Cash on Delivery",
      totalPrice,
      deliveryFee,
      grandTotal,
      status: "Pending",
    };

    try {
      const uid = user?._id || user?.id || user?.username || "guest";
      const existing = localStorage.getItem(`orders_${uid}`);
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(order);
      localStorage.setItem(`orders_${uid}`, JSON.stringify(orders));
    } catch (_) {}

    setTimeout(() => {
      clearCart();
      setLoading(false);
      setOrderPlaced(true);
    }, 1200);
  };

  // ── Order Placed Success Screen ──────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-[480px] w-full text-center">
          <FaCheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
          <p className="text-gray-500 text-sm mb-1">
            Thank you, <span className="font-semibold text-green-600">{form.fullName}</span>!
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Your order will be delivered to{" "}
            <span className="font-medium text-gray-700">{form.address}, {form.city}</span>.
          </p>
          <div className="bg-green-50 border border-green-100 rounded-lg px-5 py-3 text-sm text-gray-600 mb-6 flex items-center justify-center gap-2">
            <FaTruck className="text-green-500" size={16} />
            Payment: <span className="font-semibold text-green-700 ml-1">Cash on Delivery</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/orders"
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              View My Orders
            </Link>
            <Link
              href="/"
              className="border border-gray-300 hover:border-green-500 hover:text-green-600 text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty Cart Guard ─────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-[420px] w-full text-center">
          <p className="text-4xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-6">Add items before checking out.</p>
          <Link
            href="/productListing"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Checkout Layout ─────────────────────────────────────────────────────
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1060px] mx-auto">

        {/* Page Title */}
        <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── LEFT: Form ─────────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaUserCircle className="text-green-600" size={18} />
                <h2 className="font-[700] text-[15px] text-gray-800">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors ${
                      errors.fullName ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className={`w-full border rounded-lg pl-8 pr-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors ${
                        errors.phone ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-green-600" size={16} />
                <h2 className="font-[700] text-[15px] text-gray-800">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apt 4B"
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors ${
                      errors.address ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors ${
                      errors.city ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                {/* ZIP */}
                <div>
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                {/* Order Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-[600] text-gray-600 mb-1">
                    Order Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-green-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaTruck className="text-green-600" size={16} />
                <h2 className="font-[700] text-[15px] text-gray-800">Payment Method</h2>
              </div>

              {/* Cash on Delivery — only option */}
              <label className="flex items-center gap-3 border-2 border-green-500 bg-green-50 rounded-lg px-4 py-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  defaultChecked
                  readOnly
                  className="accent-green-600 w-4 h-4"
                />
                <div>
                  <p className="text-[13px] font-[700] text-gray-800">Cash on Delivery</p>
                  <p className="text-[11px] text-gray-500">Pay when your order arrives at your door</p>
                </div>
                <span className="ml-auto text-green-600 text-xl">💵</span>
              </label>
            </div>

          </div>

          {/* ── RIGHT: Order Summary ────────────────────────────────────────── */}
          <div className="w-full lg:w-[320px] flex flex-col gap-5">

            {/* Items List */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="font-[700] text-[15px] text-gray-800 mb-3">
                Order Items ({cartCount})
              </h2>
              <hr className="border-gray-100 mb-3" />

              <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const id = item._id || item.id;
                  return (
                    <div key={id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      {/* Image */}
                      <div className="w-[50px] h-[50px] flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-contain h-full w-full"
                        />
                      </div>

                      {/* Name + qty controls */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-[600] text-gray-700 line-clamp-1">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {/* Decrement */}
                          <button
                            onClick={() =>
                              item.quantity <= 1
                                ? removeFromCart(id)
                                : updateQuantity(id, (item.quantity || 1) - 1)
                            }
                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 text-[12px] font-bold transition-colors"
                          >
                            −
                          </button>
                          <span className="text-[12px] font-[600] text-gray-700 w-4 text-center">
                            {item.quantity || 1}
                          </span>
                          {/* Increment */}
                          <button
                            onClick={() => updateQuantity(id, (item.quantity || 1) + 1)}
                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 text-[12px] font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-[13px] font-[700] text-[#CB0000]">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        {item.oldPrice && (
                          <p className="text-[10px] text-gray-400 line-through">
                            ${(item.oldPrice * (item.quantity || 1)).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="font-[700] text-[15px] text-gray-800 mb-3">Order Summary</h2>
              <hr className="border-gray-100 mb-3" />

              <div className="flex flex-col gap-2 text-[13px] text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-[600] text-gray-800">${totalPrice.toFixed(2)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between">
                    <span>You Save</span>
                    <span className="font-[600] text-green-600">−${totalSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="font-[600] text-green-600">Free</span>
                  ) : (
                    <span className="font-[600] text-gray-800">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[11px] text-gray-400">
                    Free delivery on orders above $50
                  </p>
                )}

                <hr className="border-gray-100 my-1" />

                <div className="flex justify-between text-[15px]">
                  <span className="font-[700] text-gray-800">Total</span>
                  <span className="font-[700] text-[#CB0000]">${grandTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[12px] mt-1">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-[600] text-green-600">Cash on Delivery</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-[14px] font-[700] py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <FaTruck size={14} />
                    Place Order
                  </>
                )}
              </button>

              <Link
                href="/cart"
                className="block text-center text-[12px] text-gray-500 hover:text-green-600 mt-3 transition-colors"
              >
                ← Back to Cart
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
