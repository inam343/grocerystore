import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomeSlides = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Home Slides
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage the slides displayed on your homepage.
          </p>
        </div>

        <Link href="/admin2/addslides">
          <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold shadow-sm transition">
            + Add New Slide
          </button>
        </Link>

      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        
          <div
    
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
          >

            {/* Image */}
            <div className="relative w-full h-48 bg-gray-100">

              <Image
                
                src="/slide1.png"
                alt="slide1"
                fill
                className="object-cover"
              />

            </div>

            {/* Content */}
            <div className="p-4">

              <div className="flex items-center justify-between mb-3">

                <h2 className="font-semibold text-gray-800">
                  
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium 
                    
            
                  }`}
                >
                  
                </span>

              </div>

              {/* Actions */}
              <div className="flex gap-2">

                <Link
                  href="/"
                  className="flex-1"
                >
                  <button className="w-full py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
                    Edit
                  </button>
                </Link>

                <button className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium">
                  Delete
                </button>

              </div>

            </div>

          </div>
        

      </div>

    </div>
  );
};

export default HomeSlides;
