import React from "react";
import ReviewCard from "./ReviewCard";
import { Divider } from "@mui/material";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img src="../imgs/prd14.jpg" alt="" />
        <div>
          <div>
            <p className="font-bold text-xl">H&M Clothing</p>
            <p className="text-lg text-gray-600">Flared fine-knit leggings</p>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">₹. 1,499</span>
              <span className="line-through text-gray-400">₹. 1,999</span>
              <span className="text-custom font-semibold">60%</span>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-5 w-full">
        {[1, 1, 1, 1, 1].map((item) => (
          <div>
            <ReviewCard className="space-y-5" />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Review;
