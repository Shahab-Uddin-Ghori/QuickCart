import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./utils/Login";
import Signup from "./utils/Signup";
import Allproducts from "./Page/UserPages/Allproducts";
import ItemCart from "./Page/UserPages/ItemCart";
import ProductPurchasedDetails from "./Page/UserPages/ProductPurchasedDetails";
import UserProfile from "./Page/UserPages/UserProfile";
import ProductControl from "./Page/Admin/ProductControl";
import UserControl from "./Page/Admin/UserControl";
import AdminLayout from "./components/AdminLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserLayout from "./components/UserLayout";
import { ToastContainer } from "react-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/auth" element={<Outlet />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* User Pages */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<UserLayout />} />
          <Route path="allproducts" element={<Allproducts />} />
          <Route path="itemcart" element={<ItemCart />} />
          <Route
            path="productpurchaseddetails"
            element={<ProductPurchasedDetails />}
          />
          <Route path="userprofile" element={<UserProfile />} />
        </Route>

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="productcontrol" element={<ProductControl />} />
          <Route path="usercontrol" element={<UserControl />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
