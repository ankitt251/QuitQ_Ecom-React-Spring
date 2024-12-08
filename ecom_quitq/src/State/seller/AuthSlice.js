import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",

  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response);
    } catch (error) {
      console.log("error in seller profile- - -", error);
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      console.log("Logout Success");
      navigate("/");
    } catch (error) {
      console.log("error - - - ", error);
    }
  }
);
