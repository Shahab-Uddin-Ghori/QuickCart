import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Correct useParams import
import { useAds } from "../../Context/AdProvider"; // Use the custom AdProvider context
import { ClipLoader } from "react-spinners"; // For loading spinner

function ProductPurchasedDetails() {
  const { productId } = useParams(); // Extract productId from URL
  const { ads, loading, error } = useAds(); // Fetch ads from the context
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product from the context ads based on the productId
    const selectedProduct = ads.find((ad) => ad.id === productId); // Ensure ad.id matches productId
    if (selectedProduct) {
      setProduct(selectedProduct); // Set the product if found
    }
  }, [ads, productId]); // Re-run if ads or productId changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1aafc2" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Product not found
      </div>
    ); // Display "Product not found" if no match
  }

  return (
    <div className=" py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-contain"
                src={product.imageUrl || "https://via.placeholder.com/400"}
                alt={product.title}
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.title || "Product Name"}
            </h2>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  &nbsp; Rs. {product.price || "0"}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            {/*  */}
            <div className="mr-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Category:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                &nbsp; {product.category || "0"}
              </span>
            </div>
            {/*  */}
            {/*  */}
            <div className="mr-4 my-2">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Brand:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                &nbsp; {product.brand || "0"}
              </span>
            </div>
            {/*  */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Color:
              </span>
              <div className="flex items-center mt-2">
                {product.colors?.map((color, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full mr-2`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Size:
              </span>
              <div className="flex items-center mt-2">
                {product.sizes?.map((size, index) => (
                  <button
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description ||
                  "Detailed product description goes here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPurchasedDetails;
