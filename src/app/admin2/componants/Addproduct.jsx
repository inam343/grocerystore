"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

// Map category labels → API endpoints
const CATEGORY_ENDPOINTS = {
  topcategory: `${API_BASE}/api/categories`,
  popular: `${API_BASE}/api/productslider`,
  latest: `${API_BASE}/api/productrow`,
  featured: `${API_BASE}/api/featuredproduct`,
  breakfast: `${API_BASE}/api/breakfast`,
};

const Addproduct = () => {
  const router = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    oldPrice: "",
    rating: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.name) return setErrorMsg("Product name is required.");
    if (!form.category) return setErrorMsg("Please select a category.");
    if (!imageFile) return setErrorMsg("Please upload a product image.");

    const endpoint = CATEGORY_ENDPOINTS[form.category];
    if (!endpoint) return setErrorMsg("Unknown category selected.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("price", form.price);
      formData.append("oldPrice", form.oldPrice);
      formData.append("rating", form.rating);
      formData.append("image", imageFile);

      const res = await fetch(endpoint, { method: "POST", body: formData });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add product");
      }

      setSuccessMsg("Product published successfully!");
      setForm({ name: "", brand: "", category: "", price: "", oldPrice: "", rating: "" });
      setImageFile(null);
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = "";

      setTimeout(() => router.push("/admin2/products"), 1500);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add Product</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new product to your store</p>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        >

          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Category</option>
              <option value="topcategory">Top Category</option>
              <option value="popular">Popular Product</option>
              <option value="latest">Latest Product</option>
              <option value="featured">Feature Product</option>
              <option value="breakfast">BreakFast &amp; Dairy</option>
            </select>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                id="brand" name="brand" type="text" value={form.brand} onChange={handleChange}
                placeholder="Brand"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                id="price" name="price" type="number" value={form.price} onChange={handleChange}
                placeholder="0.00" min="0" step="0.01"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-2">Old Price</label>
              <input
                id="oldPrice" name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange}
                placeholder="0.00" min="0" step="0.01"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating (0–5)</label>
              <input
                id="rating" name="rating" type="number" value={form.rating} onChange={handleChange}
                placeholder="4.5" min="0" max="5" step="0.1"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">Product Image *</h2>
            <p className="text-sm text-gray-500 mb-3">Upload the main image of your product.</p>

            <label
              htmlFor="productImage"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition overflow-hidden"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
              ) : (
                <div className="text-center">
                  <div className="text-4xl text-gray-400 mb-2">+</div>
                  <p className="text-sm font-medium text-gray-600">Click to upload product image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</p>
                </div>
              )}
              <input
                ref={fileRef}
                id="productImage"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="reset"
              onClick={() => {
                setForm({ name: "", brand: "", category: "", price: "", oldPrice: "", rating: "" });
                setImageFile(null);
                setImagePreview(null);
                if (fileRef.current) fileRef.current.value = "";
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-md hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Addproduct;
