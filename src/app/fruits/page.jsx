import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  { id: 1, title: "Fresh Fruits", desc: "Healthy and organic fruits delivered to your door.", img: "/productitems/image1.png" },
  { id: 2, title: "Vegetables", desc: "Farm fresh vegetables picked daily for you.", img: "/productitems/image2.png" },
  { id: 3, title: "Dairy", desc: "Pure dairy products straight from the farm.", img: "/productitems/image3.png" },
  { id: 4, title: "Bakery", desc: "Fresh baked breads and pastries every morning.", img: "/productitems/image4.png" },
  { id: 5, title: "Beverages", desc: "Refreshing drinks for every occasion.", img: "/productitems/image5.png" },
  { id: 6, title: "Snacks", desc: "Tasty snacks for your cravings.", img: "/productitems/image1.png" },
  { id: 7, title: "Frozen Foods", desc: "Quality frozen meals ready in minutes.", img: "/productitems/image2.png" },
  { id: 8, title: "Meats", desc: "Premium cuts of fresh meat and seafood.", img: "/productitems/image3.png" },
  { id: 9, title: "Organic", desc: "Certified organic products for a healthy life.", img: "/productitems/image4.png" },
  { id: 10, title: "Spices", desc: "Aromatic spices from around the world.", img: "/productitems/image5.png" },
]

const page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FAFAFA]">

      {/* Sidebar */}
      <aside className="w-full md:w-[220px] lg:w-[240px] flex-shrink-0 bg-white shadow-md md:sticky md:top-[120px] md:self-start rounded-xl mx-3 my-4 md:mx-4 md:my-5">
        <ul className="text-[15px] font-[600] p-3 flex flex-row md:flex-col flex-wrap gap-2">
          {['Home', 'About', 'Contact Us', 'Login', 'Register'].map((item) => (
            <li key={item} className="list-none">
              <Link
                href="/"
                className="block rounded-lg shadow-sm h-[40px] flex items-center justify-center px-3 cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-300 text-[14px]"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <div className="flex-1 p-3 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition duration-300 hover:shadow-xl"
            >
              <img src={product.img} alt={product.title} className="w-full h-[100px] object-contain" />
              <h3 className="text-[14px] sm:text-[16px] font-bold text-gray-800 mt-3 text-center">{product.title}</h3>
              <p className="text-gray-400 mt-2 text-[12px] sm:text-[13px] text-center leading-snug">{product.desc}</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-[12px] sm:text-[13px] font-[600] w-full">
                Shop Now
              </button>
            </div>
          ))}
        </div>

        {/* Bottom decorative boxes */}
        <div className="flex flex-wrap justify-end gap-4 mt-8 px-2">
          <div className="h-[100px] w-[100px] sm:h-[130px] sm:w-[110px] flex items-center justify-center rounded-md cursor-pointer hover:bg-amber-200 bg-amber-100 text-[13px] font-[600]">Hello</div>
          <div className="h-[100px] w-[100px] sm:h-[130px] sm:w-[110px] flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-200 bg-blue-100 text-[13px] font-[600] mt-0 sm:mt-10">Hello</div>
          <div className="h-[100px] w-[100px] sm:h-[130px] sm:w-[110px] flex items-center justify-center rounded-md cursor-pointer hover:bg-green-200 bg-green-100 text-[13px] font-[600]">Hello</div>
        </div>
      </div>

    </div>
  );
};

export default page;
