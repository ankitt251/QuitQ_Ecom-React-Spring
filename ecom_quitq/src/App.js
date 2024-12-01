import { Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <div className="">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        {/* <Product /> */}
        {/* {<ProductDetails />} */}
        {/* <Review /> */}
        {/* <Cart /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
