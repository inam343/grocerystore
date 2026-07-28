import React from 'react'
import SideBar from '@/componant/sideBar'

const productpage = () => {
  return (
      <section className="py-5 gap-4 bg-white">
        <div className="container flex">
            <div className="sidebarwraper w-1/4">
              <SideBar/>
            </div>
           <div className="rihtcontent w-3/4 bg-gray-300 h-[1000px]">
            hello
           </div>
        </div>
      </section>
  )
}

export default productpage
