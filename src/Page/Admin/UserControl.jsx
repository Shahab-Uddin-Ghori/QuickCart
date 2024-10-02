import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // Import updateDoc for updating user status
import { db } from "../../utils/firebase"; // Import your Firestore instance

function UserControl() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state

  // Fetch all users from the Firestore 'users' collection
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users")); // Fetch all users
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsersData(users); // Set fetched users in state
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false); // Ensure loading is disabled even if there is an error
    }
  };

  // Function to delete a user from Firestore
  const handleDelete = async (userId) => {
    try {
      // Delete user document from Firestore
      await deleteDoc(doc(db, "users", userId));
      // Update state to remove deleted user
      setUsersData((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      console.log("User deleted with ID:", userId);
    } catch (error) {
      console.error("Error deleting user:", error); // Log error
    }
  };

  // Function to block or unblock a user
  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isBlocked: !isBlocked, // Toggle the isBlocked status
      });

      // Update local state to reflect the change
      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );

      console.log(
        `${isBlocked ? "Unblocked" : "Blocked"} user with ID:`,
        userId
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  if (loading) {
    return <div>Loading users...</div>; // Show loading state while fetching users
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">User Control</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b-2 text-left">Name</th>
              <th className="px-4 py-2 border-b-2 text-left">Email</th>
              <th className="px-4 py-2 border-b-2 text-left">Role</th>
              <th className="px-4 py-2 border-b-2 text-left">Contact</th>
              <th className="px-4 py-2 border-b-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="border-b px-4 py-2 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="border-b px-4 py-2">{user.role}</td>
                <td className="border-b px-4 py-2">{user.contact}</td>
                <td className="border-b px-4 py-2 text-center whitespace-nowrap">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)} // Call handleDelete on click
                  >
                    Delete
                  </button>
                  {" | "}
                  <button
                    className={
                      user.isBlocked
                        ? "text-green-500 hover:underline"
                        : "text-yellow-500 hover:underline"
                    }
                    onClick={() => handleBlockToggle(user.id, user.isBlocked)} // Toggle block status
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserControl;
