import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div>
      <div
        onClick={() =>
          navigate(
            `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
          )
        }
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

        {isHovered && (
          <div>
            <div className="center-buttons">
              <Button
                variant="contained"
                color="white"
                className="custom-button"
              >
                Buy Now
              </Button>
              <Button
                variant="contained"
                color="white"
                className="custom-button"
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
        )}
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
    </div>
  );
};

export default ProductCard;
