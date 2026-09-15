"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaTruck,
  FaCheckCircle, FaShoppingBag, FaTag, FaLock,
} from "react-icons/fa";
import { MdEmail, MdNotes } from "react-icons/md";
import { useCart } from "@/context/CartContext";
import { API_BASE } from "@/lib/api";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, cartCount, clearCart, updateQuantity, removeFromCart } = useCart();

  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) {
        localStorage.setItem("redirectAfterLogin", "/checkout");
        router.replace("/login");
        return;
      }
      const userData = JSON.parse(stored);
      setUser(userData);
      setForm((prev) => ({
        ...prev,
        fullName: userData.fullName || userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      }));
    } catch {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      router.replace("/login");
      return;
    }
    setAuthChecked(true);
  }, [router]);

  const totalPrice    = cartItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const totalOldPrice = cartItems.reduce((s, i) => s + (i.oldPrice || i.price) * (i.quantity || 1), 0);
  const totalSavings  = totalOldPrice - totalPrice;
  const deliveryFee   = totalPrice >= 50 ? 0 : 5;
  const grandTotal    = totalPrice + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim())    e.phone    = "Phone number is required";
    if (!form.address.trim())  e.address  = "Delivery address is required";
    return e;
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return;
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setLoading(true);
    setApiError("");
    const uid     = user?._id || user?.id || user?.username || "guest";
    const orderId = `ORD-${Date.now()}`;
    const payload = {
      orderId, userId: uid, shippingInfo: { ...form },
      items: cartItems.map((item) => ({
        _id: item._id || item.id || "", name: item.name, price: item.price,
        oldPrice: item.oldPrice, quantity: item.quantity || 1,
        image: item.image, brand: item.brand, category: item.category,
      })),
      paymentMethod: "Cash on Delivery", totalPrice, deliveryFee, grandTotal,
    };
    try {
      const res  = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && data.order) { clearCart(); setPlacedOrder(data.order); setOrderPlaced(true); return; }
        throw new Error(data.message || "Failed to place order");
      }
      clearCart(); setPlacedOrder(data.order); setOrderPlaced(true);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Loading ── */
  if (!authChecked) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  /* ── Success ── */
  if (orderPlaced) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10 max-w-[500px] w-full text-center animate-fadeInUp">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <FaCheckCircle className="text-green-500" size={40} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Order Placed!</h1>
        <p className="text-slate-500 text-sm mb-1">
          Thank you, <span className="font-semibold text-green-600">{form.fullName}</span>!
        </p>
        <p className="text-slate-400 text-sm mb-1">
          Order ID: <span className="font-mono font-semibold text-slate-700">{placedOrder?.orderId || "—"}</span>
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Delivering to <span className="font-medium text-slate-600">{form.address}</span>
        </p>
        <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-3 text-sm text-green-700 mb-6 flex items-center justify-center gap-2 font-medium">
          <FaTruck size={14} /> Payment: Cash on Delivery
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/orders" className="btn-primary py-3 text-sm">View My Orders</Link>
          <Link href="/" className="btn-outline py-3 text-sm">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );

  /* ── Empty cart ── */
  if (!cartItems.length) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-[420px] w-full text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaShoppingBag size={28} className="text-slate-300" />
        </div>
        <h2 className="text-lg font-bold text-slate-700 mb-2">Your cart is empty</h2>
        <p className="text-slate-400 text-sm mb-6">Add items before checking out.</p>
        <Link href="/productListing" className="btn-primary px-8 py-3">Shop Now</Link>
      </div>
    </div>
  );

  /* ── Main checkout ── */
  const inputCls = (field) =>
    `input-field pl-10 ${errors[field] ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]" : ""}`;

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Title */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
            <FaShoppingBag size={16} className="text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Checkout</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-7 text-xs font-semibold">
          {["Cart", "Shipping", "Payment", "Confirm"].map((step, i) => (
            <React.Fragment key={step}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                i === 1 ? "bg-green-600 text-white" : i < 1 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
              }`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === 1 ? "bg-white/30" : i < 1 ? "bg-green-200 text-green-800" : "bg-slate-200 text-slate-400"
                }`}>{i + 1}</span>
                {step}
              </div>
              {i < 3 && <div className="flex-1 h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ── Left ── */}
          <div className="flex flex-col gap-5">

            {/* Shipping info */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-slate-700 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt size={13} className="text-green-600" />
                </span>
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" className={inputCls("fullName")} />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field pl-10" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" className={inputCls("phone")} />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-400" size={13} />
                    <textarea
                      name="address" value={form.address} onChange={handleChange} rows={2}
                      placeholder="Street, City, State, ZIP"
                      className={`input-field pl-10 resize-none ${errors.address ? "border-red-400" : ""}`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Order Notes (optional)</label>
                  <div className="relative">
                    <MdNotes className="absolute left-3 top-3 text-slate-400" size={15} />
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                      placeholder="E.g. leave at the door, ring the bell…"
                      className="input-field pl-10 resize-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaTruck size={13} className="text-green-600" />
                </span>
                Payment Method
              </h2>
              <label className="flex items-center gap-3 border-2 border-green-200 bg-green-50 rounded-xl px-4 py-3.5 cursor-pointer">
                <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700">Cash on Delivery</p>
                  <p className="text-xs text-green-500 mt-0.5">Pay when your order arrives at your door</p>
                </div>
                <FaTruck className="text-green-400 ml-auto" size={18} />
              </label>
            </div>
          </div>

          {/* ── Right: Order summary ── */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 lg:sticky lg:top-[140px]">
              <h2 className="text-[15px] font-bold text-slate-700 mb-4 flex items-center gap-2">
                <FaShoppingBag size={14} className="text-green-600" />
                Order Summary
                <span className="ml-auto text-xs text-slate-400 font-normal">{cartCount} items</span>
              </h2>

              {/* Items list */}
              <div className="flex flex-col gap-2.5 max-h-[260px] overflow-y-auto pr-1 mb-4">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1"
                        onError={(e) => { e.target.src = "/productitems/image1.png"; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-slate-700 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-[13px] font-bold text-slate-700 flex-shrink-0">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">${totalPrice.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1"><FaTag size={10} /> Savings</span>
                    <span className="font-semibold">-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="flex items-center gap-1"><FaTruck size={10} /> Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : ""}`}>
                    {deliveryFee === 0 ? "Free 🎉" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 text-base">
                  <span className="font-bold text-slate-800">Grand Total</span>
                  <span className="font-bold text-green-700 text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-lg mt-3">
                  ⚠️ {apiError}
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn-primary w-full mt-4 py-3.5 text-sm flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <><FaLock size={12} /> Place Order</>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                <FaLock size={9} /> Secure & encrypted checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
