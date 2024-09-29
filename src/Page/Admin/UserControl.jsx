import React, { useState } from "react";

function UserControl() {
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      ordersCount: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      ordersCount: 3,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "User",
      ordersCount: 2,
    },
    // More users can be added here
  ]);

  // Sort users to ensure admin is always on top
  const sortedUsersData = usersData.sort((a, b) => {
    if (a.role === "Admin" && b.role !== "Admin") return -1;
    if (b.role === "Admin" && a.role !== "Admin") return 1;
    return 0; // Keep the original order for non-admins
  });

  const handleEdit = (id) => {
    console.log("Editing user with ID:", id);
    // Implement edit logic here
  };

  const handleDelete = (id) => {
    console.log("Deleting user with ID:", id);
    // Implement delete logic here
  };

  const handleBlock = (id) => {
    console.log("Blocking user with ID:", id);
    // Implement block logic here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">User Control</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 text-left">Name</th>
            <th className="px-4 py-2 border-b-2 text-left">Email</th>
            <th className="px-4 py-2 border-b-2 text-left">Role</th>
            <th className="px-4 py-2 border-b-2 text-left">Orders Count</th>
            <th className="px-4 py-2 border-b-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsersData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border-b px-4 py-2">{user.name}</td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.role}</td>
              <td className="border-b px-4 py-2">{user.ordersCount}</td>
              <td className="border-b px-4 py-2 text-center">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>{" "}
                |{" "}
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>{" "}
                |{" "}
                <button
                  className="text-yellow-500 hover:underline"
                  onClick={() => handleBlock(user.id)}
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserControl;
