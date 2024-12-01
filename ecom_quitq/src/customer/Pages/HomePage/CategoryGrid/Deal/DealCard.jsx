import React from "react";

const DealCard = () => {
  return (
    <div className="w-[16rem] cursor-pointer">
      <img
        className="object-cover border-x-[7px] border-t-[7px] border-custom h-[15rem] w-full"
        src="../imgs/Deal_Jacket.avif"
        alt=""
      />
      <div className="border-4 border-custom bg-sub text-black p-2 text-center">
        <p className="text-lg font-semibold"> Mens Casual</p>
        <p className="text-2xl font-bold">20% OFF</p>
        <p className="text-balance text-lg">Shop Now</p>
      </div>
    </div>
  );
};

export default DealCard;
