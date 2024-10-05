import { createContext, useEffect, useState } from "react";

// Create the CartContext to provide cart functionality throughout the application
export const CartContext = createContext();

function CartContextProvider({ children }) {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  function addItemToCart(item) {
    // Create a copy of the current cart items
    const arr = [...cartItems]; // Use spread operator to create a new array

    // Check if the item already exists in the cart
    const itemIndex = cartItems.findIndex((data) => data.id === item.id);

    // If the item does not already exist, add it to the cart with a quantity of 1
    if (itemIndex === -1) {
      arr.push({ ...item, quantity: 1 });
    }
    // If the item already exists, increment the quantity
    else {
      arr[itemIndex].quantity++;
    }

    // Update the state with the new cart items
    setCartItems(arr);
  }

  // Function to remove an item from the cart by its ID
  function removeItemFromCart(id) {
    // Create a copy of the current cart items
    const arr = [...cartItems];

    // Find the index of the item to remove
    const itemIndex = cartItems.findIndex((data) => data.id === id);

    // If the item is found, remove it from the array
    arr.splice(itemIndex, 1);

    // Update the state with the modified cart items
    setCartItems(arr);
  }

  // Function to check if an item is already in the cart by its ID
  function isItemAdded(id) {
    // Find the index of the item in the cart
    const itemIndex = cartItems.findIndex((data) => data.id === id);

    // If the item is not found, return null
    if (itemIndex === -1) {
      return null;
    }
    // If the item is found, return the item object
    else {
      return cartItems[itemIndex]; // Return the item object
    }
  }
  function emptyCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        isItemAdded,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
