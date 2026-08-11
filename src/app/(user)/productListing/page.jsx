import React from 'react'
import SideBar from '@/componant/sideBar'

const productpage = () => {
  return (
    <section className="py-5 bg-white min-h-screen">
      <div className="container flex flex-col md:flex-row gap-4 px-3 sm:px-5 md:px-8">

        {/* Sidebar — full width on mobile, 1/4 on md+ */}
        <div className="w-full md:w-1/4 lg:w-[220px] flex-shrink-0">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-100 rounded-md min-h-[400px] md:min-h-[1000px] p-4">
          <p className="text-gray-500 text-[14px]">Products will appear here</p>
        </div>

      </div>
    </section>
  )
}

export default productpage;
