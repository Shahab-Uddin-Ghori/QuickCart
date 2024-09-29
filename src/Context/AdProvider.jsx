// src/contexts/AdContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase"; // Adjust the path according to your project structure
import { collection, getDocs } from "firebase/firestore";

const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [allAds, setAllAds] = useState([]); // State for all ads
  const [brands, setBrands] = useState([]); // State for unique brands
  const [categories, setCategories] = useState([]); // State for unique categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "ads");
        const adsSnapshot = await getDocs(adsCollection);
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAds(adsList);
        setAllAds(adsList); // Store all ads

        // Extract unique brands and categories
        const uniqueBrands = [...new Set(adsList.map((ad) => ad.brand))];
        const uniqueCategories = [...new Set(adsList.map((ad) => ad.category))];

        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Function to filter ads by brand
  const filterByBrand = (brand) => {
    if (brand) {
      const filteredAds = allAds.filter((ad) => ad.brand === brand);
      setAds(filteredAds);
    } else {
      setAds(allAds); // Reset to all ads if no brand is selected
    }
  };

  // Function to filter ads by category
  const filterByCategory = (category) => {
    if (category) {
      const filteredAds = allAds.filter((ad) => ad.category === category);
      setAds(filteredAds);
    } else {
      setAds(allAds); // Reset to all ads if no category is selected
    }
  };

  return (
    <AdContext.Provider
      value={{
        ads,
        brands,
        categories,
        loading,
        error,
        filterByBrand,
        filterByCategory,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

// Custom hook to use the AdContext
export const useAds = () => {
  return useContext(AdContext);
};
