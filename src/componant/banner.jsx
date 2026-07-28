"use client"
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
const Banner = () => {
    return (
        <div className="py-5 bg-white pt-0">
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                 breakpoints={{
    // Mobile
    0: {
      slidesPerView: 1,
    },
    // Small tablets
    640: {
      slidesPerView: 2,
    },
    // Tablets
    768: {
      slidesPerView: 3,
    },
    // Laptops
    1024: {
      slidesPerView: 3,
    },
    // Large screens
    1280: {
      slidesPerView: 3,
    },
  }}
            >
                <SwiperSlide >
                    <Link href="/" className="item group rounded-md overflow-hidden w-full">
                        <div><img src="/banner/bannerimg1.png" alt="banner" className="w-full transition group-hover:scale-105 rounded-md" /></div></Link>
                </SwiperSlide>

                <SwiperSlide >
                    <Link href="/" className="item group rounded-md overflow-hidden w-full">
                        <div><img src="/banner/banerimg2.png" alt="banner" className="w-full transition group-hover:scale-105 rounded-md" /></div></Link>
                </SwiperSlide>

                <SwiperSlide >
                    <Link href="/" className="item group rounded-md overflow-hidden w-full">
                        <div><img src="/banner/banerimg3.png" alt="banner" className="w-full transition group-hover:scale-105 rounded-md" /></div></Link>
                </SwiperSlide>
            </Swiper>

        </div>
    )
}

export default Banner