import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid2, IconButton, Rating } from "@mui/material";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid2 container spacing={4}>
        <Grid2 item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "primary" }}
            ></Avatar>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Ankit</p>
              <p className="opacity-70">
                Thursday, 28 November 2024 2:32:51 PM
              </p>
            </div>
            <Rating readOnly value={4.3} precision={0.1} />
            <p>Value for money product, good quality</p>
            <div>
              <img
                className="w-24 h-24 object-cover"
                src="../imgs/prd12.jpg"
                alt=""
              />
            </div>
          </div>
        </Grid2>
      </Grid2>
      <div>
        <IconButton>
          <Delete sx={{ color: "red" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
