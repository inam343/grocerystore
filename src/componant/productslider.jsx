"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import Productitem from "./productitems";

const Productslider = ({ products }) => {
  return (
    <div className="py-3">
      <Swiper
        spaceBetween={10}
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
            slidesPerView: 2,
          },
          // Laptops
          1024: {
            slidesPerView: 5,
          },
          // Large screens
          1280: {
            slidesPerView: 7,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product._id || product.id}
            className="py-3 px-2"
          >
            <Productitem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Productslider;