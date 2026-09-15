"use client";

import React, { useEffect, useState } from "react";
import {
  FaRegUser, FaBoxOpen, FaTags, FaImages, FaDollarSign, FaShoppingCart,
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { API_BASE } from "@/lib/api";

/* ── helpers ── */
function buildMonthlyIncome(orders) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const map = Object.fromEntries(months.map((m) => [m, 0]));
  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    if (isNaN(d)) return;
    map[months[d.getMonth()]] += o.grandTotal || o.totalPrice || 0;
  });
  return months.map((m) => ({ month: m, income: parseFloat(map[m].toFixed(2)) }));
}

function buildMonthlyUsers(users) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const map = Object.fromEntries(months.map((m) => [m, 0]));
  users.forEach((u) => {
    const d = new Date(u.createdAt);
    if (isNaN(d)) return;
    map[months[d.getMonth()]] += 1;
  });
  return months.map((m) => ({ month: m, users: map[m] }));
}

/* ── tooltips ── */
const IncomeTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-lg px-3 py-2 text-xs">
      <p className="font-bold text-gray-600 mb-0.5">{label}</p>
      <p className="text-emerald-600 font-bold">${payload[0].value.toFixed(2)}</p>
    </div>
  );
};

const UsersTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-lg px-3 py-2 text-xs">
      <p className="font-bold text-gray-600 mb-0.5">{label}</p>
      <p className="text-violet-600 font-bold">{payload[0].value} users</p>
    </div>
  );
};

/* ── compact stat card ── */
function StatCard({ label, value, icon, gradient }) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-4 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-default bg-gradient-to-br ${gradient}`}>
      <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-white/10" />
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-xl font-extrabold tracking-tight leading-none">{value}</p>
      <p className="text-xs font-medium opacity-80 mt-1">{label}</p>
    </div>
  );
}

/* ── recent order row ── */
function RecentOrderRow({ order, idx }) {
  const STATUS_COLOR = {
    Pending:    "bg-amber-100 text-amber-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped:    "bg-purple-100 text-purple-700",
    Delivered:  "bg-emerald-100 text-emerald-700",
    Cancelled:  "bg-red-100 text-red-600",
  };
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "—";
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="py-3 px-4 text-xs text-gray-400 font-medium">{idx + 1}</td>
      <td className="py-3 px-4">
        <p className="text-xs font-bold text-gray-700">{order.orderId}</p>
        <p className="text-[10px] text-gray-400">{dateStr}</p>
      </td>
      <td className="py-3 px-4 text-xs font-semibold text-gray-700">{order.shippingInfo?.fullName || "—"}</td>
      <td className="py-3 px-4 text-xs font-bold text-emerald-600">
        ${(order.grandTotal || order.totalPrice || 0).toFixed(2)}
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLOR[order.status] || STATUS_COLOR.Pending}`}>
          {order.status || "Pending"}
        </span>
      </td>
    </tr>
  );
}

/* ── main dashboard ── */
export default function DashboardPage() {
  const [stats, setStats]           = useState(null);
  const [orders, setOrders]         = useState([]);
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const [statsRes, ordersRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/api/stats`),
        fetch(`${API_BASE}/api/orders`),
        fetch(`${API_BASE}/api/users`),
      ]);
      const [statsData, ordersData, usersData] = await Promise.all([
        statsRes.json(), ordersRes.json(), usersRes.json(),
      ]);
      setStats(statsData);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const totalIncome     = orders.reduce((s, o) => s + (o.grandTotal || o.totalPrice || 0), 0);
  const pendingOrders   = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  const incomeData   = buildMonthlyIncome(orders);
  const usersData    = buildMonthlyUsers(users);
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  const STAT_CARDS = [
    { label: "Total Users",    value: stats?.totalUsers?.toLocaleString()      ?? "—", gradient: "from-violet-500 to-violet-700", icon: <FaRegUser size={16} />    },
    { label: "Total Products", value: stats?.totalProducts?.toLocaleString()   ?? "—", gradient: "from-blue-500 to-blue-700",    icon: <FaBoxOpen size={16} />     },
    { label: "Total Orders",   value: orders.length.toLocaleString(),                  gradient: "from-orange-400 to-orange-600", icon: <FaShoppingCart size={16} /> },
    { label: "Total Income",   value: `$${totalIncome.toFixed(0)}`,                    gradient: "from-emerald-500 to-emerald-700", icon: <FaDollarSign size={16} /> },
    { label: "Categories",     value: stats?.totalCategories?.toLocaleString() ?? "—", gradient: "from-pink-400 to-rose-600",    icon: <FaTags size={16} />        },
    { label: "Home Slides",    value: stats?.totalSliders?.toLocaleString()    ?? "—", gradient: "from-cyan-500 to-cyan-700",    icon: <FaImages size={16} />      },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <button
          onClick={() => loadAll(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition-all disabled:opacity-60"
        >
          <FiRefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* ── Stat cards — 6 compact cards in one row ── */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Charts — always side by side ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Income chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800">Monthly Income</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Revenue trend across the year</p>
            </div>
            <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Income
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={incomeData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<IncomeTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#incomeGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#10b981" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800">Monthly Registrations</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">New users joining each month</p>
            </div>
            <span className="flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Users
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usersData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<UsersTooltip />} />
              <Bar dataKey="users" fill="url(#usersGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ── Recent Orders ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Recent Orders</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Latest {recentOrders.length} orders</p>
          </div>
          <a href="/admin2/orders" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View All →
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-10 text-center">
            <FaShoppingCart size={28} className="text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">#</th>
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <RecentOrderRow key={order._id} order={order} idx={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
