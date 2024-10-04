import React, { createContext, useContext, useState } from "react";

// Create a new context for the cart
const CartContext = createContext();

// This is the provider component that will wrap the parts of the app where we need cart functionality
export const CartProvider = ({ children }) => {
  // State to hold all the items in the cart, initially an empty array
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      // If the item already exists, increase its quantity
      if (existingItem) {
        return prevItems.map(
          (item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // Increase the quantity
              : item // Keep the other items unchanged
        );
      }

      // If the product is not in the cart, add it with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart by its ID
  const removeFromCart = (id) => {
    setCartItems(
      (prevItems) => prevItems.filter((item) => item.id !== id) // Remove items that don't match the given ID
    );
  };

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, // Add up the quantity of each item
    0 // Start with a total of 0
  );

  // Return the CartContext provider, passing down cart-related functions and data
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalItems }}
    >
      {children}{" "}
      {/* This will be the part of the app that the CartProvider wraps */}
    </CartContext.Provider>
  );
};

// Custom hook to easily use the cart context in any component
export const useCart = () => useContext(CartContext);
