import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { LocalDining } from "@mui/icons-material";

const initialState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};

export const fetchHomePageData = createAsyncThunk(
  "home.fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home-categories");
      console.log("Home page", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);

export const createHomeCategories = createAsyncThunk(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      console.log("home categories", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);
