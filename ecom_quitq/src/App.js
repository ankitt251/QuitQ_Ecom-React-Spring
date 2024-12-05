import { Route, Routes, useNavigate } from "react-router-dom";
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

function App() {
  const dispatch = useAppDispatch();
  const seller = useAppSelector((store) => store.seller); // Fixed destructuring
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !seller.profile) {
      // Dispatch only if JWT exists and profile is not already loaded
      dispatch(fetchSellerProfile(jwt));
    }
  }, [dispatch, seller.profile]); // Dependencies ensure it runs once per condition

  return (
    <div className="">
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />}></Route>
          <Route path="/seller/*" element={<SellerDashboard />}></Route>
          <Route path="/admin/*" element={<AdminDashboard />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
