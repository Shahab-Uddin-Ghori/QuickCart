import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAds } from "../../Context/AdProvider"; // Use the custom hook here
import { ClipLoader } from "react-spinners"; // Import ClipLoader

function Allproducts() {
  const { ads, brands, loading, error } = useAds(); // Use the custom hook
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Added price range state
  const navigate = useNavigate();

  useEffect(() => {
    // Filter ads whenever selectedBrand, searchTerm, selectedCategory, or priceRange changes
    const filtered = ads.filter((ad) => {
      const matchesBrand = selectedBrand ? ad.brand === selectedBrand : true;
      const matchesSearchTerm = ad.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || ad.category === selectedCategory;
      const matchesPrice =
        ad.price >= priceRange[0] && ad.price <= priceRange[1];

      return (
        matchesBrand && matchesSearchTerm && matchesCategory && matchesPrice
      );
    });
    setFilteredProducts(filtered);
  }, [selectedBrand, searchTerm, ads, selectedCategory, priceRange]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1aafc2" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  // Categories to be displayed as buttons
  const categories = [...new Set(ads.map((ad) => ad.category))]; // Extract unique categories

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-4 items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Central heading */}
        <div className="flex items-center justify-center w-1/3">
          <h1 className="text-2xl font-bold text-blue-600 uppercase tracking-wide">
            Explore Products
          </h1>
        </div>

        <button
          onClick={() => {
            setSelectedBrand(null);
            setPriceRange([0, 10000]); // Reset price filter on clear
          }}
          className="text-white rounded px-4 py-2"
          style={{ backgroundColor: "#45B6FF" }} // Updated color
        >
          Clear Filter
        </button>
      </div>

      <div className="flex justify-start p-4 space-x-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className="bg-gray-200 rounded px-4 py-2"
        >
          All Categories
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className="bg-gray-200 rounded px-4 py-2"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        {/* Sidebar for brand and price filters */}
        <aside className="w-1/5 bg-gray-100 p-4 rounded-lg shadow-md h-full">
          <h2 className="font-bold text-lg mb-4">Filter by Brand</h2>
          <select
            value={selectedBrand || ""}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select a brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Filter by Price Range */}
          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2">Filter by Price</h2>
            <div className="flex space-x-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="border p-2 rounded w-1/2"
              />
            </div>
            <button
              onClick={() => setPriceRange([0, 100000000])} // Reset button for price range
              className="text-white rounded px-4 py-2 w-full"
              style={{ backgroundColor: "#45B6FF" }} // Updated color
            >
              Reset Price Filter
            </button>
          </div>
        </aside>

        {/* Main product section */}
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="relative h-40 overflow-hidden rounded-t-lg">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h5 className="mb-2 text-lg font-semibold">{product.title}</h5>
                <p className="mb-2 text-gray-600">{product.description}</p>
                <p className="mb-2 text-gray-800 font-bold">
                  Rs. {product.price}
                </p>{" "}
                {/* Changed to Rs. */}
                <button
                  onClick={() =>
                    navigate(`/ProductPurchasedDetails/${product.id}`)
                  }
                  className="mt-2 w-full py-2 text-white rounded-lg transition duration-300 hover:bg-blue-700"
                  style={{ backgroundColor: "#45B6FF" }} // Updated color
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Allproducts;
