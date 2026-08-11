import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const users = [
  { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'Customer', status: 'Active' },
  { id: 3, username: 'bob_jones', email: 'bob@example.com', role: 'Customer', status: 'Inactive' },
  { id: 4, username: 'alice_k', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 5, username: 'charlie_b', email: 'charlie@example.com', role: 'Customer', status: 'Inactive' },
];

export default function UsersTable(props) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">{props.title || 'Users'}</h1>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap gap-3 justify-between items-end">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-md p-2 w-full sm:w-56 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">#</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">USERNAME</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">EMAIL</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ROLE</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">STATUS</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 sm:p-4 text-gray-500 text-xs sm:text-sm">{user.id}</td>
                <td className="p-3 sm:p-4 font-semibold text-gray-800 text-xs sm:text-sm">{user.username}</td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{user.email}</td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{user.role}</td>
                <td className="p-3 sm:p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
                    ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {user.status}
                  </span>
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
