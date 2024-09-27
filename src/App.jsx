import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return;
  <BrowserRouter>
    {/* utils */}
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    {/*  */}

    {/* user */}
    <Routes>
      <Route path="/Allproducts" element={<Allproducts />} />
      <Route path="/ItemCart" element={<ItemCart />} />
      <Route
        path="/ProductPurchasedDetails"
        element={<ProductPurchasedDetails />}
      />
      <Route path="/UserProfile" element={<UserProfile />} />
    </Routes>
    {/*  */}

    {/* Admin */}
    <Routes>
      <Route path="/ProductControl" element={<ProductControl />} />
      <Route path="/UserControl" element={<UserControl />} />
    </Routes>
    {/*  */}

    {/* Components */}
    <Routes>
      <Route path="/AdminLayout" element={<AdminLayout />} />
      <Route path="/UserLayout" element={<UserLayout />} />
      <Route path="/Header" element={<Header />} />
      <Route path="/Footer" element={<Footer />} />
    </Routes>
    {/*  */}
  </BrowserRouter>;
}

export default App;
