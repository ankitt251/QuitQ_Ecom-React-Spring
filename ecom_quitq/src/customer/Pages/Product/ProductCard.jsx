import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";

const imgs = [
  "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa7%2Ff3%2Fa7f3a70f3b720b488e2db40264df876b72ec3763.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
  "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F2d%2Ff7%2F2df76025a1d266a3a983fba691722470bedbbd09.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
  "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F0a%2F93%2F0a93098399026c539a45d411c1a7d568a8b2ff57.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
  "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc385d65dbf60489b048800d0cf94114743ba2e4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
];

const ProductCard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % imgs.length);
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
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imgs.map((item, index) => (
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
        <div>
          <div className="center-buttons">
            <Button variant="contained" color="white" className="custom-button">
              Buy Now
            </Button>
            <Button variant="contained" color="white" className="custom-button">
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
          <h1>H&M</h1>
          <p>Red Jacket</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">₹. 400</span>
          <span className="thin-line-through text-gray-400">₹ 999</span>
          <span className="text-custom font-semibold">60%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
