import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");

  const handlePaymentChange = (e) => {
    setPaymentGateway(e.target.value);
  };

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
                {[1, 1, 1, 1].map((item) => (
                  <AddressCard />
                ))}
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
                        className="border w-[45%] p-2 rounded-md flex justify-center"
                        value={item.value}
                        control={<Radio />}
                        label={
                          <img
                            className={`${
                              item.value === "razorpay" ? "w-14" : ""
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
                        backgroundColor: "#f0f0f0", // Light gray on hover (optional)
                        borderColor: "#B88E2F", // Change border color on hover (optional)
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              <div></div>
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
          <AddressForm />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
