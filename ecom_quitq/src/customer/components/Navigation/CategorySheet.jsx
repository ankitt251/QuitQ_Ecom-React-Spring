import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory, setShowSheet }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Filter to get the child categories
  const childCategory = (category, parentCategoryId) => {
    return category.filter(
      (child) => child.parentCategoryId === parentCategoryId
    );
  };

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    // Redirect to the products page for the specific category
    navigate(`/products/${categoryId}`);
  };

  return (
    <Box
      sx={{ zIndex: 2 }}
      className="bg-white shadow-lg lg:h-[500px] overflow-y-auto"
    >
      <div className="flex text-sm flex-wrap">
        {categoryTwo[selectedCategory]?.map((item, index) => (
          <div
            key={item.categoryId} // Added key for list item
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <p className="text-custom mb-5 font-semibold">{item.name}</p>
            <ul className="space-y-3">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId
              ).map((subItem) => (
                <div key={subItem.categoryId}>
                  {" "}
                  {/* Added key for subItem */}
                  <li
                    className="hover:text-custom cursor-pointer"
                    onClick={() => handleCategoryClick(subItem.categoryId)} // Added click handler
                  >
                    {subItem.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
