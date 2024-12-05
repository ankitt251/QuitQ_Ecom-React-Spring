import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  AddShoppingCart,
  FavoriteBorder,
  Storefront,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";

const Navigation = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex item-center gap-2 space-y-1">
              <IconButton>
                <MenuIcon className="hidden" />
              </IconButton>
              <div
                onClick={() => navigate("/")}
                className="logo flex cursor-pointer text-lg md:text-2xl text-custom space-x-1"
              >
                <img className=" w-8 h-8" src="../imgs/quitqlogo.png" alt="" />
                <h1 className="space-y-0">QuitQ</h1>
              </div>
            </div>
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  onMouseLeave={() => {
                    setShowCategorySheet(false);
                  }}
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  //onClick={() => navigate("products/2")}
                  className="mainCategory hover:text-custom
                  hover:border-b-2 h-[70px] px-4 border-custom flex items-center
                  "
                >
                  {" "}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <SearchIcon />
            </IconButton>
            {false ? (
              <Button className="flex items-center gap-2">
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="../imgs/catg_men.png"
                />
                <h1 className="font-semibold hidden lg:block">Ankit</h1>
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate("login")}>
                Login
              </Button>
            )}
            <IconButton>
              <FavoriteBorder className="text-gray-700" sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton>
              <AddShoppingCart
                className="text-gray-700"
                sx={{ fontSize: 29 }}
              />
            </IconButton>
            {isLarge && (
              <Button
                onClick={() => navigate("become-seller")}
                startIcon={<Storefront />}
                variant="outlined"
              >
                Become a Seller
              </Button>
            )}
          </div>
        </div>

        {showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="z-20 categorySheet absolute top-[4.41rem] left-20 right-20
        border "
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Navigation;
