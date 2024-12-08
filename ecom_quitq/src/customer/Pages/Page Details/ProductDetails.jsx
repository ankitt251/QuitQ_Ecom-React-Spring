import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button, Divider, Snackbar } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ReviewCard from "../Review/ReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart } from "../../../State/customer/cartSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector((store) => store);
  const [activeImage, setActiveImage] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleActiveImage = (value) => () => {
    setActiveImage(value);
  };

  // Fetch product details
  useEffect(() => {
    dispatch(fetchProductById(Number(productId))).then((response) => {
      console.log("API Response:", response);
    });
  }, [productId]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    const jwt = localStorage.getItem("jwt");
    const request = {
      productId: product.product.id,
      quantity: quantity, // This is dynamic
    };

    if (jwt) {
      dispatch(addItemToCart({ jwt, request }))
        .unwrap()
        .then(() => {
          setSnackbarMessage("Item added to cart successfully!");
          setOpenSnackbar(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to add item to cart.");
          setOpenSnackbar(true);
        });
    } else {
      alert("Please login to add items to the cart.");
    }
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const request = {
        productId: product.product.id,
        quantity: quantity,
      };

      dispatch(addItemToCart({ jwt, request }))
        .unwrap()
        .then(() => {
          navigate("/checkout");
        })
        .catch(() => {
          alert("Failed to add item to cart.");
        });
    } else {
      alert("Please login to proceed with the purchase.");
    }
  };

  useEffect(() => {
    console.log("Fetched Product:", product.product);
    console.log("Selected Image URL:", product.product?.images[activeImage]);
  }, [activeImage]);

  return (
    <div className="px-5 lg:px-20 pt-10 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item, index) => (
              <img
                onClick={handleActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt={index}
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md object-contain h-[550px]"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg text-custom">
              {product.product?.seller?.businessDetails.businessName}
            </h1>
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
            {product.product?.title}
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
              <span className="font-sans text-gray-800">
                ₹. {product.product?.sellingPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹. {product.product?.mrpPrice}
              </span>
              <span className="text-custom font-semibold">
                {product.product?.discountPercentage}%
              </span>
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
              onClick={handleAddToCart}
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
              startIcon={<AddShoppingCart />}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              onClick={handleBuyNow}
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
            >
              Buy Now
            </Button>
          </div>
          <div className="mt-5 space-y-6">
            <p>{product.product?.description}</p>
            <Divider />
          </div>
          <div className="mt-7 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      {/* Snackbar for success or failure */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ProductDetails;
