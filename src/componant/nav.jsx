import Link from "next/link";
import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="py-2 bg-white border-b border-[rgba(0,0,0,0.07)]">
      <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-8 md:px-12 min-h-[40px]">

        <Link href="/" className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-[600] hover:text-green-600 transition-colors">
          Home
        </Link>

        <Link href="/fruits" className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-[600] hover:text-green-600 transition-colors">
          Fruits
        </Link>

        <Link href="/counter" className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-[600] hover:text-green-600 transition-colors">
          Meats
        </Link>

        <Link href="/breakfast" className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-[600] hover:text-green-600 transition-colors">
          Dairy
        </Link>

        <Link href="/productListing" className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-[600] hover:text-green-600 transition-colors">
          Shop
        </Link>

        {/* More dropdown */}
        <div className="relative group">
          <span className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-[600] hover:text-green-600 cursor-pointer flex items-center gap-1 transition-colors">
            More <FaAngleDown size={14} />
          </span>

          <div className="absolute top-full left-0 bg-white shadow-lg rounded-md overflow-hidden w-[150px] z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 flex flex-col py-2">
            <Link href="/" className="px-4 py-2 text-[13px] text-gray-700 font-[600] hover:bg-gray-50 hover:text-green-600">Home</Link>
            <Link href="/fruits" className="px-4 py-2 text-[13px] text-gray-700 font-[600] hover:bg-gray-50 hover:text-green-600">Fruits</Link>
            <Link href="/counter" className="px-4 py-2 text-[13px] text-gray-700 font-[600] hover:bg-gray-50 hover:text-green-600">Meats</Link>
            <Link href="/breakfast" className="px-4 py-2 text-[13px] text-gray-700 font-[600] hover:bg-gray-50 hover:text-green-600">Dairy</Link>
            <Link href="/breads" className="px-4 py-2 text-[13px] text-gray-700 font-[600] hover:bg-gray-50 hover:text-green-600">Bakery</Link>
            <Link href="/beverages" className="px-4 py-2 text-[13px] text-gray-700 font-[600] hover:bg-gray-50 hover:text-green-600">Beverages</Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
