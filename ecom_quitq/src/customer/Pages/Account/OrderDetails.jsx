import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
} from "../../../State/customer/orderSlice";

const OrderDetails = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { orderId, orderItemId } = useParams();
  const { order } = useAppSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(fetchOrderById({ orderId, jwt }));
    dispatch(fetchOrderItemById({ orderItemId, jwt }));
    console.log("Order State:", order);
    console.log("Order ID:", orderId);
    console.log("Order Item ID:", orderItemId);
  }, []);

  return (
    <Box className="space-y-5 p-5">
      {/* Product Section */}
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px]"
          src={order.orderItem?.product?.images?.[0]}
          alt=""
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">
            {order?.orderItem?.product?.seller?.businessDetails?.businessName ||
              "Unknown Seller"}
          </h1>
          <p>{order?.orderItem?.product?.title}</p>
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
            <p>{order.currentOrder?.shippingAddress.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{order.currentOrder?.shippingAddress.mobile}</p>
          </div>
          <p>
            {order.currentOrder?.shippingAddress.streetAddress}, <br />
            {order.currentOrder?.shippingAddress.city},<br />
            {order.currentOrder?.shippingAddress.state},<br />
            {order.currentOrder?.shippingAddress.pincode},
          </p>
        </div>
      </div>

      {/* Price and Payment Section */}
      <div className="border p-5 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="font-bold">Total Item Price</p>
            <p className="font-medium">
              You saved <span>₹ {order.orderItem?.sellingPrice}.00</span>
            </p>
          </div>
          <div className="bg-sub px-5 py-2 text-xs font-medium flex items-center gap-2 rounded-md">
            <PaymentsIcon />
            <p>Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <p className="text-xs">
          <strong>Sold by: </strong>
          {order?.orderItem?.product?.seller?.businessDetails?.businessName}
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
