import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProducts = createAsyncThunk(
  "sellers/fetchSellerProducts",

  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/seller/products`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      console.log("Seller Products", data);

      return data;
    } catch (error) {
      console.log("error - - - ", error);
      throw error;
    }
  }
);

export const createProduct = createAsyncThunk(
  "sellerProduct/createProduct",

  async (args, { rejectWithValue }) => {
    const { request, jwt } = args;
    try {
      const response = await api.post(`/seller/products/add-product`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Product created", response.data);
      return response.data;
    } catch (error) {
      console.log("error - - -", error);
      //throw error;
    }
  }
);

const initialState = {
  orders: [],
  products: [],
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sellerProductSlice.reducer;
