import React from "react";
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 px-5 sm:ox-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {[1, 1, 1, 1].map((item) => (
            <CartItem />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border rounded-md bg-sub">
            <PricingCard />

            <div className="p-4">
              <Button
                onClick={() => navigate("/checkout")}
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
  );
};

export default Cart;
