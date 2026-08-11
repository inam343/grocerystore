import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import admproducts from '@/app/(users)/data/admproduct';
import Link from 'next/link';

export default function ProductTable(props) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">{props.tittle || 'Products'}</h1>
        <Link href="/admin2/addproduct">
          <button className="bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
            + ADD PRODUCT
          </button>
        </Link>
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap gap-3 justify-between items-end">
        <div className="flex gap-3 flex-wrap">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-600">Category</label>
            <select className="border rounded-md p-2 w-36 sm:w-48 text-sm">
              <option>All</option>
              <option>Mobile</option>
              <option>Laptop</option>
              <option>Headphones</option>
              <option>Watch</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-600">Stock</label>
            <select className="border rounded-md p-2 w-36 sm:w-48 text-sm">
              <option>All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-md p-2 w-full sm:w-56 text-sm"
        />
      </div>

      {/* Table — horizontally scrollable on mobile */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">PRODUCT</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">CATEGORY</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">PRICE</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">SALES</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">STOCK</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-600">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {admproducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/productitems/image3.png"
                      alt={product.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm">{product.name}</p>
                      <p className="text-xs text-gray-400">ID: #{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{product.category}</td>
                <td className="p-3 sm:p-4 font-semibold text-gray-800 text-xs sm:text-sm">{product.price}</td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">{product.sales}</td>
                <td className="p-3 sm:p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
                    ${product.stock === 'In Stock'  ? 'bg-green-100 text-green-700' :
                      product.stock === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                                                      'bg-red-100 text-red-600'}`}>
                    {product.stock}
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
