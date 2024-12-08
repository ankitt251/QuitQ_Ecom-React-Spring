import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // To handle redirection
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { fetchUserProfile } from "../../../State/customer/AuthSlice";
import { createOrder } from "../../../State/customer/orderSlice"; // Import createOrder action

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #b88e2f",
  boxShadow: 24,
  p: 4,
};

const paymentMethod = [
  {
    value: "RAZORPAY",
    image:
      "https://www.ecommerce-nation.com/wp-content/uploads/2019/02/razorpay.webp",
    label: "Razorpay",
  },
  {
    value: "CASH ON DELIVERY",
    image: "../imgs/cashondelivery1.jpg",
    label: "Cash on Delivery",
  },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = React.useState(false);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate(); // To navigate to the success page

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentChange = (e) => {
    setPaymentGateway(e.target.value);
    console.log("Payment Gateway changed to:", e.target.value);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    console.log("Selected address:", address);
  };

  const handleBuyNow = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding.");
      return;
    }

    // If the selected payment gateway is Cash on Delivery
    if (paymentGateway === "CASH ON DELIVERY") {
      // Directly navigate to the Payment Success page
      navigate("/payment-success/2");
    } else if (paymentGateway === "RAZORPAY") {
      // Dispatch createOrder with selected address and payment gateway
      const jwt = localStorage.getItem("jwt"); // Get JWT token from localStorage
      dispatch(
        createOrder({ shippingAddress: selectedAddress, jwt, paymentGateway })
      );
      // Integrate Razorpay payment logic here (if needed)
      alert("Payment through Razorpay initiated...");
      navigate("/payment-success"); // After successful payment, redirect to the payment success page
    }
  };

  useEffect(() => {
    console.log("User from Redux:", user);

    if (!user) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        dispatch(fetchUserProfile({ jwt }));
      }
    }
    console.log("User addresses in useEffect:", user?.address);
  }, [dispatch, user]);

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold"> Select Address</h1>
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {user?.address && user.address.length > 0 ? (
                  user.address.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      onSelect={() => handleSelectAddress(address)}
                      isSelected={selectedAddress?.id === address.id}
                    />
                  ))
                ) : (
                  <p>No addresses found</p>
                )}
              </div>
            </div>

            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>
          </div>

          <div>
            <div className="col-span-1 text-sm space-y-3">
              <div>
                <div className="space-y-3 border p-5 rounded-md ">
                  <h1 className="text-primary font-medium pb-2 text-center">
                    Choose Payment Gateway
                  </h1>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    className="flex justify-between pr-2"
                    onChange={handlePaymentChange}
                    value={paymentGateway}
                  >
                    {paymentMethod.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        className="border w-[45%] p-2 rounded-md flex justify-center"
                        value={item.value}
                        control={<Radio />}
                        label={
                          <img
                            className={`${
                              item.value === "RAZORPAY" ? "w-14" : ""
                            } object-contain`}
                            src={item.image}
                            alt={item.label}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="border rounded-md p-4 bg-sub">
                <PricingCard />

                <div className="p-4">
                  <Button
                    fullWidth
                    sx={{
                      color: "black",
                      py: "1rem",
                      backgroundColor: "white",
                      fontFamily: "serif",
                      border: "1px solid black",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        borderColor: "#B88E2F",
                      },
                    }}
                    onClick={handleBuyNow} // Call handleBuyNow on button click
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
