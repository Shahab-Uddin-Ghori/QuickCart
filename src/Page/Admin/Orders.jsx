import React, { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      products: [
        { name: "Wireless Headphones", quantity: 1, price: 150 },
        { name: "Smart Watch", quantity: 2, price: 300 },
      ],
      total: 750,
      date: "2024-09-25",
      status: "Pending",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
      },
      products: [
        { name: "Gaming Mouse", quantity: 3, price: 75 },
        { name: "Laptop Stand", quantity: 1, price: 45 },
      ],
      total: 270,
      date: "2024-09-26",
      status: "Pending",
    },
    {
      id: 3,
      user: {
        name: "Alice Johnson",
        email: "alice@example.com",
      },
      products: [{ name: "Bluetooth Speaker", quantity: 1, price: 100 }],
      total: 100,
      date: "2024-09-27",
      status: "Accepted",
    },
  ]);

  const handleAccept = (id) => {
    console.log("Accepting order ID:", id);
    // Implement acceptance logic here
  };

  const handleReject = (id) => {
    console.log("Rejecting order ID:", id);
    // Implement rejection logic here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <p className="mb-4 text-gray-700">
        Below is the list of all orders. You can accept or reject orders based
        on the details.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b-2 text-left">User</th>
              <th className="px-4 py-2 border-b-2 text-left">Products</th>
              <th className="px-4 py-2 border-b-2 text-left">Total Price</th>
              <th className="px-4 py-2 border-b-2 text-left">Date</th>
              <th className="px-4 py-2 border-b-2 text-left">Status</th>
              <th className="px-4 py-2 border-b-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="border-b px-4 py-2">
                  <div className="font-semibold">{order.user.name}</div>
                  <div className="text-sm text-gray-500">
                    {order.user.email}
                  </div>
                </td>
                <td className="border-b px-4 py-2">
                  {order.products.map((product, index) => (
                    <div key={index}>
                      {product.name} (x{product.quantity})
                    </div>
                  ))}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-green-600">
                  ${order.total.toFixed(2)}
                </td>
                <td className="border-b px-4 py-2">{order.date}</td>
                <td className="border-b px-4 py-2">{order.status}</td>
                <td className="border-b px-4 py-2 text-center">
                  {order.status === "Pending" ? (
                    <>
                      <button
                        className="text-green-500 hover:underline mr-2"
                        onClick={() => handleAccept(order.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleReject(order.id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
