import React, { useEffect } from "react";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserCart } from "../../../State/customer/cartSlice";

const PricingCard = () => {
  const dispatch = useDispatch();

  // Fetching the cart details from Redux store
  const {
    totalSellingPrice,
    totalMrpPrice,
    discount,
    totalItem,
    loading,
    error,
  } = useSelector((state) => state.cart.cart || {});
  console.log("Cart state in PricingCard:", {
    totalSellingPrice,
    totalMrpPrice,
    discount,
    totalItem,
  });

  // Fetch cart if it is not loaded yet
  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // Retrieve the JWT token from localStorage
    if (!totalSellingPrice) {
      // Only dispatch if cart data isn't already loaded
      dispatch(fetchUserCart(jwt));
    }
  }, [dispatch, totalSellingPrice]); // Dependency on totalSellingPrice to avoid unnecessary re-fetch

  // Calculate subtotal (total selling price)
  const calculateSubtotal = () => totalMrpPrice || 0;

  // Calculate discount (discount directly fetched)
  const calculateDiscount = () => discount || 0;

  // Calculate shipping (static value for now)
  const calculateShipping = () => 69;

  const calculateTotal = () =>
    totalSellingPrice
      ? totalSellingPrice - calculateDiscount() + calculateShipping()
      : 0;

  const subtotal = calculateSubtotal();
  const discountValue = calculateDiscount();
  const shipping = calculateShipping();
  const total = calculateTotal();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching cart data: {error}</div>;
  }

  return (
    <div className="space-y-3 p-5">
      {/* Subtotal */}
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>₹. {subtotal}</span>
      </div>

      {/* Discount */}
      <div className="flex justify-between items-center">
        <span>Discount</span>
        <span> {discountValue}%</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center">
        <span>Shipping</span>
        <span>₹. {shipping}</span>
      </div>

      {/* Platform Fee */}
      <div className="flex justify-between items-center">
        <span>Platform Fee</span>
        <span>Free</span>
      </div>

      <Divider />

      {/* Total */}
      <div className="flex justify-between items-center p-5">
        <span>Total</span>
        <span>₹. {total}</span>
      </div>
    </div>
  );
};

export default PricingCard;
