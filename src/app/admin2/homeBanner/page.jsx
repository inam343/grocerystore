"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE } from "@/lib/api";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit state
  const [editBanner, setEditBanner] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch banners");
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this banner?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBanners((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const openEdit = (banner) => {
    setEditBanner(banner);
    setEditName(banner.name || "");
    setEditImage(null);
    setEditPreview(null);
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (editName) formData.append("name", editName);
      if (editImage) formData.append("image", editImage);

      const res = await fetch(`${API_BASE}/api/categories/${editBanner._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setBanners((prev) => prev.map((b) => (b._id === editBanner._id ? updated : b)));
      setEditBanner(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const getImgSrc = (banner) => {
    if (!banner.image) return "/banner/banerimg2.png";
    // Legacy /uploads path → served from backend (old data before this fix)
    if (banner.image.startsWith("/uploads")) return `${API_BASE}${banner.image}`;
    // Full URL
    if (banner.image.startsWith("http")) return banner.image;
    // Public-relative path like /catimages/... → works directly
    return banner.image;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Home Banner</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the banners displayed on your home page.
          </p>
        </div>
        <Link href="/admin2/addslides">
          <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold shadow-sm transition">
            + Add New Banner
          </button>
        </Link>
      </div>

      {loading && <p className="text-gray-400 text-center py-10">Loading...</p>}
      {error && <p className="text-red-400 text-center py-10">{error}</p>}

      {!loading && !error && banners.length === 0 && (
        <p className="text-gray-400 text-center py-10">No banners yet. Add one!</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={getImgSrc(banner)}
                alt={banner.name || "Banner"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-800 mb-3 truncate">
                {banner.name || "Untitled Banner"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(banner)}
                  className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner._id)}
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
      {editBanner && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Banner</h2>

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
                onClick={() => setEditBanner(null)}
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

export default HomeBanner;
