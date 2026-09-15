"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiSearch, FiUsers } from "react-icons/fi";
import { API_BASE } from "@/lib/api";

export default function UsersTable({ title }) {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [search, setSearch]   = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API_BASE}/api/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API_BASE}/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filtered = users.filter(
    (u) =>
      (u.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email    || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiUsers className="text-violet-500" size={26} />
            {title || "All Users"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {loading ? "Loading…" : `${filtered.length} registered user${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Summary pill */}
        <div className="flex items-center gap-3">
          <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-2 text-center">
            <p className="text-xl font-extrabold text-violet-700">{users.length}</p>
            <p className="text-[10px] text-violet-400 font-semibold uppercase tracking-wide">Total</p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
        <div className="relative max-w-xs">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search by username or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-violet-400 bg-gray-50 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading users…</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FiUsers size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No users found.</p>
          </div>
        ) : (
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-left py-3.5 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">#</th>
                <th className="text-left py-3.5 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left py-3.5 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="text-left py-3.5 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="text-left py-3.5 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, idx) => (
                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs text-gray-400 font-medium">{idx + 1}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(user.username || "U").charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{user.username}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{user.email}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                  </td>
                  <td className="py-3.5 px-5">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100"
                      title="Delete user"
                    >
                      <MdDelete size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
