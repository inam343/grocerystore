import React from 'react'
import { BsWallet2 } from 'react-icons/bs'
import { FaFacebook, FaGift, FaInstagram, FaWallet, FaWhatsapp } from 'react-icons/fa'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { PiKeyReturnLight } from 'react-icons/pi'
import { IoChatbox, IoChatboxOutline, IoWalletOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <footer className='bg-[#eeeded] py-8'>
      <div className='gap-4  '>
        <div className='flex items-center justify-center  gap-4 py-3 lg:py-8 pb-0 lg:pb-8  px-0 lg:px-8 '>
          <div className=' flex items-center justify-center flex-col group w-[15%] cursor-pointer'>
            <LiaShippingFastSolid className='text-[30px] transition-all duration-300 group-hover:text-green-400 group-hover:-translate-y-1' />
            <h3 className='text-[15px] font-[600] mt-3'>Free Shiping</h3>
            <p className='text-[14px] font-[500]'>For all Orders 100$  </p>
          </div>

          <div className=' flex items-center justify-center flex-col group w-[15%] cursor-pointer'>
            <PiKeyReturnLight className='text-[30px] transition-all duration-300 group-hover:text-green-400 group-hover:-translate-y-1' />
            <h3 className='text-[15px] font-[600] mt-3'>30 Days Return</h3>
            <p className='text-[14px] font-[500]'>For an Exchange</p>
          </div>

          <div className=' flex items-center justify-center flex-col group w-[15%] cursor-pointer'>
            <IoWalletOutline className='text-[30px] transition-all duration-300 group-hover:text-green-400 group-hover:-translate-y-1' />
            <h3 className='text-[15px] font-[600] mt-3'>Secured Payment</h3>
            <p className='text-[14px] font-[500]'>Payment Card Accepted</p>
          </div>

          <div className=' flex items-center justify-center flex-col group w-[15%] cursor-pointer'>
            <CiGift className='text-[30px] transition-all duration-300 group-hover:text-green-400 group-hover:-translate-y-1' />
            <h3 className='text-[13px] font-[600] mt-3'>Free Shiping</h3>
            <p className='text-[14px] font-[500]'>For an Exchange Poduct</p>
          </div>

          <div className=' flex items-center justify-center flex-col group w-[15%] cursor-pointer'>
            <CiHeadphones className='text-[30px] transition-all duration-300 group-hover:text-green-400 group-hover:-translate-y-1' />
            <h3 className='text-[15px] font-[600] mt-3'>Support 24/7</h3>
            <p className='text-[14px] font-[500]'>Contact Us Anytime</p>
          </div>
        </div>
        <hr />
        <div className=' grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 ml-15  gap-5 justify-around  py-4 '>
          <div className='flex flex-col  pl-5 m2  border-r-[1px] border-[rgba(0,0,0,0.2)]'>
            <h3 className='text-[20px]  text-gray-700 font-[600] '>Contact us  </h3>
            <p className='pt-5 text-[14px] font-[600] text-gray-600'>Classy Shop-Mega Supper Store
    
              507-Union Trade Center France
            </p>
            <br />

            <Link href={"inamtariqsatti@gmail.com"} className='text-[15px] font-[300] font-normal hover:text-green-400'>inamtariqsatti@gmail.com</Link>

            <span className='text-[15px] text-bold  text-black'>(+92) 3241929583</span>
           
          </div>
          <div className="col2 flex justify-between pl-10 gap-5 w-[10%]">
            <div className='box  '>
              <h3 className='text-[20px] text-gray-700 font-[600] '>Products  </h3>
              <ul className='list mt-5  '>
                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Price Drop</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>New Price</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Best Sales</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Contact Us</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Sitemap</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Stores</Link></li>


              </ul>
            </div>
          </div>

          <div className="col3 flex justify-between gap-5  w-[50 %]">
            <div className='box pl-4'>
              <h3 className='text-[20px]  text-gray-700 font-[600] '>Our Company</h3>
              <ul className='list mt-2'>
                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Dilivery</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Leagal Notice</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Term and Condiion</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>About Us</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Secure Payment</Link></li>

                <li className='list-none text-[14px] -full mb-2 '><Link href="/" className='Link text-[15px] font-[600] text-gray-600'>Login</Link></li>


              </ul>
            </div>
          </div>

          <div className="col4 flex mr-3 justify-between gap-5 w-[50%]">
            <div className='ml-3'>
              <h3 className='text-[20px] text-gray-700 font-[600] '>Subcribe us</h3>

              <p className='mt-5 text-[15px] font-[600] text-gray-600 -full mb-2'>Subcribe to our latest neslatter special discounts</p>

              <form action="" className='flex flex-col gap-5 w-[150px]'>
                <input type="text" placeholder='Your Email Address' className='w-full h-[40px] m2 rounded-md px-6 bg-white border border-[rgba(0,0,0,1)] outline-none' />
                <div className="btn">
                  <button className='btn-g'>Subcribe</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className="bottomscricpt  ml-20 border-t-[1px] border[0,0,0,0.01] grid grid-cols-2  md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  items-center justify-arond py-3">
        <div className='flex'>
          <div className="social flex items-center gap-4">
            <Link href={'/'} className='flex items-center  hover:bg-green-700 justify-center rounded-full  border-[rgba(0,0,0,1)] w-[40px] h-[40px]'><FaFacebook size={30} /></Link>
          </div>
          <div className="social flex items-center gap-4 ">
            <Link href={'/'} className='flex items-center hover:bg-green-700 justify-center rounded-full  border-[rgba(0,0,0,1)] w-[40px] h-[40px]'><FaInstagram size={30} /></Link>
          </div>
          <Link href={'/'} className='flex items-center hover:bg-green-700 justify-center rounded-full  border-[rgba(0,0,0,1)] w-[40px] h-[40px]'><FaWhatsapp size={30} /></Link>

        </div>

        <div className='flex'>
          <p>2024-Ecomerance website Tamplete</p>
        </div>
        <div className="cards flex  ml-20 items-center  gap-3 ">
          <Image
            src="/cardimages/card2.png"
            alt="Card Image"
            width={50}
            height={50}
          />
          <Image
            src="/cardimages/card3.png"
            alt="Card Image"
            width={50}
            height={50}
          />
          <Image
            src="/cardimages/card11.png"
            alt="Card Image"
            width={50}
            height={50}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer




