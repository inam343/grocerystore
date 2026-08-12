"use client";

import React, { useEffect, useState } from "react";
import { FaRegUser, FaGift, FaArrowUp } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import ProductTable from "../componants/product";
import UsersTable from "../componants/Admuser";
import { API_BASE } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  const cards = [
    {
      label: "Total Users",
      value: stats ? stats.totalUsers.toLocaleString() : "—",
      change: "Registered customers",
      gradient: "from-emerald-400 to-emerald-600",
      icon: <FaRegUser size={24} />,
    },
    {
      label: "Total Products",
      value: stats ? stats.totalProducts.toLocaleString() : "—",
      change: `Latest: ${stats?.totalLatestProducts ?? "—"} | Featured: ${stats?.totalFeaturedProducts ?? "—"} | Breakfast: ${stats?.totalBreakfast ?? "—"}`,
      gradient: "from-violet-400 to-violet-600",
      icon: <FaProductHunt size={24} />,
    },
    {
      label: "Total Categories",
      value: stats ? stats.totalCategories.toLocaleString() : "—",
      change: "Active category entries",
      gradient: "from-orange-400 to-orange-600",
      icon: <BiCategory size={24} />,
    },
    {
      label: "Home Slides",
      value: stats ? stats.totalSliders.toLocaleString() : "—",
      change: "Slider images on home page",
      gradient: "from-blue-500 to-blue-700",
      icon: <FaGift size={24} />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">

      {/* Welcome */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome back, Admin 👋</h2>
        <p className="text-sm text-gray-500 mt-1">
          Here&apos;s what&apos;s happening in your store today.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {cards.map((s) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <span className="flex items-center gap-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                <FaArrowUp size={9} />
                Live
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">{s.value}</p>
            <p className="text-xs sm:text-sm font-medium opacity-90 mt-1">{s.label}</p>
            <p className="text-xs opacity-70 mt-1 sm:mt-2 truncate">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Tables */}
      <ProductTable tittle="Latest Product" />
      <UsersTable />

    </div>
  );
}
