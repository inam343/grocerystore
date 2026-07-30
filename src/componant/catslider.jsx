"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Catlink from "./Catlink";

import { Navigation } from 'swiper/modules';
import Image from "next/image";

const Catslider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (

    <div className="py-3">
      <div className=" text-[25px] f0nt-[900]  mt-3 text-gray-700">
        <h1 className="text-[20px] text-gray-800 font-[800]">Top catagories</h1>
      </div>
      <div className="mx-auto w-[96%]">


        <Swiper
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            // Mobile
            0: {
              slidesPerView: 2,
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
              slidesPerView: 5,
            },
            // Large screens
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {categories.map((cproduct) => (
            <SwiperSlide key={cproduct._id} className="py-3 px-2">
              <Catlink cproduct={cproduct} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Catslider