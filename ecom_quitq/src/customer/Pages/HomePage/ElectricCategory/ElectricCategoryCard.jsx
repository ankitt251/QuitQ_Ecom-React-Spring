import React from "react";
import { useNavigate } from "react-router-dom";

const ElectricCategoryCard = ({ imgSrc, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${title}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-80 overflow-hidden">
      <div className="cursor-pointer" onClick={handleClick}>
        <img
          className="object-cover h-[500px] w-full"
          src={imgSrc}
          alt={title}
        />
        <div className="py-4">
          <h3 className="text-center text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ElectricCategoryCard;
