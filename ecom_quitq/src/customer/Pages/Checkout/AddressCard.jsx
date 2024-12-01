import { Radio } from "@mui/material";
import React from "react";

const AddressCard = () => {
  const handleChange = (event) => {
    console.log(event.target.checked);
  };

  return (
    <div className="p-5 border rounded-md flex">
      <div>
        <Radio
          checked={true}
          onChange={handleChange}
          value=""
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>Ankit</h1>
        <p className="w-[320px]"> Selene Park, 123 Main St, Pune, IND 12345</p>
        <p>
          <strong>Mobile :</strong> 789456123
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
