import React from "react";
import { Box } from "@mui/material";

const UserAddressCard = ({
  name,
  streetAddress,
  city,
  state,
  pincode,
  mobile,
}) => {
  return (
    <Box className="p-5 border rounded-md flex">
      <div className="space-y-3">
        <h1>{name}</h1>
        <p className="w-[320px]">
          {streetAddress}, {city}, {state}, {pincode}
        </p>
        <p>
          <strong>Mobile :</strong> {mobile}
        </p>
      </div>
    </Box>
  );
};

export default UserAddressCard;
