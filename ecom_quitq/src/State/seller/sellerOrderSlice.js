import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchSellerOrder = createAsyncThunk(
  "sellerOrders/fetchSellerOrder",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `http://localhost:8090/api/seller/orders`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Fetch seller orders", response.data);
      return response.data;
    } catch (e) {
      console.log("Error ", e.response);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  `sellersOrders/updateOrderStatus`,
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Order status updated", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "sellerOrders/deleteOrder",
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/seller/orders/${orderId}/delete`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...action.payload }; // Spread to update only the changed properties
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.meta.arg.orderId
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerOrderSlice.reducer;
