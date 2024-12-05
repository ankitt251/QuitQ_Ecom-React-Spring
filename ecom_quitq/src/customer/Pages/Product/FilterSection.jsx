import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../data/Filter/colors";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useSearchParams } from "react-router-dom";
import customTheme from "../../../Theme/customTheme";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpandColor = () => {
    setExpandColor(!expandColor);
  };

  const updateFilterParams = (e) => {
    const { value, name } = e.target;
    const newSearchParams = new URLSearchParams(searchParams); // Create a new instance
    if (value) {
      newSearchParams.set(name, value);
    } else {
      newSearchParams.delete(name);
    }
    setSearchParams(newSearchParams); // Update the search params
  };

  const clearAllFilters = () => {
    const newSearchParams = new URLSearchParams(); // Reset search params
    setSearchParams(newSearchParams);
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilters}
          size="small"
          sx={{ color: "#b88e2f" }}
          className="text-custom cursor-pointer font-semibold"
        >
          clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        {/* Color Filter Section */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#b88e2f",
                pb: "14px",
                "&.Mui-focused": {
                  color: "#b88e2f",
                },
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <ThemeProvider theme={customTheme}>
              <RadioGroup
                aria-labelledby="color"
                defaultValue=""
                onChange={updateFilterParams}
                name="color"
              >
                {colors
                  .slice(0, expandColor ? colors.length : 5)
                  .map((item) => (
                    <FormControlLabel
                      key={item.name} // Ensure unique key
                      value={item.name}
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-3">
                          <p>{item.name}</p>
                          <p
                            style={{ backgroundColor: item.hex }}
                            className="h-5 w-5 rounded-full border"
                          ></p>
                        </div>
                      }
                    />
                  ))}
              </RadioGroup>
            </ThemeProvider>
          </FormControl>
          <div>
            <button
              onClick={handleExpandColor}
              className="text-custom cursor-pointer hover:text-sub flex items-center"
            >
              {expandColor ? "hide" : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>
        <Divider />
        {/* Price Filter Section */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: "#B88E2F",
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              aria-labelledby="price"
              defaultValue=""
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name} // Ensure unique key
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        {/* Discount Filter Section */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: "#B88E2F",
              }}
              className="text-2xl font-semibold"
              id="brand"
            >
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              aria-labelledby="brand"
              defaultValue=""
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name} // Ensure unique key
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
