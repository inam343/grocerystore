"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaHeart, FaShoppingCart, FaBars, FaTimes, FaUserCircle,
  FaUser, FaBoxOpen, FaTruck, FaSignOutAlt,
} from "react-icons/fa";
import Navbar from "@/componant/nav";
import Search from "./search";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const { cartCount, reloadUserData } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUsername(JSON.parse(user).username || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUsername("");
    reloadUserData();
    setProfileOpen(false);
    setMenuOpen(false);
  };

  return (
    <div className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>

      {/* ── Promo bar ── */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center text-[11px] sm:text-xs py-1.5 font-medium tracking-wide">
        🌿 Free delivery on orders over $50 &nbsp;|&nbsp; Fresh products every day 🥦
      </div>

      {/* ── Main header: 3-column layout ── */}
      <header className="grid grid-cols-[1fr_auto_1fr] md:grid-cols-[180px_1fr_180px] items-center gap-3 px-4 sm:px-6 md:px-10 py-3">

        {/* LEFT — Auth links (desktop) / Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>

          {/* Auth — desktop only */}
          <div className="hidden md:flex items-center">
            {username ? (
              <span className="text-[13px] font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full truncate">
                Hi, {username} 👋
              </span>
            ) : (
              <div className="flex items-center gap-1 text-[13px] font-medium text-slate-600">
                <Link href="/login" className="hover:text-green-600 transition-colors px-2 py-1 rounded-md hover:bg-green-50">
                  Login
                </Link>
                <span className="text-slate-300">|</span>
                <Link href="/register" className="hover:text-green-600 transition-colors px-2 py-1 rounded-md hover:bg-green-50">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* CENTER — Logo + Search bar */}
        <div className="flex items-center gap-3 justify-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white text-base">🌿</span>
            </div>
            <img src="/logo.png" className="h-6 w-auto hidden sm:block" alt="logo" />
          </Link>

          {/* Search — visible from sm up */}
          <div className="hidden sm:flex w-[260px] md:w-[380px] lg:w-[460px]">
            <Search />
          </div>
        </div>

        {/* RIGHT — Cart, Wishlist, Profile */}
        <div className="flex items-center gap-1 sm:gap-2 justify-end">

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                profileOpen ? "bg-green-50 text-green-600" : "hover:bg-slate-50 text-slate-600 hover:text-green-600"
              }`}
              aria-label="Profile"
            >
              <FaUserCircle size={21} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-[210px] bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-fadeIn">
                {username ? (
                  <>
                    <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-green-600 truncate mt-0.5">{username}</p>
                    </div>
                    {[
                      { href: "/profile",  icon: <FaUser size={12} />,    label: "My Profile" },
                      { href: "/orders",   icon: <FaBoxOpen size={12} />, label: "My Orders"  },
                      { href: "/checkout", icon: <FaTruck size={12} />,   label: "Checkout"   },
                      { href: "/wishlist", icon: <FaHeart size={12} />,   label: "Wishlist"   },
                    ].map(({ href, icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <span className="text-slate-400">{icon}</span>
                        {label}
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt size={12} /> Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-[13px] text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors">
                      Login
                    </Link>
                    <Link href="/register" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-[13px] text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors">
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-50 transition-colors group">
            <FaShoppingCart size={19} className="text-slate-500 group-hover:text-green-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none px-1">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </header>

      {/* ── Mobile search row ── */}
      <div className="flex sm:hidden px-4 pb-2.5">
        <Search />
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-1 animate-fadeInUp shadow-lg">
          {username ? (
            <>
              <div className="px-3 py-2 mb-1 bg-green-50 rounded-lg">
                <p className="text-[11px] text-slate-400 font-medium">Signed in as</p>
                <p className="text-sm font-bold text-green-700">{username}</p>
              </div>
              {[
                { href: "/profile",  icon: <FaUser size={13} />,    label: "My Profile" },
                { href: "/orders",   icon: <FaBoxOpen size={13} />, label: "My Orders"  },
                { href: "/checkout", icon: <FaTruck size={13} />,   label: "Checkout"   },
                { href: "/wishlist", icon: <FaHeart size={13} />,   label: "Wishlist"   },
              ].map(({ href, icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium"
                >
                  <span className="text-slate-400">{icon}</span>
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium mt-1"
              >
                <FaSignOutAlt size={13} /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                Login
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── Navbar ── */}
      <Navbar />
    </div>
  );
};

export default Header;
