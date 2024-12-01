import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

const OrderItem = () => {
  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: "primary" }}>
            <ElectricBolt />
          </Avatar>
        </div>

        <div>
          <h1 className="font-bold text-custom">PENDING</h1>
          <p>Arriving By Sun, 7th Dec</p>
        </div>
      </div>

      <div className="p-5 bg-sub flex gap-3">
        <div>
          <img className="w-[70px]" src="../imgs/prd1.jpg" alt="" />
        </div>

        <div className="w-full space-y-2">
          <h1 className="font-bold">H&M Clothing</h1>
          <p>
            Leggings in a soft, fine knit with a high, elasticated waist and
            legs with flared hems.
          </p>
          <p>
            <strong>size: </strong>
            FREE
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
