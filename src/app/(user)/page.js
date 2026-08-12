"use client";

import React, { useEffect, useState } from "react";
import Catslider from "@/componant/catslider";
import Homeslider from "@/componant/Homeslider";
import PopularProduct from "@/componant/Popularproduct";
import Banner from "@/componant/banner";
import Productrow from "@/componant/productrow";

const API = "https://server-production-5112.up.railway.app";

export default function Home() {
  const [latestProducts,   setLatestProducts]   = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [breakfastItems,   setBreakfastItems]   = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/productrow`).then((r) => r.json()),
      fetch(`${API}/api/featuredproduct`).then((r) => r.json()),
      fetch(`${API}/api/breakfast`).then((r) => r.json()),
    ])
      .then(([latestData, featuredData, breakfastData]) => {
        setLatestProducts(latestData);
        setFeaturedProducts(featuredData);
        setBreakfastItems(breakfastData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="slidewraper bg-[#FAFAFA] p-4">
      <Homeslider />
      <Catslider />
      <PopularProduct />
      <Banner />

      <Productrow tittle="Latest Product"    product={latestProducts}   />
      <Productrow tittle="Featured Product"  product={featuredProducts} />
      <Productrow tittle="BreakFast & Dairy" product={breakfastItems}   />
    </div>
  );
}
