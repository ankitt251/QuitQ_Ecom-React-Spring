import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";

const ElectricCategory = () => {
  return (
    <div className="py-10 bg-gray-50 ">
      <h2 className="text-3xl font-bold text-center mb-6 font-sans">
        Browse The Range
      </h2>
      <p className="text-center text-lg text-gray-600 mb-10">
        Step Up Your Style Game – Discover Fashion that Fits Your Life!
      </p>
      <div className="flex flex-wrap justify-center gap-6 ">
        <ElectricCategoryCard imgSrc="../imgs/catg_men.png" title="Men" />
        <ElectricCategoryCard imgSrc="../imgs/catg_women.jpg" title="Women" />
        <ElectricCategoryCard imgSrc="../imgs/catg_kids.jfif" title="Kids" />
      </div>
    </div>
  );
};

export default ElectricCategory;
