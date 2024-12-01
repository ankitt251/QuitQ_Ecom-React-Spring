import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from "@mui/icons-material/Payments";

const OrderDetails = () => {
  const navigate = useNavigate();

  return (
    <Box className="space-y-5 p-5">
      {/* Product Section */}
      <section className="flex flex-col gap-5 justify-center items-center">
        <img className="w-[100px]" src="../imgs/prd1.jpg" alt="Product" />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">H&M Clothing</h1>
          <p>
            Leggings in a soft, fine knit with a high, elasticated waist and
            legs with flared hems.
          </p>
          <p>
            <strong>Size:</strong> M
          </p>
        </div>
        <Button
          onClick={() => navigate(`/reviews/${5}/create`)}
          variant="contained"
          color="primary"
        >
          Write Review
        </Button>
      </section>

      {/* Order Stepper Section */}
      <section className="border p-5">
        <OrderStepper orderStatus={"ARRIVING"} />
      </section>

      {/* Delivery Address Section */}
      <div className="border p-5 space-y-4">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>Ankit</p>
            <Divider flexItem orientation="vertical" />
            <p>123455789</p>
          </div>
          <p>Selene Park, 2nd Floor, Apt 3B, Pune</p>
        </div>
      </div>

      {/* Price and Payment Section */}
      <div className="border p-5 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="font-bold">Total Item Price</p>
            <p className="font-medium">
              You saved <span>₹ {799}.00</span>
            </p>
          </div>
          <div className="bg-sub px-5 py-2 text-xs font-medium flex items-center gap-2 rounded-md">
            <PaymentsIcon />
            <p>Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <p className="text-xs">
          <strong>Sold by: </strong>H&M Clothing
        </p>
      </div>

      {/* Order Cancelled Button */}
      <div className="pt-5">
        <Button
          disabled={false}
          color="error"
          sx={{ py: "0.7rem", width: "100%" }}
          variant="outlined"
          fullWidth
        >
          {false ? "Order Cancelled" : "Cancel Order"}
        </Button>
      </div>
    </Box>
  );
};

export default OrderDetails;
