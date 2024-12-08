import React from "react";
import { Box, Button } from "@mui/material";

const AddressCard = ({ address, onSelect }) => {
  return (
    <Box
      className="space-y-3 p-4 border rounded-md cursor-pointer hover:border-primary"
      onClick={() => onSelect(address)}
    >
      <div className="border p-4 rounded-md space-y-3">
        <h3 className="font-semibold">{address.name}</h3>
        <p>{address.streetAddress}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>{address.country}</p>
        <p>{address.zipCode}</p>
      </div>

      <Button
        variant="outlined"
        fullWidth
        size="small"
        onClick={() => onSelect(address)}
      >
        Use this address
      </Button>
    </Box>
  );
};

export default AddressCard;
