import React, { useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../../Context/CartContextProvider";
import { db } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const CheckOut = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("Normal");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const { orderObj, emptyCart } = useContext(CartContext);
  console.log("from checkout to check orders ==>", orderObj);

  const handleScreenshotUpload = (e) => {
    setScreenshot(URL.createObjectURL(e.target.files[0]));
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      // Only allows up to 11 digits
      setContact(value);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const generateTransactionId = () => {
    return "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleOrderSubmit = async () => {
    try {
      const transactionId = generateTransactionId(); // Generate a custom transaction ID
      const ordersCollection = collection(db, "orders"); // Reference to the "orders" collection

      // Transform orderObj into a suitable format
      const items = {};
      orderObj.forEach((item, index) => {
        items[`item${index}`] = item; // Use unique keys for each item
      });

      const orderData = {
        transactionId, // Include the generated transaction ID
        items, // Use the transformed items
        timestamp: new Date(), // Add a timestamp
      };

      const docRef = await addDoc(ordersCollection, orderData); // Add the cart items to the collection
      console.log(
        "Cart items saved with custom transaction ID: ",
        transactionId
      );
      alert(`Your order has been placed! Transaction ID: ${transactionId}`);
    } catch (error) {
      console.log("Error saving cart items: ", error.message);
    }
  };

  const handleOrderShipment = () => {
    try {
    } catch (error) {
      console.log("🚀 ~ handleOrderShipment ~ error:", error.message);
    }
  };

  return (
    <div
      className="container mx-auto mt-24 h-screen p-6 bg-white shadow-lg rounded-lg"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-sky-500"
          required
        />
      </div>

      {/* Contact Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contact <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={contact}
          onChange={handleContactChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-sky-500"
          required
          pattern="\d{11}"
          maxLength={11}
          placeholder="Enter 11-digit contact number"
        />
      </div>

      {/* Address Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        {/* <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-sky-500"
          required
        /> */}
        <textarea
          name="adress"
          id="adress"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-sky-500"
        ></textarea>
      </div>

      {/* Delivery Type */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Delivery Type
        </label>
        <select
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-sky-500"
        >
          <option value="Normal">Normal</option>
          <option value="express">Express Delivery</option>
          <option value="sameday">Same-Day Delivery</option>
        </select>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Payment Method <span className="text-red-500">*</span>
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-sky-500"
          required
        >
          <option value="" disabled>
            Select your payment method
          </option>
          <option value="COD">COD</option>
          <option value="Easypaisa">Easypaisa</option>
          <option value="JazzCash">JazzCash</option>
        </select>
      </div>

      {/* Payment Screenshot (Only if payment method is not COD) */}
      {paymentMethod !== "COD" && paymentMethod && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleScreenshotUpload}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
          {screenshot && (
            <div className="mt-4">
              <h3 className="text-sm font-bold text-gray-700">
                Uploaded Screenshot:
              </h3>
              <div className="border rounded-md p-2 shadow-sm w-48 h-64 mt-2">
                <img
                  src={screenshot}
                  alt="Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={() => {
          alert("Order Submitted!");
          handleOrderSubmit();
          emptyCart();
        }}
        className="mt-6 w-full px-6 py-3 bg-sky-600 text-white font-semibold rounded-md shadow-lg hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
      >
        Submit Order
      </button>
    </div>
  );
};

export default CheckOut;
