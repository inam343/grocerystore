"use client";

import React, { useEffect, useState } from "react";
import {
  FaRegUser, FaBoxOpen, FaTags, FaImages, FaDollarSign,
  FaArrowUp, FaArrowDown, FaShoppingCart,
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from "recharts";
import { API_BASE } from "@/lib/api";

/* ── helpers ── */
function buildMonthlyIncome(orders) {
  const map = {};
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  months.forEach((m) => { map[m] = 0; });
  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    if (isNaN(d)) return;
    const key = months[d.getMonth()];
    map[key] += o.grandTotal || o.totalPrice || 0;
  });
  return months.map((m) => ({ month: m, income: parseFloat(map[m].toFixed(2)) }));
}

function buildMonthlyUsers(users) {
  const map = {};
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  months.forEach((m) => { map[m] = 0; });
  users.forEach((u) => {
    const d = new Date(u.createdAt);
    if (isNaN(d)) return;
    const key = months[d.getMonth()];
    map[key] += 1;
  });
  return months.map((m) => ({ month: m, users: map[m] }));
}

/* ── custom tooltip ── */
const IncomeTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      <p className="text-emerald-600 font-semibold">${payload[0].value.toFixed(2)}</p>
    </div>
  );
};

const UsersTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      <p className="text-violet-600 font-semibold">{payload[0].value} users</p>
    </div>
  );
};

/* ── stat card ── */
function StatCard({ label, value, sub, icon, gradient, trend, trendUp }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-default bg-gradient-to-br ${gradient}`}>
      {/* Background circle decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/10" />

      <div className="relative flex items-start justify-between mb-4">
        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        {trend != null && (
          <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? "bg-white/25" : "bg-white/15"}`}>
            {trendUp ? <FaArrowUp size={9} /> : <FaArrowDown size={9} />}
            {trend}%
          </span>
        )}
      </div>

      <p className="text-3xl font-extrabold tracking-tight leading-none">{value}</p>
      <p className="text-sm font-semibold opacity-90 mt-1">{label}</p>
      {sub && <p className="text-xs opacity-65 mt-1.5 truncate leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ── recent orders row ── */
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
      <td className="py-3 px-4 text-xs font-semibold text-gray-700">
        {order.shippingInfo?.fullName || "—"}
      </td>
      <td className="py-3 px-4 text-xs font-bold text-emerald-600">
        ${(order.grandTotal || order.totalPrice || 0).toFixed(2)}
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_COLOR[order.status] || STATUS_COLOR.Pending}`}>
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
        statsRes.json(),
        ordersRes.json(),
        usersRes.json(),
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

  /* derived numbers */
  const totalIncome = orders.reduce((s, o) => s + (o.grandTotal || o.totalPrice || 0), 0);
  const deliveredIncome = orders
    .filter((o) => o.status === "Delivered")
    .reduce((s, o) => s + (o.grandTotal || o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  const incomeData = buildMonthlyIncome(orders);
  const usersData  = buildMonthlyUsers(users);
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

  const STAT_CARDS = [
    {
      label: "Total Users",
      value: stats ? stats.totalUsers.toLocaleString() : "—",
      sub: `${users.length} registered accounts`,
      gradient: "from-violet-500 to-violet-700",
      icon: <FaRegUser size={20} />,
      trend: 12, trendUp: true,
    },
    {
      label: "Total Products",
      value: stats ? stats.totalProducts.toLocaleString() : "—",
      sub: `Featured: ${stats?.totalFeaturedProducts ?? "—"} | Latest: ${stats?.totalLatestProducts ?? "—"}`,
      gradient: "from-blue-500 to-blue-700",
      icon: <FaBoxOpen size={20} />,
      trend: 5, trendUp: true,
    },
    {
      label: "Total Orders",
      value: orders.length.toLocaleString(),
      sub: `${pendingOrders} pending · ${deliveredOrders} delivered`,
      gradient: "from-orange-400 to-orange-600",
      icon: <FaShoppingCart size={20} />,
      trend: 8, trendUp: true,
    },
    {
      label: "Total Income",
      value: `$${totalIncome.toFixed(0)}`,
      sub: `Delivered: $${deliveredIncome.toFixed(0)} collected`,
      gradient: "from-emerald-500 to-emerald-700",
      icon: <FaDollarSign size={20} />,
      trend: 14, trendUp: true,
    },
    {
      label: "Categories",
      value: stats ? stats.totalCategories.toLocaleString() : "—",
      sub: "Active store categories",
      gradient: "from-pink-400 to-rose-600",
      icon: <FaTags size={20} />,
      trend: null,
    },
    {
      label: "Home Slides",
      value: stats ? stats.totalSliders.toLocaleString() : "—",
      sub: "Slider images on homepage",
      gradient: "from-cyan-500 to-cyan-700",
      icon: <FaImages size={20} />,
      trend: null,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 pb-8">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <button
          onClick={() => loadAll(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-semibold border border-emerald-200 transition-all disabled:opacity-60"
        >
          <FiRefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className={card.label === "Total Income" ? "col-span-2 lg:col-span-1" : ""}>
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* ── Income highlight card ── */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-20 -bottom-10 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-white/10" />

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <p className="text-emerald-100 text-sm font-medium mb-1">💰 Total Revenue Overview</p>
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight">${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-emerald-200 text-sm mt-2">Across all {orders.length} orders placed</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <FaArrowUp size={9} /> 14% this month
              </span>
              <span className="text-xs text-emerald-200 font-medium">vs last month</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: "Delivered Income",  value: `$${deliveredIncome.toFixed(2)}`,    note: "Collected" },
              { label: "Pending Orders",    value: pendingOrders,                        note: "Awaiting" },
              { label: "Delivered Orders",  value: deliveredOrders,                      note: "Completed" },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-white/15 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <p className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wide">{label}</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-lg font-extrabold">{value}</p>
                  <span className="text-[10px] text-emerald-200">{note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Income Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-800">Monthly Income</h3>
              <p className="text-xs text-gray-400 mt-0.5">Revenue trend across the year</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-emerald-700">Income</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={incomeData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<IncomeTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#incomeGrad)"
                dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#10b981" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-800">Monthly Registrations</h3>
              <p className="text-xs text-gray-400 mt-0.5">New users joining each month</p>
            </div>
            <div className="flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold text-violet-700">Users</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={usersData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<UsersTooltip />} />
              <Bar dataKey="users" fill="url(#usersGrad)" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800">Recent Orders</h3>
            <p className="text-xs text-gray-400 mt-0.5">Latest {recentOrders.length} orders across all users</p>
          </div>
          <a href="/admin2/orders" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View All →
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center">
            <FaShoppingCart size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">#</th>
                  <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
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
