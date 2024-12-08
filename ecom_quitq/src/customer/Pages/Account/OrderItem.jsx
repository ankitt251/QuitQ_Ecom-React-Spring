import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ item, order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}/${item.id}`)}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: "primary" }}>
            <ElectricBolt />
          </Avatar>
        </div>

        <div>
          <h1 className="font-bold text-custom">PENDING</h1>
          <p>Arriving By {order.deliveryDate}</p>
        </div>
      </div>

      <div className="p-5 bg-sub flex gap-3">
        <div>
          <img className="w-[70px]" src={item.product.images[0]} alt="" />
        </div>

        <div className="w-full space-y-2">
          <h1 className="font-bold">
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p>{item.product.title}</p>
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
