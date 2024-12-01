import { Divider } from "@mui/material";
import React from "react";

const PricingCard = () => {
  return (
    <div className="space-y-3 p-5 ">
      <div className="flex justify-between items-center">
        <span>Subtotal </span>
        <span>₹. 1,999</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Discount </span>
        <span>₹. 1,499</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Shipping </span>
        <span>₹. 69</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Platform Fee </span>
        <span>Free</span>
      </div>

      <Divider />

      <div className="flex justify-between items-center p-5">
        <span>Total</span>
        <span>₹. 1,499</span>
      </div>
    </div>
  );
};

export default PricingCard;
