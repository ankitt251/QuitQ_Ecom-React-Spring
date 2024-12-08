import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Navigation from "./customer/components/Navigation/Navigation.jsx";
import Cart from "./customer/Pages/Cart/Cart.jsx";
import HomePage from "./customer/Pages/HomePage/HomePage.jsx";
import ProductDetails from "./customer/Pages/Page Details/ProductDetails.jsx";
import Product from "./customer/Pages/Product/Product.jsx";
import Review from "./customer/Pages/Review/Review.jsx";
import Checkout from "./customer/Pages/Checkout/Checkout.jsx";
import Account from "./customer/Pages/Account/Account.jsx";
import BecomeSeller from "./customer/Pages/Become Seller/BecomeSeller.jsx";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard.jsx";
import AdminDashboard from "./admin/Pages/Dashboard/AdminDashboard.jsx";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./State/Store.js";
import { fetchSellerProfile } from "./State/seller/sellerSlice.js";
import Auth from "./customer/Pages/Auth/Auth.jsx";
import { fetchUserProfile } from "./State/customer/AuthSlice.js";
import PaymentSuccess from "./customer/Pages/PaymentSuccess.jsx";
import Wishlist from "./customer/components/Wishlist/Wishlist.jsx";
import PrivateRoute from "./Routes/PrivateRoute.js";

function App() {
  const dispatch = useAppDispatch();
  const seller = useAppSelector((store) => store.seller);
  const auth = useAppSelector((store) => store.auth);
  const location = useLocation(); // To access the current route path

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !seller.profile) {
      dispatch(fetchSellerProfile(jwt));
    }
  }, [dispatch, seller.profile]);

  useEffect(() => {
    dispatch(
      fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") })
    );
  }, [auth.jwt]);

  // Determine if the current route is a seller or admin route
  const isSellerOrAdminRoute =
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="">
      {/* Conditionally render Navigation component */}
      {!isSellerOrAdminRoute && <Navigation />}{" "}
      {/* Hide navbar for seller/admin routes */}
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/become-seller" element={<BecomeSeller />} />

          {/* Protected Routes */}
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route
            path="/wishlist"
            element={<PrivateRoute element={<Wishlist />} />}
          />
          <Route
            path="/checkout"
            element={<PrivateRoute element={<Checkout />} />}
          />
          <Route
            path="/account/*"
            element={<PrivateRoute element={<Account />} />}
          />

          {/* Seller/Admin Routes */}
          <Route
            path="/seller/*"
            element={<PrivateRoute element={<SellerDashboard />} />}
          />
          <Route
            path="/admin/*"
            element={<PrivateRoute element={<AdminDashboard />} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
