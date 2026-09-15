"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid, FiImage, FiPackage, FiUsers, FiLogOut,
  FiChevronDown, FiChevronUp, FiX, FiShoppingBag, FiPlusSquare,
} from "react-icons/fi";

const NAV = [
  { href: "/admin2/Dashboard", icon: <FiGrid size={18} />, label: "Dashboard" },
  { href: "/admin2/products",  icon: <FiPackage size={18} />, label: "Products" },
  { href: "/admin2/orders",    icon: <FiShoppingBag size={18} />, label: "Orders" },
  { href: "/admin2/users",     icon: <FiUsers size={18} />, label: "Users" },
];

const SLIDES_SUB = [
  { href: "/admin2/homeslides", label: "Home Slides" },
  { href: "/admin2/homeBanner", label: "Banners" },
  { href: "/admin2/addslides",  label: "Add Slide" },
];

const CAT_SUB = [
  { href: "/admin2/catagories/topcatagory",    label: "Top Categories" },
  { href: "/admin2/catagories/poplarcatagory", label: "Popular Products" },
  { href: "/admin2/catagories/latestproducts", label: "Latest Products" },
  { href: "/admin2/catagories/featureproducts",label: "Feature Products" },
  { href: "/admin2/catagories/breakfast",      label: "Breakfast & Dairy" },
];

export default function Asidebar({ open, onClose }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [slidesOpen, setSlidesOpen] = useState(false);
  const [catOpen,    setCatOpen]    = useState(false);

  const isActive = (href) => pathname === href;
  const isGroupActive = (items) => items.some((i) => pathname === i.href);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.replace("/admin2/login");
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-[240px] z-30
        bg-[#0f172a] text-slate-300
        flex flex-col overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <Link href="/admin2/Dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <img
            src="/logo.png"
            alt="BoroBozar"
            className="h-6 w-auto brightness-0 invert"
          />
          <div>
            <p className="text-white font-bold text-sm leading-none">BoroBozar</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Admin Panel</p>
          </div>
        </Link>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
          <FiX size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-1">
          Main Menu
        </p>

        {/* Static links */}
        {NAV.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              isActive(href)
                ? "bg-emerald-500/20 text-emerald-400 shadow-sm"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className={isActive(href) ? "text-emerald-400" : "text-slate-500"}>{icon}</span>
            {label}
            {isActive(href) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </Link>
        ))}

        <div className="my-3 border-t border-white/5" />
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Content
        </p>

        {/* Home Slides dropdown */}
        <button
          onClick={() => setSlidesOpen(!slidesOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isGroupActive(SLIDES_SUB)
              ? "bg-emerald-500/20 text-emerald-400"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-3">
            <FiImage size={18} className={isGroupActive(SLIDES_SUB) ? "text-emerald-400" : "text-slate-500"} />
            Home Slides
          </span>
          {slidesOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>
        {slidesOpen && (
          <div className="ml-8 flex flex-col gap-0.5 mt-0.5">
            {SLIDES_SUB.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive(href) ? "text-emerald-400 bg-emerald-500/10" : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Category dropdown */}
        <button
          onClick={() => setCatOpen(!catOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isGroupActive(CAT_SUB)
              ? "bg-emerald-500/20 text-emerald-400"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-3">
            <FiPackage size={18} className={isGroupActive(CAT_SUB) ? "text-emerald-400" : "text-slate-500"} />
            Categories
          </span>
          {catOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>
        {catOpen && (
          <div className="ml-8 flex flex-col gap-0.5 mt-0.5">
            {CAT_SUB.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive(href) ? "text-emerald-400 bg-emerald-500/10" : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Add Product quick link */}
        <div className="mt-3">
          <Link
            href="/admin2/addproduct"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <FiPlusSquare size={18} className="text-slate-500" />
            Add Product
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FiLogOut size={18} />
          Logout
        </button>
        <div className="mt-2 px-3 py-2">
          <p className="text-[10px] text-slate-600 text-center">BoroBozar Admin v2.0</p>
        </div>
      </div>
    </aside>
  );
}
