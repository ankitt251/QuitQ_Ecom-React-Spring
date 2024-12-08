import React from "react";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../State/Store";

const Deal = () => {
  const { customer } = useAppSelector((store) => store);

  return (
    <div className="py-5 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-6 font-sans">
        Deals of the Day
      </h2>
      <div className="flex items-center gap-4">
        {[1, 1, 1, 1, 1, 1].map((item) => (
          <DealCard />
        ))}
      </div>
    </div>
  );
};

export default Deal;
