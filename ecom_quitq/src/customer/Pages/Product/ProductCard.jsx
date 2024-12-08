import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button, Snackbar } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../../State/customer/cartSlice";
import { useAppDispatch } from "../../../State/Store";

const ProductCard = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // for snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // for snackbar message

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Navigation to product detail page when card is clicked
  const handleCardClick = () => {
    navigate(`/product-details/${item.categoryId}/${item.name}/${item.id}`);
  };

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 2000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleBuyNow = () => {
    const jwt = localStorage.getItem("jwt"); // Get the JWT from localStorage (or another source)

    if (jwt) {
      // Dispatch the action to add item to the cart
      dispatch(
        addItemToCart({ jwt, request: { productId: item.id, quantity: 1 } })
      )
        .then(() => {
          // After the item is added, navigate to the cart page
          navigate("/cart");
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    } else {
      // If no JWT, handle the case (e.g., redirect to login or show an error)
      alert("Please login to add items to the cart.");
    }
  };

  const handleAddToCart = () => {
    const jwt = localStorage.getItem("jwt");
    const request = {
      productId: item.id,
      quantity: 1, // You can adjust the quantity as per your requirements
    };

    // Dispatch action to add item to the cart
    dispatch(addItemToCart({ jwt, request }))
      .unwrap() // This allows you to handle the success or failure here
      .then(() => {
        setSnackbarMessage("Item added to cart successfully!");
        setOpenSnackbar(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to add item to cart.");
        setOpenSnackbar(true);
      });
  };

  return (
    <div onClick={handleCardClick} className="card-container">
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.images.map((item, index) => (
          <img
            className="card-media object-top"
            src={item}
            alt=""
            key={index}
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}
        <div className="card-content">
          <div className="center-buttons">
            <Button
              variant="contained"
              color="primary"
              className="custom-button"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>

            <Button
              variant="contained"
              color="secondary"
              className="custom-button"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>

          <div className="favorite-button">
            <Button variant="contained" color="white">
              <Favorite sx={{ color: "red" }} />
            </Button>
          </div>
        </div>
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <h1>{item.seller?.businessDetails.businessName}</h1>
          <p>{item.title}</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">
            ₹. {item.sellingPrice}
          </span>
          <span className="thin-line-through text-gray-400">
            ₹. {item.mrpPrice}
          </span>
          <span className="text-custom font-semibold">
            {item.discountPercentage}%
          </span>
        </div>
      </div>

      {/* Snackbar Component to display success or failure message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ProductCard;
