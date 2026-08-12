"use client";

import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

// All product collections with their API endpoints and display labels
const COLLECTIONS = [
  { key: "popular",  label: "Popular Product",   endpoint: `${API_BASE}/api/productslider`    },
  { key: "latest",   label: "Latest Product",     endpoint: `${API_BASE}/api/productrow`       },
  { key: "featured", label: "Feature Product",    endpoint: `${API_BASE}/api/featuredproduct`  },
  { key: "breakfast",label: "BreakFast & Dairy",  endpoint: `${API_BASE}/api/breakfast`        },
];

export default function ProductsPage() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [filterCat, setFilterCat]   = useState("all");

  // Edit modal
  const [editItem, setEditItem]     = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [editImage, setEditImage]   = useState(null);
  const [saving, setSaving]         = useState(false);

  // ── Fetch all collections in parallel ──────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        COLLECTIONS.map((col) =>
          fetch(col.endpoint)
            .then((r) => r.json())
            .then((data) =>
              data.map((item) => ({
                ...item,
                _collectionKey:      col.key,
                _collectionLabel:    col.label,
                _collectionEndpoint: col.endpoint,
              }))
            )
        )
      );
      setProducts(results.flat());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Delete ──────────────────────────────────────────────────────────────
  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      const res = await fetch(`${product._collectionEndpoint}/${product._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ── Edit ────────────────────────────────────────────────────────────────
  const openEdit = (item) => {
    setEditItem(item);
    setEditForm({
      name:     item.name     || "",
      brand:    item.brand    || "",
      price:    item.price    || "",
      oldPrice: item.oldPrice || "",
      rating:   item.rating   || "",
    });
    setEditImage(null);
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([k, v]) => {
        if (v !== "" && v !== undefined) formData.append(k, v);
      });
      if (editImage) formData.append("image", editImage);

      const res = await fetch(`${editItem._collectionEndpoint}/${editItem._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editItem._id
            ? {
                ...updated,
                _collectionKey:      editItem._collectionKey,
                _collectionLabel:    editItem._collectionLabel,
                _collectionEndpoint: editItem._collectionEndpoint,
              }
            : p
        )
      );
      setEditItem(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Filter + search ─────────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchesCat  = filterCat === "all" || p._collectionKey === filterCat;
    const matchesSearch = (p.name || "").toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // ── Image helper ────────────────────────────────────────────────────────
  const getImgSrc = (image) => {
    if (!image) return "/productitems/image3.png";
    if (image.startsWith("/uploads")) return `${API_BASE}${image}`;
    if (image.startsWith("http"))     return image;
    return image; // public-relative path e.g. /productitems/xxx.jpg
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">All Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {loading ? "Loading..." : `${filtered.length} of ${products.length} products`}
          </p>
        </div>
        <Link href="/admin2/addproduct">
          <button className="bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
            + ADD PRODUCT
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap gap-3 justify-between items-end">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Category</label>
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="border rounded-md p-2 text-sm w-40"
            >
              <option value="all">All Categories</option>
              {COLLECTIONS.map((col) => (
                <option key={col.key} value={col.key}>{col.label}</option>
              ))}
            </select>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-56 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading all products...</div>
        ) : error ? (
          <div className="p-10 text-center text-red-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No products found.</div>
        ) : (
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">PRODUCT</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">CATEGORY</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">BRAND</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">PRICE</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">OLD PRICE</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">RATING</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={`${product._collectionKey}-${product._id}`} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImgSrc(product.image)}
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border flex-shrink-0"
                        onError={(e) => { e.target.src = "/productitems/image3.png"; }}
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">ID: #{product._id?.toString().slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 whitespace-nowrap">
                      {product._collectionLabel}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{product.brand || "—"}</td>
                  <td className="p-3 sm:p-4 font-semibold text-gray-800 text-xs sm:text-sm">
                    {product.price ? `$${product.price}` : "—"}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-400 line-through text-xs sm:text-sm">
                    {product.oldPrice ? `$${product.oldPrice}` : "—"}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">
                    {product.rating ? `⭐ ${product.rating}` : "—"}
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors"
                        title="Edit"
                      >
                        <MdEdit size={17} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete"
                      >
                        <MdDelete size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
                <span className="text-xs text-emerald-600 font-medium">{editItem._collectionLabel}</span>
              </div>
              <button
                onClick={() => setEditItem(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: "Name",           key: "name",     type: "text"   },
                { label: "Brand",          key: "brand",    type: "text"   },
                { label: "Price",          key: "price",    type: "number" },
                { label: "Old Price",      key: "oldPrice", type: "number" },
                { label: "Rating (0–5)",   key: "rating",   type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={editForm[key]}
                    onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Image <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  className="text-sm text-gray-500"
                />
                {editItem.image && !editImage && (
                  <p className="text-xs text-gray-400 mt-1 truncate">Current: {editItem.image}</p>
                )}
                {editImage && (
                  <img
                    src={URL.createObjectURL(editImage)}
                    alt="preview"
                    className="mt-2 h-20 object-contain rounded border"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => setEditItem(null)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
