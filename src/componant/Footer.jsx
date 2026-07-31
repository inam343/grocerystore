import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { PiKeyReturnLight } from 'react-icons/pi'
import { IoWalletOutline } from "react-icons/io5";
import { CiGift, CiHeadphones } from "react-icons/ci";
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <footer className='bg-[#eeeded]'>

      {/* ── Feature icons ── */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 py-6 px-5 sm:px-10 md:px-16'>
        {[
          { icon: <LiaShippingFastSolid className='text-3xl sm:text-4xl transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-1' />, title: 'Free Shipping', sub: 'For Orders Over $100' },
          { icon: <PiKeyReturnLight className='text-3xl sm:text-4xl transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-1' />, title: '30 Days Return', sub: 'For an Exchange' },
          { icon: <IoWalletOutline className='text-3xl sm:text-4xl transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-1' />, title: 'Secured Payment', sub: 'Card Accepted' },
          { icon: <CiGift className='text-3xl sm:text-4xl transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-1' />, title: 'Free Gift', sub: 'For Exchange Product' },
          { icon: <CiHeadphones className='text-3xl sm:text-4xl transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-1' />, title: 'Support 24/7', sub: 'Contact Us Anytime', extra: 'col-span-2 sm:col-span-1' },
        ].map(({ icon, title, sub, extra }) => (
          <div key={title} className={`flex items-center justify-center flex-col group cursor-pointer py-4 ${extra || ''}`}>
            {icon}
            <h3 className='text-xs sm:text-sm font-semibold mt-2 text-center text-gray-700'>{title}</h3>
            <p className='text-xs text-gray-500 text-center mt-0.5'>{sub}</p>
          </div>
        ))}
      </div>

      <hr className='border-gray-300 mx-5 sm:mx-10' />

      {/* ── Main links area ── */}
      <div className='px-5 sm:px-10 md:px-16 py-8 flex flex-col gap-8'>

        {/* 3 columns — always side by side */}
        <div className='grid grid-cols-3 gap-4 sm:gap-10'>

          {/* Contact Us */}
          <div>
            <h3 className='text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300'>
              Contact Us
            </h3>
            <div className='flex flex-col gap-1.5'>
              <p className='text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed font-medium'>
                Classy Shop<br />Mega Super Store<br />507-Union Trade Center
              </p>
              <Link
                href="mailto:inamtariqsatti@gmail.com"
                className='text-[10px] sm:text-xs md:text-sm text-gray-500 hover:text-green-500 transition-colors break-all mt-1'
              >
                inamtariqsatti@gmail.com
              </Link>
              <span className='text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700'>
                (+92) 3241929583
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className='text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300'>
              Products
            </h3>
            <ul className='flex flex-col gap-1.5 sm:gap-2'>
              {['Price Drop', 'New Price', 'Best Sales', 'Contact Us', 'Sitemap', 'Stores'].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className='text-[11px] sm:text-xs md:text-sm text-gray-600 hover:text-green-500 transition-colors font-medium'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className='text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300'>
              Our Company
            </h3>
            <ul className='flex flex-col gap-1.5 sm:gap-2'>
              {['Delivery', 'Legal Notice', 'Terms & Conditions', 'About Us', 'Secure Payment', 'Login'].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className='text-[11px] sm:text-xs md:text-sm text-gray-600 hover:text-green-500 transition-colors font-medium'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Subscribe Us — full width below */}
        <div className='border-t border-gray-300 pt-6'>
          <h3 className='text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2'>
            Subscribe Us
          </h3>
          <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6'>
            <p className='text-xs sm:text-sm text-gray-500 sm:max-w-[280px] leading-relaxed'>
              Subscribe to our latest newsletter for special discounts and offers.
            </p>
            <form className='flex flex-col sm:flex-row flex-1 gap-2'>
              <input
                type="email"
                placeholder='Enter your email address'
                className='flex-1 w-full h-12 rounded-lg px-4 bg-white border border-gray-300 outline-none text-sm focus:border-green-500 transition-colors'
              />
              <button className='w-full sm:w-auto h-12 px-5 bg-[#02B290] hover:bg-[#029070] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap'>
                Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className='border-t border-gray-300 py-4 px-5 sm:px-10 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-3'>

        {/* Social */}
        <div className='flex items-center gap-3'>
          <Link href='/' className='w-9 h-9 flex items-center justify-center rounded-full hover:text-green-600 transition-colors text-gray-700'>
            <FaFacebook size={22} />
          </Link>
          <Link href='/' className='w-9 h-9 flex items-center justify-center rounded-full hover:text-green-600 transition-colors text-gray-700'>
            <FaInstagram size={22} />
          </Link>
          <Link href='/' className='w-9 h-9 flex items-center justify-center rounded-full hover:text-green-600 transition-colors text-gray-700'>
            <FaWhatsapp size={22} />
          </Link>
        </div>

        <p className='text-xs text-gray-500 text-center'>
          © 2024 Ecommerce Website Template
        </p>

        {/* Payment cards */}
        <div className='flex items-center gap-2'>
          <Image src="/cardimages/card2.png" alt="Card" width={42} height={28} className='object-contain' />
          <Image src="/cardimages/card3.png" alt="Card" width={42} height={28} className='object-contain' />
          <Image src="/cardimages/card11.png" alt="Card" width={42} height={28} className='object-contain' />
        </div>

      </div>

    </footer>
  );
}

export default Footer;
