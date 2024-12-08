import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../State/Store";
import { paymentSuccess } from "../../State/customer/orderSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const location = useLocation();
  const getQueryParam = (key) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
  };

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");

    console.log("Payment ID:", paymentId); // Log this
    console.log("Payment Link ID:", paymentLinkId); // Log this

    if (!paymentId || !paymentLinkId) {
      console.error("Missing required payment parameters.");
      return;
    }

    const jwt = localStorage.getItem("jwt");
    dispatch(paymentSuccess({ jwt, paymentId, paymentLinkId }));
  }, [orderId]);

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="bg-sub p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-semibold">Congratulations! 🎉</h1>
        <h1 className="text-2xl font-semibold">Your order is placed!!</h1>
        <div>
          <Button
            color="custom"
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Shop More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
