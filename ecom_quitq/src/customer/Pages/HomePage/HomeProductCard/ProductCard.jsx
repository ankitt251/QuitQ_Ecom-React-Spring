import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.title}`); // Use the `title` field from `product` as part of the URL
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card
        sx={{
          width: 300, // Fixed width for uniformity
          height: 400, // Fixed height for uniformity
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 200, // Fixed height for the image
            objectFit: "cover", // Ensures the image fits without distortion
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            ₹{product.price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
