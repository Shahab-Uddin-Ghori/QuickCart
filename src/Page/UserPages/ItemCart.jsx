import React, { useEffect, useContext } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import { CartContext } from "../../Context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toast";

const ItemCart = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const {
    cartItems,
    handleDecrement,
    handleIncrement,
    handleRemove,
    calculateTotalPrice,
  } = useContext(CartContext);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 500 }); // Optional: Set duration for animations
  }, []);

  useEffect(() => {
    try {
      if (!user) {
        navigate("/auth/login");
        toast.success("You need to login first");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

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
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">Price: Rs. {item.price}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="px-2 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
                >
                  <FaMinus />
                </button>
                <span className="mx-2 text-lg text-gray-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="px-2 py-2 text-sm bg-sky-500 text-white rounded-full hover:bg-sky-600 transition shadow-md "
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 text-red-500 hover:text-red-600 transition shadow-sm"
                >
                  <FaTrash size={24} />
                </button>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              Rs. {item.price * item.quantity}
            </p>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Total Price: Rs. {calculateTotalPrice()}
          </h3>
          <button
            onClick={() => navigate("/products/checkout")}
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
