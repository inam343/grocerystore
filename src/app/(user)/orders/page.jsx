"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaAngleDown,
  FaAngleUp,
  FaShoppingBag,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

// Status config — color + icon + label
const STATUS_CONFIG = {
  Pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    bar: "bg-yellow-400",
    icon: <MdPendingActions size={14} />,
    step: 1,
  },
  Processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-700",
    bar: "bg-blue-500",
    icon: <FaBoxOpen size={13} />,
    step: 2,
  },
  Shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-700",
    bar: "bg-purple-500",
    icon: <FaTruck size={13} />,
    step: 3,
  },
  Delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    bar: "bg-green-500",
    icon: <FaCheckCircle size={13} />,
    step: 4,
  },
  Cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-600",
    bar: "bg-red-400",
    icon: <FaTimesCircle size={13} />,
    step: 0,
  },
};

const STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.color}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function TrackingBar({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-2 mt-3">
        <FaTimesCircle className="text-red-400" size={14} />
        <span className="text-[12px] text-red-500 font-medium">This order was cancelled.</span>
      </div>
    );
  }

  const currentStep = STATUS_CONFIG[status]?.step || 1;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between relative">
        {/* connector line */}
        <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-gray-200 z-0" />
        <div
          className="absolute top-[14px] left-0 h-[2px] bg-green-500 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, i) => {
          const done = i + 1 <= currentStep;
          const active = i + 1 === currentStep;
          return (
            <div key={step} className="flex flex-col items-center z-10 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${done
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                  }
                  ${active ? "ring-2 ring-green-200 scale-110" : ""}
                `}
              >
                {done ? <FaCheckCircle size={13} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium text-center leading-tight
                ${done ? "text-green-600" : "text-gray-400"}`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Order Header */}
      <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-bold text-gray-800">{order.id}</span>
            <StatusBadge status={order.status} />
          </div>
          <span className="text-[12px] text-gray-400">Placed on {order.date}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[12px] text-gray-500">Total</p>
            <p className="text-[15px] font-bold text-[#CB0000]">${order.grandTotal?.toFixed(2)}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[12px] text-green-600 font-semibold hover:text-green-700 transition-colors"
          >
            {expanded ? "Hide" : "Details"}
            {expanded ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
          </button>
        </div>
      </div>

      {/* Tracking Bar */}
      <div className="px-4 sm:px-6 pb-4">
        <TrackingBar status={order.status} />
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 sm:px-6 py-4 flex flex-col gap-5 bg-gray-50">

          {/* Items */}
          <div>
            <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-3">Items Ordered</h4>
            <div className="flex flex-col gap-2">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-700 truncate">{item.name}</p>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="text-[13px] font-bold text-gray-700 flex-shrink-0">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping + Summary row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Shipping Info */}
            <div>
              <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-2">Shipping To</h4>
              <div className="bg-white rounded-lg border border-gray-100 px-3 py-3 text-[12px] text-gray-600 flex flex-col gap-1">
                <p className="font-semibold text-gray-800">{order.shippingInfo?.fullName}</p>
                {order.shippingInfo?.phone && <p>📞 {order.shippingInfo.phone}</p>}
                {order.shippingInfo?.email && <p>✉️ {order.shippingInfo.email}</p>}
                <p>📍 {order.shippingInfo?.address}</p>
                {order.shippingInfo?.notes && (
                  <p className="text-gray-400 italic">Note: {order.shippingInfo.notes}</p>
                )}
              </div>
            </div>

            {/* Price Summary */}
            <div>
              <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-2">Price Summary</h4>
              <div className="bg-white rounded-lg border border-gray-100 px-3 py-3 text-[12px] text-gray-600 flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">${order.totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">
                    {order.deliveryFee === 0 ? "Free" : `$${order.deliveryFee?.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-[13px]">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-[#CB0000]">${order.grandTotal?.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        const uid = userData._id || userData.id || userData.username || "guest";
        const stored = localStorage.getItem(`orders_${uid}`);
        if (stored) setOrders(JSON.parse(stored));
      }
    } catch (_) {}
    setLoading(false);
  }, []);

  const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-[860px] mx-auto">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-800 flex items-center gap-2">
            <FaShoppingBag className="text-green-600" size={22} />
            My Orders
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">
            {orders.length === 0 ? "You haven't placed any orders yet." : `You have ${orders.length} order${orders.length !== 1 ? "s" : ""}.`}
          </p>
        </div>

        {orders.length === 0 ? (
          // Empty state
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <FaBoxOpen className="text-gray-300 mx-auto mb-4" size={56} />
            <h2 className="text-[18px] font-bold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-[13px] text-gray-400 mb-6">Start shopping and your orders will appear here.</p>
            <Link
              href="/productListing"
              className="inline-block bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap mb-5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors
                    ${filter === f
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600"
                    }`}
                >
                  {f}
                  {f !== "All" && (
                    <span className="ml-1 opacity-70">
                      ({orders.filter((o) => o.status === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Orders list */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-400 text-[13px]">
                No {filter} orders found.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
