import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import admproducts from '@/app/(users)/data/admproduct';

export default function UsersTable() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Users</h1>
        <button className="bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
          + ADD USER
        </button>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap gap-3 justify-between items-center">
        <p className="text-sm text-gray-500">{admproducts.length} users found</p>
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-md p-2 w-full sm:w-56 text-sm"
        />
      </div>

      {/* Table — horizontally scrollable on mobile */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[540px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">USER</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">CONTACT</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">CATEGORY</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">JOINED</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {admproducts.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">user{user.id}@example.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                  +1 555-000-{String(user.id).padStart(4, '0')}
                </td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{user.category}</td>
                <td className="p-3 sm:p-4 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                  Jan {user.id}, 2024
                </td>
                <td className="p-3 sm:p-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                      <MdEdit size={17} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors">
                      <MdDelete size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
