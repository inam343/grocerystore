"use client";

import React, { useEffect, useState } from "react";
import Catslider from "@/componant/catslider";
import Homeslider from "@/componant/Homeslider";
import PopularProduct from "@/componant/Popularproduct";
import Banner from "@/componant/banner";
import Productrow from "@/componant/productrow";

const API = "https://server-production-8923.up.railway.app";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${url} → ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [breakfastItems, setBreakfastItems] = useState([]);

  const [loading, setLoading] = useState({
    latest: true,
    featured: true,
    breakfast: true,
  });

  const [errors, setErrors] = useState({
    latest: null,
    featured: null,
    breakfast: null,
  });

  useEffect(() => {
    let isMounted = true;

    fetchJSON(`${API}/api/productrow`)
      .then((data) => {
        if (isMounted) setLatestProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("productrow failed:", err);
        if (isMounted) setErrors((prev) => ({ ...prev, latest: err.message }));
      })
      .finally(() => {
        if (isMounted) setLoading((prev) => ({ ...prev, latest: false }));
      });

    fetchJSON(`${API}/api/featuredproduct`)
      .then((data) => {
        if (isMounted) setFeaturedProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("featuredproduct failed:", err);
        if (isMounted) setErrors((prev) => ({ ...prev, featured: err.message }));
      })
      .finally(() => {
        if (isMounted) setLoading((prev) => ({ ...prev, featured: false }));
      });

    fetchJSON(`${API}/api/breakfast`)
      .then((data) => {
        if (isMounted) setBreakfastItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("breakfast failed:", err);
        if (isMounted) setErrors((prev) => ({ ...prev, breakfast: err.message }));
      })
      .finally(() => {
        if (isMounted) setLoading((prev) => ({ ...prev, breakfast: false }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="slidewraper bg-[#FAFAFA] p-4">
      <Homeslider />
      <Catslider />
      <PopularProduct />
      <Banner />

      {errors.latest ? (
        <p className="text-red-500 text-sm px-2">
          Failed to load latest products: {errors.latest}
        </p>
      ) : (
        <Productrow
          tittle="Latest Product"
          product={latestProducts}
          loading={loading.latest}
        />
      )}

      {errors.featured ? (
        <p className="text-red-500 text-sm px-2">
          Failed to load featured products: {errors.featured}
        </p>
      ) : (
        <Productrow
          tittle="Featured Product"
          product={featuredProducts}
          loading={loading.featured}
        />
      )}

      {errors.breakfast ? (
        <p className="text-red-500 text-sm px-2">
          Failed to load breakfast items: {errors.breakfast}
        </p>
      ) : (
        <Productrow
          tittle="BreakFast & Dairy"
          product={breakfastItems}
          loading={loading.breakfast}
        />
      )}
    </div>
  );
}

