import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { FilterAlt } from "@mui/icons-material";
import FilterSection from "./FilterSection.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (e) => {
    setPage(e);
  };

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          Men T-Shirt
        </h1>
      </div>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section grid sm:grid-cols-2 ms:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
              <ProductCard />
            ))}
          </section>
          <div className="flex justify-center pt-10">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={10}
              shape="rounded"
              color="primary"
            />
          </div>
          <Box
            sx={{
              backgroundColor: "#FAF3EA",
              py: 3,
              mt: 5,
              borderTop: "1px solid #E0E0E0",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <Box sx={{ flex: "1 1 30%", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  <TaskAltIcon /> Easy Returns
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Hassle-free returns within 30 days.
                </Typography>
              </Box>
              <Box sx={{ flex: "1 1 30%", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  <SupportAgentIcon /> 24/7 Support
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Always here to assist you.
                </Typography>
              </Box>
              <Box sx={{ flex: "1 1 30%", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  <DeliveryDiningIcon /> Free Shipping
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  On all orders above ₹500.
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
