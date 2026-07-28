"use client";

import React, { useEffect, useState } from "react";
import Catslider from "@/componant/catslider";
import Homeslider from "@/componant/Homeslider";
import PopularProduct from "@/componant/Popularproduct";
import Banner from "@/componant/banner";
import Productrow from "@/componant/productrow";

import featureproduct from "./data/featureproduct";
import breakfast from "./data/breakfast";

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featredProduct, setfeaturedProducts] = useState([]);
  const [breakfast, setbreakfast] = useState([]);

 useEffect(() => {
  Promise.all([
    fetch("http://localhost:5000/api/productrow").then((res) => res.json()),
    fetch("http://localhost:5000/api/featuredproduct").then((res) => res.json()),
    fetch("https://server-production-5112.up.railway.app/api/breakfast").then((res) => res.json())
  ])
    .then(([latestData, featuredData, breakfastData]) => {
      setLatestProducts(latestData);
      setfeaturedProducts(featuredData);
      setbreakfast(breakfastData);
    })
    .catch((err) => console.log(err));
}, []);


  return (
    <div className="slidewraper bg-[#FAFAFA] p-4">
      <Homeslider />
      <Catslider />
      <PopularProduct />
      <Banner />

      {/* First ProductRow uses API data */}
      <Productrow
        tittle="Latest Product"
        product={latestProducts}
      />

      {/* These still use local data */}
      <Productrow
        tittle="Featured Product"
        product={featredProduct}
      />

      <Productrow
        tittle="BreakFast & Dairy"
        product={breakfast}
      />
    </div>
  );
}