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
import { PriceChange } from "@mui/icons-material";
import customTheme from "../../../Theme/customTheme";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpandColor = () => {
    setExpandColor(!expandColor);
  };

  const updateFilterParams = (e) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    console.log("clear all filters", searchParams);
    searchParams.forEach((value, key) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        {" "}
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
              <RadioGroup aria-labelledby="color" defaultValue="" name="color">
                {colors
                  .slice(0, expandColor ? colors.length : 5)
                  .map((item) => (
                    <FormControlLabel
                      value={item.name}
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-3">
                          <p>{item.name}</p>
                          <p
                            style={{ backgroundColor: item.hex }}
                            className={`h-5 w-5 rounded-full border`}
                          ></p>
                        </div>
                      }
                    />
                  ))}

                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </ThemeProvider>
          </FormControl>
          <div>
            <button
              onClick={handleExpandColor}
              className="text-custom cursor-pointer hover:text-customhov flex items-center "
            >
              {expandColor ? "hide" : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>

        <Divider />

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
              {price.map((item, index) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
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
              {discount.map((item, index) => (
                <FormControlLabel
                  key={item.name}
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
