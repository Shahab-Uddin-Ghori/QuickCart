import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./utils/Login";
import Signup from "./utils/Signup";
import Allproducts from "./Page/UserPages/Allproducts";
import ItemCart from "./Page/UserPages/ItemCart";
import UserProfile from "./Page/UserPages/UserProfile";
import ProductControl from "./Page/Admin/ProductControl";
import UserControl from "./Page/Admin/UserControl";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserLayout from "./components/UserLayout";
import { ToastContainer } from "react-toast";
import Orders from "./Page/Admin/Orders";
import PaymentCheck from "./Page/Admin/PaymentCheck";
import AdminLayout from "./components/AdminLayout";
import { UserContext } from "./Context/UserProvider";
import ProductDetails from "./Page/UserPages/ProductDetails";

function App() {
  const { profile } = useContext(UserContext);
  // console.log("🚀 ~ App ~ user:", profile.role);

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
            profile.role === "admin" ? (
              <Navigate to={`/admin`} />
            ) : (
              <>
                <Header />
                <Outlet />
                <Footer />
              </>
            )
          }
        >
          <Route path="/" element={<UserLayout />} />
          <Route path="products" element={<Allproducts />} />
          <Route path="itemcart" element={<ItemCart />} />
          <Route
            path="ProductDetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="userprofile" element={<UserProfile />} />
        </Route>

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            profile.role === "admin" ? <AdminLayout /> : <Navigate to={`/`} />
          }
        >
          <Route path="productControl" element={<ProductControl />} />
          <Route path="paymentCheck" element={<PaymentCheck />} />
          <Route path="userControl" element={<UserControl />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
