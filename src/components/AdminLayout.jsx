import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toast";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-blue-600 text-white shadow-md py-4 px-6 flex justify-between">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <div>
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                // Yahan par aap redirect ya notification ka code bhi add kar sakte hain
                toast.success("User signed out successfully");
                navigate("/auth/Login");
              } catch (error) {
                toast.error(error.message);
                // Yahan par user ko error message dikhane ka code bhi add kar sakte hain
              }
            }}
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout with Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin"
                  className={`block py-2 px-4 rounded ${
                    location.pathname === "/admin"
                      ? "bg-gray-700"
                      : "hover:bg-gray-600"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/userControl"
                  className={`block py-2 px-4 rounded ${
                    location.pathname === "/admin/userControl"
                      ? "bg-gray-700"
                      : "hover:bg-gray-600"
                  }`}
                >
                  User Control
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/productControl"
                  className={`block py-2 px-4 rounded ${
                    location.pathname === "/admin/productControl"
                      ? "bg-gray-700"
                      : "hover:bg-gray-600"
                  }`}
                >
                  Product Control
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className={`block py-2 px-4 rounded ${
                    location.pathname === "/admin/orders"
                      ? "bg-gray-700"
                      : "hover:bg-gray-600"
                  }`}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/paymentCheck"
                  className={`block py-2 px-4 rounded ${
                    location.pathname === "/admin/paymentCheck"
                      ? "bg-gray-700"
                      : "hover:bg-gray-600"
                  }`}
                >
                  Payment Check
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* Show Dashboard content here if the current route is /admin/dashboard */}
          {location.pathname === "/admin" ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
              <p className="mb-6">
                Welcome to the admin dashboard. Here you can view the summary of
                different controls.
              </p>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">Total Users</h3>
                  <p className="text-xl font-bold">120</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">Total Products</h3>
                  <p className="text-xl font-bold">75</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">Total Orders</h3>
                  <p className="text-xl font-bold">240</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium">Total Revenue</h3>
                  <p className="text-xl font-bold">$15,000</p>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
                <ul className="space-y-2">
                  <li className="border-b py-2">
                    User John Doe created an account.
                  </li>
                  <li className="border-b py-2">Product XYZ was added.</li>
                  <li className="border-b py-2">Order #1234 was completed.</li>
                  <li className="border-b py-2">Payment of $150 received.</li>
                </ul>
              </div>

              {/* Placeholder for Charts */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold mb-3">Sales Overview</h3>
                <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                  {/* Placeholder for a chart */}
                  <p>Chart Placeholder (e.g., Line Chart or Bar Chart)</p>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
