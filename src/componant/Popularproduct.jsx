"use client";

import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Productslider from "./productslider";

const PopularProduct = () => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch("https://server-production-5112.up.railway.app/api/productslider")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-white py-4 px-2 sm:px-4">
      <div>
        {/* Header row — stacks on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <div>
            <h2 className="text-[18px] sm:text-[20px] text-gray-800 font-[800]">
              Popular Products
            </h2>
            <p className="text-[13px] text-gray-500">Don't miss the offers</p>
          </div>

          <div className="overflow-x-auto">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ minHeight: '36px' }}
            >
              <Tab label="Frozen Foods" sx={{ fontSize: '12px', minHeight: '36px', padding: '6px 10px' }} />
              <Tab label="Breads" sx={{ fontSize: '12px', minHeight: '36px', padding: '6px 10px' }} />
              <Tab label="Vegetables" sx={{ fontSize: '12px', minHeight: '36px', padding: '6px 10px' }} />
              <Tab label="Fruits" sx={{ fontSize: '12px', minHeight: '36px', padding: '6px 10px' }} />
            </Tabs>
          </div>
        </div>

        <Productslider products={products} />
      </div>
    </section>
  );
};

export default PopularProduct;
