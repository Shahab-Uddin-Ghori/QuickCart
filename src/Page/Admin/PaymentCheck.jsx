import React, { useState } from "react";

function PaymentCheck() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        uid: "user_001",
        contact: "john@example.com",
        pic: "https://via.placeholder.com/50",
      },
      product: {
        name: "Wireless Headphones",
        amount: 150,
      },
      date: "2024-09-25",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        uid: "user_002",
        contact: "jane@example.com",
        pic: "https://via.placeholder.com/50",
      },
      product: {
        name: "Smart Watch",
        amount: 300,
      },
      date: "2024-09-26",
    },
    {
      id: 3,
      user: {
        name: "Alice Johnson",
        uid: "user_003",
        contact: "alice@example.com",
        pic: "https://via.placeholder.com/50",
      },
      product: {
        name: "Gaming Mouse",
        amount: 75,
      },
      date: "2024-09-27",
    },
    {
      id: 4,
      user: {
        name: "Mike Brown",
        uid: "user_004",
        contact: "mike@example.com",
        pic: "https://via.placeholder.com/50",
      },
      product: {
        name: "Laptop Stand",
        amount: 45,
      },
      date: "2024-09-28",
    },
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Checkout</h2>
      <p className="mb-4 text-gray-700">
        Below is the list of all payment transactions. Click on a user for more
        details.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b-2 text-left">User</th>
              <th className="px-4 py-2 border-b-2 text-left">Product</th>
              <th className="px-4 py-2 border-b-2 text-left">Amount</th>
              <th className="px-4 py-2 border-b-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="border-b px-4 py-2 flex items-center space-x-2">
                  <img
                    src={transaction.user.pic}
                    alt={transaction.user.name}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="overflow-hidden">
                    <div className="font-semibold truncate">
                      {transaction.user.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {transaction.user.contact}
                    </div>
                  </div>
                </td>
                <td className="border-b px-4 py-2 truncate">
                  {transaction.product.name}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-green-600">
                  ${transaction.product.amount.toFixed(2)}
                </td>
                <td className="border-b px-4 py-2">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentCheck;
