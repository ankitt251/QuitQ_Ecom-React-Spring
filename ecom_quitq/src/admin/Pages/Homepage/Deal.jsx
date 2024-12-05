import { Button } from "@mui/material";
import React, { useState } from "react";

const tabs = ["Deals", "Category", "Create Deal"];

const Deal = () => {
  const [activeTab, setActiveTab] = useState();

  return (
    <div>
      <div>
        {tabs.map((item) => (
          <Button
            onClick={() => setActiveTab(item)}
            variant={activeTab == item ? "contained" : "outlined"}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Deal;
