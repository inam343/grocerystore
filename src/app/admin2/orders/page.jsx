"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FiSearch, FiRefreshCw, FiEye, FiX, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiTrash2 } from "react-icons/fi";
import { MdOutlineReceiptLong } from "react-icons/md";
import { API_BASE } from "@/lib/api";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_STYLE = {
  Pending:    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Shipped:    "bg-purple-50 text-purple-700 border border-purple-200",
  Delivered:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Cancelled:  "bg-red-50 text-red-700 border border-red-200",
};

const STATUS_ICON = {
  Pending:    <FiClock size={13} />,
  Processing: <FiRefreshCw size={13} />,
  Shipped:    <FiTruck size={13} />,
  Delivered:  <FiCheckCircle size={13} />,
  Cancelled:  <FiXCircle size={13} />,
};

// ── Summary card ──────────────────────────────────────────────────────────────
const SummaryCard = ({ label, count, colorClass, icon }) => (
  <div className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border-l-4 ${colorClass}`}>
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders]             = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId]     = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [fetchError, setFetchError]     = useState("");
  const [statusError, setStatusError]   = useState("");

  // ── Fetch all orders from API ──────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoadingOrders(true);
    setFetchError("");
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      if (!res.ok) throw new Error("Failed to load orders");
      const data = await res.json();
      setOrders(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
      setFetchError("Could not load orders. Check your connection.");
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Filter whenever search or status changes ───────────────────────────────
  useEffect(() => {
    let result = [...orders];
    if (filterStatus !== "all") {
      result = result.filter((o) => o.status === filterStatus);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderId?.toLowerCase().includes(q) ||
          o.shippingInfo?.fullName?.toLowerCase().includes(q) ||
          o.shippingInfo?.phone?.includes(q) ||
          o.userId?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, filterStatus, orders]);

  // ── Update status via API ──────────────────────────────────────────────────
  const handleStatusChange = async (order, newStatus) => {
    if (updatingId) return; // prevent double-clicks
    setUpdatingId(order._id);
    setStatusError("");

    // Optimistic update — change UI immediately
    const previousStatus = order.status;
    setOrders((prev) =>
      prev.map((o) => (o._id === order._id ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?._id === order._id) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      const res = await fetch(`${API_BASE}/api/orders/${order._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Server error ${res.status}`);
      }

      // Confirm with server response
      const data = await res.json();
      const updated = data.order;
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
      if (selectedOrder?._id === updated._id) {
        setSelectedOrder(updated);
      }
    } catch (err) {
      console.error("Status update error:", err);
      setStatusError(`Failed to update status: ${err.message}`);
      // Roll back optimistic update
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? { ...o, status: previousStatus } : o))
      );
      if (selectedOrder?._id === order._id) {
        setSelectedOrder((prev) => ({ ...prev, status: previousStatus }));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Delete order via API ───────────────────────────────────────────────────
  const handleDelete = async (orderId) => {
    if (!confirm("Delete this order? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      if (selectedOrder?._id === orderId) setSelectedOrder(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Stats
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
            <MdOutlineReceiptLong size={26} className="text-emerald-500" />
            Order Tracking
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {orders.length} total order{orders.length !== 1 ? "s" : ""} across all users
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors"
        >
          <FiRefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        <SummaryCard label="Pending"    count={counts.Pending    || 0} colorClass="border-yellow-400"  icon="⏳" />
        <SummaryCard label="Processing" count={counts.Processing || 0} colorClass="border-blue-400"    icon="🔄" />
        <SummaryCard label="Shipped"    count={counts.Shipped    || 0} colorClass="border-purple-400"  icon="🚚" />
        <SummaryCard label="Delivered"  count={counts.Delivered  || 0} colorClass="border-emerald-400" icon="✅" />
        <SummaryCard label="Cancelled"  count={counts.Cancelled  || 0} colorClass="border-red-400"     icon="❌" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-end justify-between">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400"
            >
              <option value="all">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search order ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm w-full sm:w-64 outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Status error toast */}
      {statusError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl mb-4 flex items-center justify-between">
          <span>⚠️ {statusError}</span>
          <button onClick={() => setStatusError("")} className="text-red-400 hover:text-red-600 font-bold ml-4">✕</button>
        </div>
      )}

      {/* Orders table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        {loadingOrders ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading orders…</p>
          </div>
        ) : fetchError ? (
          <div className="py-16 text-center">
            <p className="text-red-400 font-medium">{fetchError}</p>
            <button onClick={load} className="mt-3 text-emerald-600 text-sm font-semibold underline">
              Try again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-400 font-medium">No orders found yet.</p>
            <p className="text-gray-300 text-sm mt-1">Orders placed by users will appear here.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400">No orders match your filter.</p>
          </div>
        ) : (
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Order ID</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Customer</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Address</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Items</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Total</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Date</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                <th className="text-left p-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">

                  {/* Order ID */}
                  <td className="p-4">
                    <p className="font-bold text-gray-700 text-xs">{order.orderId}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">COD</p>
                  </td>

                  {/* Customer */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-800 text-xs">{order.shippingInfo?.fullName || "—"}</p>
                    <p className="text-[11px] text-gray-400">{order.shippingInfo?.phone || "—"}</p>
                  </td>

                  {/* Address */}
                  <td className="p-4">
                    <p className="text-xs text-gray-600 max-w-[160px] leading-snug">
                      {order.shippingInfo?.address || "—"}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {(order.items || []).slice(0, 3).map((item, i) => (
                        <img
                          key={i}
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded-full border-2 border-white object-contain bg-gray-50"
                          onError={(e) => { e.target.src = "/productitems/image1.png"; }}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {(order.items || []).length} item{(order.items || []).length !== 1 ? "s" : ""}
                    </p>
                  </td>

                  {/* Total */}
                  <td className="p-4">
                    <p className="font-bold text-gray-800 text-sm">${(order.grandTotal || order.totalPrice || 0).toFixed(2)}</p>
                  </td>

                  {/* Date */}
                  <td className="p-4">
                    <p className="text-xs text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                        : "—"}
                    </p>
                  </td>

                  {/* Status dropdown */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        disabled={updatingId === order._id}
                        className={`text-xs font-semibold rounded-full px-3 py-1 pr-6 appearance-none cursor-pointer outline-none transition-all
                          ${updatingId === order._id ? "opacity-60 cursor-wait" : ""}
                          ${STATUS_STYLE[order.status] || STATUS_STYLE.Pending}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {updatingId === order._id && (
                        <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <FiEye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                      >
                        <FiTrash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Order Detail Modal ──────────────────────────────────────────────── */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Order Detail</h2>
                <p className="text-xs text-gray-400 mt-0.5">{selectedOrder.orderId}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-5">

              {/* Status changer */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600">Status:</span>
                <select
                  value={selectedOrder.status || "Pending"}
                  onChange={(e) => handleStatusChange(selectedOrder, e.target.value)}
                  className={`text-sm font-semibold rounded-full px-4 py-1.5 appearance-none cursor-pointer outline-none border ${STATUS_STYLE[selectedOrder.status] || STATUS_STYLE.Pending}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span className="flex items-center gap-1 text-sm">
                  {STATUS_ICON[selectedOrder.status]}
                </span>
              </div>

              {/* Customer info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Customer</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Name</p>
                    <p className="font-semibold text-gray-700">{selectedOrder.shippingInfo?.fullName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-700">{selectedOrder.shippingInfo?.phone || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-semibold text-gray-700">{selectedOrder.shippingInfo?.email || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Delivery Address</p>
                    <p className="font-semibold text-gray-700">{selectedOrder.shippingInfo?.address || "—"}</p>
                  </div>
                  {selectedOrder.shippingInfo?.notes && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400">Notes</p>
                      <p className="font-semibold text-gray-700">{selectedOrder.shippingInfo.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Items Ordered</p>
                <div className="flex flex-col gap-3">
                  {(selectedOrder.items || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain rounded-lg bg-white border"
                        onError={(e) => { e.target.src = "/productitems/image1.png"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.brand}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-800">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Price Summary</p>
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${(selectedOrder.totalPrice || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className={`font-semibold ${selectedOrder.deliveryFee === 0 ? "text-emerald-600" : ""}`}>
                      {selectedOrder.deliveryFee === 0 ? "Free" : `$${(selectedOrder.deliveryFee || 0).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-2 mt-1">
                    <span>Total</span>
                    <span className="text-emerald-600">${(selectedOrder.grandTotal || selectedOrder.totalPrice || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Payment</span>
                    <span className="font-semibold text-emerald-500">Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Order Date</span>
                    <span className="font-semibold text-gray-500">
                      {selectedOrder.createdAt
                        ? new Date(selectedOrder.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal footer */}
            <div className="p-5 border-t flex justify-between items-center">
              <button
                onClick={() => handleDelete(selectedOrder._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm transition-colors"
              >
                <FiTrash2 size={14} />
                Delete Order
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
