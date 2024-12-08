import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import reducer from "../seller/sellerSlice";

export const updateHomeCategory = createAsyncThunk(
  "homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/catg/home-category/${id}`, data);
      console.log("category updated", response);
      return response.data;
    } catch (error) {
      console.log("error in update home category", error);
    }
  }
);

export const fetchHomeCategories = createAsyncThunk(
  "homeCategory/fetchHomeCategories",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/catg/admin/home-categories`);
      console.log("Categories", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error.response);
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};

const orderSlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryUpdated = true;

        const index = state.categories.findIndex(
          (category) => category.id === action.payload
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false;
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchHomeCategories.reducer;
