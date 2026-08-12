"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { API_BASE } from "@/lib/api";

export default function UsersTable({ title }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
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
      (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">{title || "Users"}</h1>
        <span className="text-sm text-gray-400">{filtered.length} users</span>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap gap-3 justify-between items-end">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-56 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading users...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No users found.</div>
        ) : (
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">#</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">USERNAME</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">EMAIL</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">JOINED</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, idx) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 sm:p-4 text-gray-500 text-xs sm:text-sm">{idx + 1}</td>
                  <td className="p-3 sm:p-4 font-semibold text-gray-800 text-xs sm:text-sm">
                    {user.username}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{user.email}</td>
                  <td className="p-3 sm:p-4 text-gray-400 text-xs sm:text-sm">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 sm:p-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                      title="Delete user"
                    >
                      <MdDelete size={17} />
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
