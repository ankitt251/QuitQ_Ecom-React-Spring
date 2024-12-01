import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button, Divider } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  FavoriteBorderOutlined,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Review from "../Review/Review";
import ReviewCard from "../Review/ReviewCard";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {[1, 1, 1, 1].map((item) => (
              <img
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src="../imgs/prd1.jpg"
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md object-contain h-[550px]"
              src="../imgs/prd1.jpg"
              alt=""
            />
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg text-custom">H&M Clothing</h1>
            <FavoriteBorderIcon
              sx={{
                color: "black",
                cursor: "pointer",
                "&:hover": {
                  color: "red",
                },
              }}
            />
          </div>
          <p className="text-gray-500 font-semibold">
            Flared fine-knit leggings
          </p>

          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: "goldenrod", fontSize: "20px" }} />
            </div>

            <div>
              <Divider orientation="vertical" flexItem />
              <span>234 Ratings</span>
            </div>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">₹. 1,499</span>
              <span className="line-through text-gray-400">₹. 1,999</span>
              <span className="text-custom font-semibold">60%</span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
          </div>

          <div className="mt-7 space-y-3 ">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: "primary" }} />
              <p>Authentic and Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: "primary" }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: "primary" }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: "primary" }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
              <Button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              onClick={() => navigate("/cart")}
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
              startIcon={<AddShoppingCart />}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              onClick={() => navigate("/checkout")}
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
          <div className="mt-5 space-y-6">
            <p>
              Leggings in a soft, fine knit with a high, elasticated waist and
              legs with flared hems.
            </p>
            <Divider />
          </div>
          <div className="mt-7 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
