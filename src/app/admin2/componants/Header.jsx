"use client";

import React, { useEffect, useState } from "react";
import { MdNotifications, MdSearch } from "react-icons/md";
import { FiMenu, FiSun, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

export default function Header({ onMenuClick }) {
  const [adminName, setAdminName] = useState("Admin");
  const [time, setTime] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin");
      if (stored) {
        const admin = JSON.parse(stored);
        setAdminName(admin.username || "Admin");
      }
    } catch (_) {}

    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="w-full bg-white border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-10 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <FiMenu size={20} className="text-gray-600" />
        </button>

        <div className="hidden sm:flex flex-col">
          <p className="text-sm font-bold text-gray-800 leading-none">{greeting}, {adminName} 👋</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Welcome back to your dashboard</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <MdSearch size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-700 outline-none w-28 lg:w-40 placeholder:text-gray-400"
          />
        </div>

        {/* Visit store */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-100"
        >
          <FiExternalLink size={12} />
          Visit Store
        </Link>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
          <MdNotifications size={20} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Time chip */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
          <FiSun size={13} className="text-amber-500" />
          <span className="text-xs font-semibold text-slate-600">{time}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{adminName}</p>
            <p className="text-[10px] text-gray-400">Administrator</p>
          </div>
        </div>

      </div>
    </header>
  );
}
