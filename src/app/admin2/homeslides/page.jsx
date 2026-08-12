"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE } from "@/lib/api";

const HomeSlides = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit state
  const [editSlide, setEditSlide] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchSlides = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/productslider`);
      if (!res.ok) throw new Error("Failed to fetch slides");
      const data = await res.json();
      setSlides(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlides(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this slide?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/productslider/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSlides((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const openEdit = (slide) => {
    setEditSlide(slide);
    setEditName(slide.name || "");
    setEditImage(null);
    setEditPreview(null);
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (editName) formData.append("name", editName);
      if (editImage) formData.append("image", editImage);

      const res = await fetch(`${API_BASE}/api/productslider/${editSlide._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setSlides((prev) => prev.map((s) => (s._id === editSlide._id ? updated : s)));
      setEditSlide(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const getImgSrc = (slide) => {
    if (!slide.image) return "/slide1.png";
    // Legacy /uploads path → served from backend (old data before this fix)
    if (slide.image.startsWith("/uploads")) return `${API_BASE}${slide.image}`;
    // Full URL
    if (slide.image.startsWith("http")) return slide.image;
    // Public-relative path like /productitems/... or /catimages/... → works directly
    return slide.image;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Home Slides</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the slides displayed on your homepage.
          </p>
        </div>
        <Link href="/admin2/addslides">
          <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold shadow-sm transition">
            + Add New Slide
          </button>
        </Link>
      </div>

      {loading && <p className="text-gray-400 text-center py-10">Loading...</p>}
      {error && <p className="text-red-400 text-center py-10">{error}</p>}

      {!loading && !error && slides.length === 0 && (
        <p className="text-gray-400 text-center py-10">No slides yet. Add one!</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={getImgSrc(slide)}
                alt={slide.name || "Slide"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-800 mb-3 truncate">
                {slide.name || "Untitled Slide"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(slide)}
                  className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slide._id)}
                  className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editSlide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Slide</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) { setEditImage(f); setEditPreview(URL.createObjectURL(f)); }
                  }}
                  className="text-sm text-gray-500"
                />
                {editPreview && (
                  <img src={editPreview} alt="preview" className="mt-2 h-24 object-contain rounded" />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-5 justify-end">
              <button
                onClick={() => setEditSlide(null)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSlides;
