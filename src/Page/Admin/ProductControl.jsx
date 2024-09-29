import React, { useState } from "react";

function ProductControl() {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    discount: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    // Upload logic here (Firebase Storage and Firestore)
    console.log("Form submitted:", formData, imageFile);
    // After upload, reset the form and uploading state
    setUploading(false);
    setFormData({
      title: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      discount: "",
      imageUrl: "",
    });
    setImageFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl text-gray-700 font-bold mb-2">
          Upload Product
        </h2>

        {/* Product Image Section */}
        <div className="flex justify-center mb-4">
          <label className="relative cursor-pointer">
            <img
              src={formData.imageUrl || "placeholder.jpg"}
              alt="Product"
              className="h-32 w-32 rounded border border-gray-300 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter product brand"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Enter discount percentage"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all duration-300"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductControl;
