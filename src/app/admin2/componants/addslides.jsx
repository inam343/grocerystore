"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

const SLIDE_ENDPOINTS = {
  homeslide: `${API_BASE}/api/productslider`,
  homebanner: `${API_BASE}/api/categories`,
};

const Addslides = () => {
  const router = useRouter();
  const fileRef = useRef(null);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

    if (!category) return setErrorMsg("Please select a category.");
    if (!imageFile) return setErrorMsg("Please upload an image.");

    const endpoint = SLIDE_ENDPOINTS[category];
    if (!endpoint) return setErrorMsg("Unknown category.");

    setLoading(true);
    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      formData.append("image", imageFile);

      const res = await fetch(endpoint, { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to publish slide");
      }

      setSuccessMsg("Slide published successfully!");
      setCategory("");
      setName("");
      setImageFile(null);
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = "";

      setTimeout(() => {
        router.push(category === "homeslide" ? "/admin2/homeslides" : "/admin2/homeBanner");
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add Slide</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new slide to your store</p>
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
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5"
        >

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Slide Type *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Type</option>
              <option value="homeslide">Home Slides</option>
              <option value="homebanner">Home Banner</option>
            </select>
          </div>

          {/* Optional name */}
          <div>
            <label htmlFor="slideName" className="block text-sm font-medium text-gray-700 mb-2">
              Slide Name (optional)
            </label>
            <input
              id="slideName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Sale Banner"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Image */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">Slide Image *</h2>
            <p className="text-sm text-gray-500 mb-3">Upload the image for this slide.</p>
            <label
              htmlFor="slideImage"
              className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition overflow-hidden"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
              ) : (
                <div className="text-center">
                  <div className="text-4xl text-gray-400 mb-2">+</div>
                  <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</p>
                </div>
              )}
              <input
                ref={fileRef}
                id="slideImage"
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
              type="button"
              onClick={() => {
                setCategory("");
                setName("");
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
              {loading ? "Publishing..." : "Publish Slide"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Addslides;
