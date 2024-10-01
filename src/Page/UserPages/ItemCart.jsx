import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

const ItemCart = () => {
  // Sample data for demonstration purposes
  const initialCartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/100", // Sample image URL
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      quantity: 3,
      image: "https://via.placeholder.com/100",
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 500 }); // Optional: Set duration for animations
  }, []);

  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Your Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            data-aos="fade-up" // AOS animation
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                >
                  <FaMinus />
                </button>
                <span className="mx-2 text-lg text-gray-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </h3>
          <button
            onClick={() => alert("Proceeding to Checkout")}
            className="mt-4 px-6 py-3 bg-sky-600 text-white font-semibold rounded-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCart;
