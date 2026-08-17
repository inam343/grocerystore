"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiGrid, FiImage, FiPackage, FiUsers,
  FiLogOut, FiChevronDown, FiChevronUp, FiX, FiShoppingBag,
} from "react-icons/fi";

export default function Asidebar({ open, onClose }) {
  const pathname = usePathname();
  const [slidesOpen, setSlidesOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const linkClass = (href) =>
    `flex items-center gap-3 px-6 py-3 font-bold text-sm transition-colors ${
      pathname === href
        ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-500'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className={`
      bg-white w-64 top-0 left-0 fixed border-r shadow-sm overflow-y-auto h-screen flex flex-col z-30
      transition-transform duration-300
      ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>

      {/* Logo */}
      <div className='flex gap-3 px-6 py-5 items-center border-b justify-between'>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            B
          </div>
          <h1 className='text-xl font-bold text-gray-800'>BoroBozar</h1>
        </div>
        {/* Close button — mobile only */}
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-700">
          <FiX size={22} />
        </button>
      </div>

      {/* Nav */}
      <div className='flex flex-col py-4 flex-1'>

        <Link href="/admin2/Dashboard" onClick={onClose} className={linkClass('/admin2/Dashboard')}>
          <FiGrid size={20} />
          Dashboard
        </Link>

        {/* Home Slides dropdown */}
        <button
          onClick={() => setSlidesOpen(!slidesOpen)}
          className="flex items-center justify-between w-full px-6 py-3 font-bold text-sm text-gray-700 hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <FiImage size={20} />
            Home Slides
          </span>
          {slidesOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </button>
        {slidesOpen && (
          <div className='flex flex-col pl-14'>
            <Link href="/admin2/homeslides" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Home Slide</Link>
            <Link href="/admin2/homeBanner" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Banner</Link>
            <Link href="/admin2/addslides" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Add Slide</Link>
          </div>
        )}

        {/* Category dropdown */}
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="flex items-center justify-between w-full px-6 py-3 font-bold text-sm text-gray-700 hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <FiPackage size={20} />
            Category
          </span>
          {catOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </button>
        {catOpen && (
          <div className='flex flex-col pl-14'>
            <Link href="/admin2/catagories/topcatagory" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Top Categories</Link>
            <Link href="/admin2/catagories/poplarcatagory" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Popular Products</Link>
            <Link href="/admin2/catagories/latestproducts" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Latest Products</Link>
            <Link href="/admin2/catagories/featureproducts" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Feature Products</Link>
            <Link href="/admin2/catagories/breakfast" onClick={onClose} className="py-2 text-sm text-gray-500 hover:text-emerald-600">Breakfast & Dairy</Link>
          </div>
        )}

        <Link href="/admin2/users" onClick={onClose} className={linkClass('/admin2/users')}>
          <FiUsers size={20} />
          Users
        </Link>

        <Link href="/admin2/products" onClick={onClose} className={linkClass('/admin2/products')}>
          <FiPackage size={20} />
          Products
        </Link>

        <Link href="/admin2/orders" onClick={onClose} className={linkClass('/admin2/orders')}>
          <FiShoppingBag size={20} />
          Orders
        </Link>

      </div>

      {/* Logout */}
      <div className="border-t">
        <Link href="/" className="flex items-center gap-3 px-6 py-4 font-bold text-emerald-500 hover:bg-gray-100 text-sm">
          <FiLogOut size={20} />
          Logout
        </Link>
      </div>

    </aside>
  );
}
