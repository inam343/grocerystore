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
    fetch("http://localhost:5000/api/productslider")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-white py-4">
      <div>
        <div className="flex items-center justify-between">
          <div className="col1 w-[30%]">
            <h2 className="text-[20px] text-gray-800 font-[800]">
              Popular Products
            </h2>
            <p>Don't miss the offers</p>
          </div>

          <div className="col2 width-[70%] flex items-center justify-end">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Frozen Foods" />
              <Tab label="Breads" />
              <Tab label="Vegetables" />
              <Tab label="Fruits" />
            </Tabs>
          </div>
        </div>

        <Productslider products={products} />
      </div>
    </section>
  );
};

export default PopularProduct;