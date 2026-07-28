"use client"
import React from "react";
import Link from "next/link";


const Catlink = ({ cproduct }) => {
  return (
    <div>
      <Link href="/" className="group">
        <div className="bg-white py-3 w-full h-[110px] group-hover:bg-gray-200 rounded-md shadow-md flex items-center justify-center">
          <img
            src={cproduct.image}
            alt={cproduct.name}
            className="group-hover:scale-110"
          />
        </div>

        <div className="group-hover:text-green-700  text-[15px] font-[600] text-center mt-3 text-gray-700">
          <h4>{cproduct.name}</h4>
        </div>
      </Link>
    </div>
  );
};

export default Catlink;