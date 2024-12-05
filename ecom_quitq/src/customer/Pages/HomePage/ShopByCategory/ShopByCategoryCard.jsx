import React from "react";

const ShopByCategoryCard = () => {
  return (
    <div className="flex gap-3 flex-col justify-center items-center group cursor-pointer">
      <div className="w-[150px] h-[150px] rounded-full">
        <img
          className="group-hover:scale-95 transition-transform
        transform-duration-700 object-cover object-top h-full w-full"
          src="../imgs/catg_men.png"
          alt=""
        />
      </div>
      <h1>Mens Tshirt</h1>
    </div>
  );
};

export default ShopByCategoryCard;
