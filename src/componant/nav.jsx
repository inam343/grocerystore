import Link from "next/link";
import fruits from "@/app/fruits/page";
import React from "react";
import counter from "@/app/counter/page";
import { FaAngleDown } from "react-icons/fa";
const Navbar = () => {
    return (
        <nav className="py-3 ">
            <div className="grid grid-cols-5 sm:grid-cols-8 p-2 md:grid-cols-10 gap-2  sm:px-15 md:px-15 lg:px-15 items-center justify-center ">
                <Link href="/" className=" text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Home</Link>
                <Link href="/fruits" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Fruits</Link>
                <Link href="/counter" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Meats</Link>
                <Link href="/breakfast" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Dairy</Link>
                <Link href="/breads" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Bakery</Link>
                <Link href="/breavages" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Beverges</Link>
                <Link href="/frozen" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Frozen Foods</Link>
                <Link href="/biscuits" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Snacks</Link>
                <Link href="/grocerry" className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-800 font-[600] hover:text-green-600">Grocery</Link>
                <div className="relative group">
                    <span className="text-[15px] text-gray-800 font-[600] hover:text-green-600 cursor-pointer flex items-center gap-1">More
                        <FaAngleDown size={18} />
                    </span>

                    <div className="dropmenue flex flex-col absolute  top-100% right-[0] bg-white shadow-md rounded-md overflow-hidden w-150px gap-2 invisible opicity-0 transition  pt-4 group-hover:visible">
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