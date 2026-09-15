"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { API_BASE } from "@/lib/api";

const CATEGORY_ENDPOINTS = {
  topcategory: `${API_BASE}/api/categories`,
  popular:     `${API_BASE}/api/productslider`,
  latest:      `${API_BASE}/api/productrow`,
  featured:    `${API_BASE}/api/featuredproduct`,
  breakfast:   `${API_BASE}/api/breakfast`,
};

const CATEGORIES = [
  { value: "topcategory", label: "Top Category",       emoji: "🏷️" },
  { value: "popular",     label: "Popular Product",    emoji: "🔥" },
  { value: "latest",      label: "Latest Product",     emoji: "🆕" },
  { value: "featured",    label: "Feature Product",    emoji: "⭐" },
  { value: "breakfast",   label: "Breakfast & Dairy",  emoji: "🥛" },
];

const Addproduct = () => {
  const router  = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState({ name: "", brand: "", category: "", price: "", oldPrice: "", rating: "" });
  const [imageFile, setImageFile]     = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [successMsg, setSuccessMsg]   = useState("");
  const [errorMsg, setErrorMsg]       = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const reset = () => {
    setForm({ name: "", brand: "", category: "", price: "", oldPrice: "", rating: "" });
    setImageFile(null); setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setErrorMsg(""); setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg(""); setErrorMsg("");
    if (!form.name)     return setErrorMsg("Product name is required.");
    if (!form.category) return setErrorMsg("Please select a category.");
    if (!imageFile)     return setErrorMsg("Please upload a product image.");
    const endpoint = CATEGORY_ENDPOINTS[form.category];
    if (!endpoint)      return setErrorMsg("Unknown category selected.");
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (k !== "category") fd.append(k, v); });
      fd.append("image", imageFile);
      const res  = await fetch(endpoint, { method: "POST", body: fd });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed"); }
      setSuccessMsg("Product published successfully!");
      reset();
      setTimeout(() => router.push("/admin2/products"), 1500);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Add Product</h1>
        <p className="text-sm text-gray-400 mt-1">Publish a new product to your store</p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-5 text-sm font-medium">
          <FiCheckCircle size={16} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm font-medium">
          <FiAlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

        {/* Left: form fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-4 pb-3 border-b border-gray-50">Product Information</h2>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Product Name *</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Fresh Organic Apples" className={inputCls} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                  <option value="">Select a category…</option>
                  {CATEGORIES.map(({ value, label, emoji }) => (
                    <option key={value} value={value}>{emoji} {label}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Brand</label>
                <input name="brand" type="text" value={form.brand} onChange={handleChange} placeholder="e.g. Fresh Farm" className={inputCls} />
              </div>

              {/* Price row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Price ($)</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0.00" min="0" step="0.01" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Old Price ($)</label>
                  <input name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} placeholder="0.00" min="0" step="0.01" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Rating (0–5)</label>
                  <input name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="4.5" min="0" max="5" step="0.1" className={inputCls} />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={reset}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors">
              Reset
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-60 flex items-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Publishing…</>
              ) : "Publish Product"}
            </button>
          </div>
        </form>

        {/* Right: image upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-sm font-bold text-gray-700 mb-4 pb-3 border-b border-gray-50">Product Image *</h2>

          <label
            htmlFor="productImage"
            className={`flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
              ${imagePreview ? "border-emerald-300 bg-emerald-50/30" : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/20"}`}
            style={{ minHeight: "220px" }}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain max-h-[220px] p-3" />
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <FiUploadCloud size={26} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</p>
                </div>
              </div>
            )}
            <input ref={fileRef} id="productImage" name="image" type="file"
              accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} className="hidden" />
          </label>

          {imageFile && (
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
              <span className="truncate font-medium">{imageFile.name}</span>
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                className="text-red-400 hover:text-red-600 ml-2 flex-shrink-0">✕</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Addproduct;
