import Link from "next/link";
import fruits from "@/app/fruits/page";
import React from "react";
import counter from "@/app/counter/page";
import { FaAngleDown } from "react-icons/fa";
const Navbar = () => {
    return (
        <nav className="py-3 ">
            <div className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 dark:bg-zinc-800 bg-white  sm:bg-transparent md:bg-transparent  h-[40px] rounded-lg sm:px-15 md:px-15 lg:px-15  ">
                <Link href="/" className=" text-[15px] sm:text-[16px] md:text-[18px]   sm:text-gray-800 md:text-gray-800 lg:text-gray-800 font-[600] hover:text-green-600">Home</Link>
                <Link href="/fruits" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Fruits</Link>
                <Link href="/counter" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Meats</Link>
                <Link href="/breakfast" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Dairy</Link>
                <div className="relative group">
                    <span className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600 cursor-pointer flex items-center gap-1">More
                        <FaAngleDown size={18} />
                    </span>

                    <div className="dropmenue flex flex-col absolute justify-center items-center  top-100% right-[0] bg-white shadow-md rounded-md overflow-hidden w-150px gap-2 invisible opicity-0 transition  pt-4 group-hover:visible">
                        <Link href="/" className=" text-[13px] text-gray-800 font-[600] hover:text-green-600">Home</Link>
                        <Link href="/count" className="text-[13px] text-gray-800 font-[600] hover:text-green-600">Fruits</Link>
                        <Link href="/meals" className="text-[13px] text-gray-800 font-[600] hover:text-green-600">Meats</Link>
                        <Link href="/breakfast" className="text-[13px] text-gray-800 font-[600] hover:text-green-600">Dairy</Link>
                        <Link href="/breads" className="text-[13px] text-gray-800 font-[600] hover:text-green-600">Bakery</Link>
                        <Link href="/breavages" className="text-[13px] text-gray-800 font-[600] hover:text-green-600">Beverges</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar