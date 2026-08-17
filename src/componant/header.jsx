"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaBars, FaTimes, FaUserCircle, FaUser, FaBoxOpen, FaTruck, FaSignOutAlt } from "react-icons/fa";
import Navbar from "@/componant/nav";
import Search from "./search";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { cartCount, wishlistCount, reloadUserData } = useCart();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUsername(userData.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUsername("");
    reloadUserData();
  };

  return (
    <div className="headerwraper sticky top-0 z-50 bg-white shadow-sm">

      {/* Main Header Row */}
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 border-b border-[rgba(0,0,0,0.1)]">

        {/* Logo */}
        <div className="logo flex-shrink-0">
          <img src="/logo.png" className="w-[60px] h-[24px]" alt="logo" />
        </div>

        {/* Search — hidden on very small, shown from sm up */}
        <div className="hidden sm:flex flex-1 mx-4 max-w-[500px]">
          <Search />
        </div>

        {/* Auth — always visible on all screen sizes */}
        <div className="flex items-center">
          {username ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-bold text-green-600 text-[10px] sm:text-sm truncate max-w-[60px] sm:max-w-none">
                Hi, {username}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-[10px] sm:text-sm font-semibold whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm">
              <Link href="/login" className="hover:text-green-600 transition-colors font-medium whitespace-nowrap">
                Login
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/register" className="hover:text-green-600 transition-colors font-medium whitespace-nowrap">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Cart + Wishlist + Profile icons */}
        <div className="flex items-center gap-5 ml-4">

          {/* Profile icon with dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-center focus:outline-none"
              aria-label="User profile"
            >
              <FaUserCircle
                size={22}
                className={`transition-colors ${username ? "text-green-600 hover:text-green-700" : "text-gray-700 hover:text-green-500"}`}
              />
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-2">
                {username ? (
                  <>
                    {/* User info header */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-green-600 truncate">{username}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      <FaUser size={12} className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      <FaBoxOpen size={12} className="text-gray-400" />
                      My Orders
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      <FaTruck size={12} className="text-gray-400" />
                      Checkout
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      <FaHeart size={12} className="text-gray-400" />
                      Wishlist
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { handleLogout(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 hover:text-red-700 transition-colors"
                      >
                        <FaSignOutAlt size={12} />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <Link href="/wishlist" className="relative flex">
            <span className="bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] absolute -top-3 -right-3">
              {wishlistCount}
            </span>
            <FaHeart size={20} className="text-gray-900 hover:text-green-500" />
          </Link>

          <Link href="/cart" className="relative flex">
            <span className="bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] absolute -top-3 -right-3">
              {cartCount}
            </span>
            <FaShoppingCart size={20} className="text-gray-900 hover:text-green-500" />
          </Link>

          {/* Hamburger — only on mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile search row */}
      <div className="flex sm:hidden px-4 py-2 border-b border-[rgba(0,0,0,0.07)]">
        <Search />
      </div>

      {/* Mobile dropdown menu — nav links */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-4 flex flex-col gap-3 text-sm font-semibold text-gray-700">
          {username ? (
            <>
              <span className="text-green-600 font-bold">Hi, {username}</span>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-600">
                <FaUser size={12} /> My Profile
              </Link>
              <Link href="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-600">
                <FaBoxOpen size={12} /> My Orders
              </Link>
              <Link href="/checkout" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-600">
                <FaTruck size={12} /> Checkout
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="text-left text-red-500 hover:text-red-700 flex items-center gap-2"
              >
                <FaSignOutAlt size={12} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Register</Link>
            </>
          )}
        </div>
      )}

      {/* Navbar — always visible on all screen sizes */}
      <Navbar />

    </div>
  );
};

export default Header;
