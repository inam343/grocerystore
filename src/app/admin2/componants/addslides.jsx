"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { API_BASE } from "@/lib/api";

const SLIDE_ENDPOINTS = {
  homeslide:  `${API_BASE}/api/productslider`,
  homebanner: `${API_BASE}/api/categories`,
};

const Addslides = () => {
  const router  = useRouter();
  const fileRef = useRef(null);

  const [category, setCategory]       = useState("");
  const [name, setName]               = useState("");
  const [imageFile, setImageFile]     = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [successMsg, setSuccessMsg]   = useState("");
  const [errorMsg, setErrorMsg]       = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const reset = () => {
    setCategory(""); setName(""); setImageFile(null); setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setErrorMsg(""); setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg(""); setErrorMsg("");
    if (!category) return setErrorMsg("Please select a slide type.");
    if (!imageFile) return setErrorMsg("Please upload an image.");
    const endpoint = SLIDE_ENDPOINTS[category];
    if (!endpoint) return setErrorMsg("Unknown type selected.");
    setLoading(true);
    try {
      const fd = new FormData();
      if (name) fd.append("name", name);
      fd.append("image", imageFile);
      const res = await fetch(endpoint, { method: "POST", body: fd });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed"); }
      setSuccessMsg("Slide published successfully!");
      reset();
      setTimeout(() => router.push(category === "homeslide" ? "/admin2/homeslides" : "/admin2/homeBanner"), 1500);
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Add Slide</h1>
        <p className="text-sm text-gray-400 mt-1">Upload a new banner or homepage slide</p>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-4 pb-3 border-b border-gray-50">Slide Information</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Slide Type *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                  <option value="">Select type…</option>
                  <option value="homeslide">🖼️ Home Slide</option>
                  <option value="homebanner">📢 Home Banner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Slide Name (optional)</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Summer Sale 2025" className={inputCls} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={reset}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors">
              Reset
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-60 flex items-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Publishing…</>
              ) : "Publish Slide"}
            </button>
          </div>
        </form>

        {/* Image upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-sm font-bold text-gray-700 mb-4 pb-3 border-b border-gray-50">Slide Image *</h2>

          <label htmlFor="slideImage"
            className={`flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
              ${imagePreview ? "border-emerald-300 bg-emerald-50/30" : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/20"}`}
            style={{ minHeight: "200px" }}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full object-contain max-h-[200px] p-3" />
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <FiUploadCloud size={26} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</p>
                </div>
              </div>
            )}
            <input ref={fileRef} id="slideImage" name="image" type="file"
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

export default Addslides;
