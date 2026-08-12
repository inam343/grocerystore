"use client";

import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

// Map sidebar category names → API endpoints
const ENDPOINT_MAP = {
  "Top Catagory": `${API_BASE}/api/categories`,
  "Popular Product": `${API_BASE}/api/productslider`,
  "Latest Product": `${API_BASE}/api/productrow`,
  "Feature Product": `${API_BASE}/api/featuredproduct`,
  "BreakFast & Dairy": `${API_BASE}/api/breakfast`,
  Product: `${API_BASE}/api/productrow`, // default fallback
};

function getEndpoint(title) {
  return ENDPOINT_MAP[title] || `${API_BASE}/api/productrow`;
}

export default function ProductTable({ tittle }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Edit modal state
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const endpoint = getEndpoint(tittle);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tittle]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setEditForm({
      name: item.name || "",
      brand: item.brand || "",
      price: item.price || "",
      oldPrice: item.oldPrice || "",
      rating: item.rating || "",
    });
    setEditImage(null);
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const id = editItem._id || editItem.id;
      const formData = new FormData();
      Object.entries(editForm).forEach(([k, v]) => {
        if (v !== "" && v !== undefined) formData.append(k, v);
      });
      if (editImage) formData.append("image", editImage);

      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => ((p._id || p.id) === id ? updated : p))
      );
      setEditItem(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          {tittle || "Products"}
        </h1>
        <Link href="/admin2/addproduct">
          <button className="bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
            + ADD PRODUCT
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap gap-3 justify-between items-end">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-56 text-sm"
        />
        <span className="text-sm text-gray-400">{filtered.length} items</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No products found.</div>
        ) : (
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">PRODUCT</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">BRAND</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">PRICE</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">OLD PRICE</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">RATING</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const id = product._id || product.id;
                const imgSrc = product.image
                  ? product.image.startsWith("/uploads")
                    ? `${API_BASE}${product.image}`
                    : product.image.startsWith("http")
                    ? product.image
                    : `/productitems/${product.image}`
                  : "/productitems/image3.png";

                return (
                  <tr key={id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imgSrc}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border flex-shrink-0"
                          onError={(e) => { e.target.src = "/productitems/image3.png"; }}
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm">{product.name}</p>
                          <p className="text-xs text-gray-400">ID: #{id?.toString().slice(-6)}</p>
                        </div>
                      </div>
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
                          onClick={() => handleDelete(id)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete"
                        >
                          <MdDelete size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Edit Product</h2>

            <div className="space-y-4">
              {[
                { label: "Name", key: "name", type: "text" },
                { label: "Brand", key: "brand", type: "text" },
                { label: "Price", key: "price", type: "number" },
                { label: "Old Price", key: "oldPrice", type: "number" },
                { label: "Rating (0-5)", key: "rating", type: "number" },
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  className="text-sm text-gray-500"
                />
                {editItem.image && !editImage && (
                  <p className="text-xs text-gray-400 mt-1">Current: {editItem.image}</p>
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
