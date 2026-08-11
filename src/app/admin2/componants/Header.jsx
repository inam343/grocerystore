"use client";

import React from 'react';
import { MdNotifications, MdSearch } from 'react-icons/md';
import { FiSettings, FiMenu } from 'react-icons/fi';

export default function Header({ onMenuClick }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-10 shadow-sm">

      {/* Left — hamburger (mobile) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <FiMenu size={22} className="text-gray-600" />
        </button>
        <span className="font-bold text-gray-800 text-lg lg:hidden">BoroBozar</span>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Search — hidden on small screens */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <MdSearch size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-700 outline-none w-28 md:w-36 placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <MdNotifications size={22} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings — hidden on mobile */}
        <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <FiSettings size={19} className="text-gray-500" />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-200" />

        {/* Admin avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
            <p className="text-xs text-gray-400">admin@barobozar.com</p>
          </div>
        </div>

      </div>
    </header>
  );
}
