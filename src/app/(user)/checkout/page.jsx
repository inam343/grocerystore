"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaTruck, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useCart } from "@/context/CartContext";
import { API_BASE } from "@/lib/api";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, cartCount, clearCart, updateQuantity, removeFromCart } = useCart();

  const [user, setUser] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
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
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    return newErrors;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");

    const uid = user?._id || user?.id || user?.username || "guest";
    const orderId = `ORD-${Date.now()}`;

    const orderPayload = {
      orderId,
      userId: uid,
      shippingInfo: { ...form },
      items: cartItems.map((item) => ({
        _id:      item._id || item.id || "",
        name:     item.name,
        price:    item.price,
        oldPrice: item.oldPrice,
        quantity: item.quantity || 1,
        image:    item.image,
        brand:    item.brand,
        category: item.category,
      })),
      paymentMethod: "Cash on Delivery",
      totalPrice,
      deliveryFee,
      grandTotal,
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        // If it's a duplicate (already saved), treat as success
        if (res.status === 409 && data.order) {
          clearCart();
          setPlacedOrder(data.order);
          setOrderPlaced(true);
          return;
        }
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();
      setPlacedOrder(data.order);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Place order error:", err);
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-500 text-sm mb-1">
            Order ID:{" "}
            <span className="font-mono font-semibold text-gray-700">
              {placedOrder?.orderId || "—"}
            </span>
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Your order will be delivered to{" "}
            <span className="font-medium text-gray-700">{form.address}</span>.
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

  // ── Checkout Form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ── Left: Shipping Form ── */}
          <div className="flex flex-col gap-5">

            {/* Shipping info card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-gray-700 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-500" size={15} />
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-green-400 transition-colors ${errors.fullName ? "border-red-400" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Email</label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-green-400 transition-colors ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" size={13} />
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Street, City, State, ZIP"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-green-400 transition-colors resize-none ${errors.address ? "border-red-400" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Order Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={2}
                    placeholder="E.g. leave at the door, ring the bell…"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-400 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment method card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-gray-700 mb-3 flex items-center gap-2">
                <FaTruck className="text-green-500" size={15} />
                Payment Method
              </h2>
              <div className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-xl px-4 py-3">
                <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700">Cash on Delivery</p>
                  <p className="text-[11px] text-green-600">Pay when your order arrives</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-4">
              <h2 className="text-[15px] font-bold text-gray-700 mb-4">Order Summary</h2>

              {/* Items list */}
              <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1 mb-4">
                {cartItems.map((item) => {
                  const id = item._id || item.id;
                  return (
                    <div key={id} className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-gray-700 truncate">{item.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <button
                            onClick={() => updateQuantity(id, (item.quantity || 1) - 1)}
                            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center"
                          >−</button>
                          <span className="text-[12px] font-semibold text-gray-700">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(id, (item.quantity || 1) + 1)}
                            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center"
                          >+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <p className="text-[13px] font-bold text-gray-800">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(id)}
                          className="text-[10px] text-red-400 hover:text-red-600 mt-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-gray-700">${totalPrice.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span className="font-semibold">−${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : "text-gray-700"}`}>
                    {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[11px] text-gray-400">Free delivery on orders over $50</p>
                )}
                <div className="flex justify-between text-base font-bold text-gray-800 border-t border-gray-100 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-[#CB0000]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* API error */}
              {apiError && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-[12px] text-red-600">
                  {apiError}
                </div>
              )}

              {/* Place Order button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <FaCheckCircle size={14} />
                    Place Order · ${grandTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
