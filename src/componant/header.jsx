"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Navbar from "@/componant/nav";
import Search from "./search";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [username, setUsername] = useState("");
  const { cartCount } = useCart();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      setUsername(userData.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  

  return (
    <div className="headerwraper sticky top-0 z-50">
      <header className="flex items-center justify-evenly py-3 border-b border-[rgba(0,0,0,0.1)]">
        <div className="logo">
          <img src="/logo.png" className="w-[50px] h-[20px]"   alt="logo" />
        </div>

        <Search />

        <div>
          {username ? (
            <div className="flex items-center gap-3">
              <span className="font-bold  text-green-600">
                Welcome, {username}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hover:text-green-600 transition-colors"
              >
                Login
              </Link>

              <span>|</span>

              <Link
                href="/register"
                className="hover:text-green-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="relative flex">
            <span className="bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-white absolute -top-3 -right-3">
              0
            </span>

            <FaHeart
              size={20}
              className="text-gray-900 hover:text-green-500"
            />
          </Link>

          <Link href="/cart" className="relative flex">
            <span className="bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-white absolute -top-3 -right-3">
              {cartCount}
            </span>

            <FaShoppingCart
              size={20}
              className="text-gray-900 hover:text-green-500"
            />
          </Link>
        </div>
      </header>

      <Navbar />
    </div>
  );
};

export default Header;