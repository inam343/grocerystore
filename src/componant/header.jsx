"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Navbar from "@/componant/nav";
import Search from "./search";

const Header = () => {
  const [username, setUsername] = useState("");

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
    <div className="headerwraper sticky dark:bg-white top-0 z-50">
      <header className="flex items-center justify-evenly dark:bg-transparent py-3 border-b border-[rgba(0,0,0,0.1)]">
        <div className="logo">
          <img src="/logo.png" className="w-[50px] sm:w-[80pxpx] sm:[40px] md:w-[100px] md:h-[40px] h-[20px]"   alt="logo" />
        </div>

        <Search />

        <div>
          {username ? (
            <div className="flex items-center text-[14px] sm:text-[15px] md:text-[16px] gap-3">
              <span className="font-bold  text-green-600">
                hello, <br /> {username}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-500 text-[14px] sm:text-[15px] md:text-[16px] hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hover:text-green-600 text-[14px] sm:text-[15px] md:text-[16px]  transition-colors"
              >
                Login
              </Link>

              <span>|</span>

              <Link
                href="/register"
                className="hover:text-green-600 text-[14px] sm:text-[15px] md:text-[16px] transition-colors"
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
              
              className="size-[20] sm:size-[30] md:size-[35] text-gray-900 hover:text-green-500"
            />
          </Link>

          <Link href="/addcart" className="relative flex">
            <span className="bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-white absolute -top-3 -right-3">
              0
            </span>

            <FaShoppingCart
              
              className="size-[20] sm:size-[30] md:size-[35] text-gray-900 hover:text-green-500"
            />
          </Link>
        </div>
      </header>

      <Navbar />
    </div>
  );
};

export default Header;