
import React from "react";

const Addproduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Add Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add a new product to your store
          </p>
        </div>

        {/* Form */}
        <form
          action="#"
          method="POST"
          encType="multipart/form-data"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >

          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Product Information
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Enter the basic information about your product.
            </p>

            {/* Product Name */}
            <div className="mb-5">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name
              </label>

              <input
                id="productName"
                name="productName"
                type="text"
                placeholder="Enter product name"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Write product description..."
                className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Brand */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Brand
                </label>

                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Brand"
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">Select Category</option>
                  <option value="grocery">Top Catagory</option>
                  <option value="breakfast">Poplar Product</option>
                  <option value="beverages">Latest Product</option>
                  <option value="snacks">Feature Prodct</option>
                  <option value="snacks">BreakFast & Dairy</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Old Price */}
              <div>
                <label
                  htmlFor="oldPrice"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Old Price
                </label>

                <input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  placeholder="0.00"
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Stock
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="0"
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Product Images
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Upload the main image of your product.
            </p>

            <label
              htmlFor="productImage"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
            >
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">
                  +
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Click to upload product image
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG or JPEG
                </p>
              </div>

              <input
                id="productImage"
                name="productImage"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">

            <button
              type="reset"
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-7 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-md hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg transition"
            >
              Publish Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Addproduct;
