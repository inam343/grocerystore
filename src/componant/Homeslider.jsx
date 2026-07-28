"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

const Homeslider = () => {
    return (
        <div className='homeslider'>
            <div className='mx-auto w-[96%]'>
                <Swiper navigation={true}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper">
                    <SwiperSlide>
                        <div className='item'>
                            <Image src={"/slide1.png"} alt='slide1' width={1344} height={514} className='w-full bg-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                            <Image src={"/slide1.png"} alt='slide1' width={1344} height={514} className='w-full bg-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                            <Image src={"/slide1.png"} alt='slide1' width={1344} height={514} className='w-full bg-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                            <Image src={"/slide1.png"} alt='slide1' width={1344} height={514} className='w-full bg-cover' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )

}
export default Homeslider