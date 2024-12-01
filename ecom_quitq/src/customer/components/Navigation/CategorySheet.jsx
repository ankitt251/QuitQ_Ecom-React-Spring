import React from "react";
import { menLevelTwo } from "../../../data/category/level two/mainLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevelTwo";
import { menLevelThree } from "../../../data/category/level three/mainLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import {
  electronics,
  electronicsLevelThree,
} from "../../../data/category/level three/electronicsLevelThree";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";
import { Box } from "@mui/material";

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

const CategorySheet = () => {
  return (
    <Box className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
      <div className="flex text-sm flex-wrap">
        {categoryTwo["men"]?.map((item) => (
          <div>
            <p className="text-custom mb-5 font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
