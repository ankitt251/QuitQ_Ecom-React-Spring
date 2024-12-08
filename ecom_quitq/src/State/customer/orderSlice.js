import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchUserOrderHistory = createAsyncThunk(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "http://localhost:8090/api/order/myorders",
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Order history fetched ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error ", error.response);
      return rejectWithValue(
        error.response.data.error || "Failed to fetch order history"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `http://localhost:8090/api/order/${orderId}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Order fetched", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch order");
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ shippingAddress, jwt, paymentGateway }, { rejectWithValue }) => {
    console.log("payment gateway", paymentGateway);

    try {
      const response = await api.post(
        "/api/order/createorder",
        shippingAddress,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { paymentMethod: paymentGateway },
        }
      );
      console.log(jwt);

      console.log("Order created ", response.data);
      if (response.data.paymentLinkUrl) {
        window.location.href = response.data.paymentLinkUrl;
      }
      return response.data;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue("Failed to create order");
    }
  }
);

export const fetchOrderItemById = createAsyncThunk(
  "orders/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `http://localhost:8090/api/order/item/${orderItemId}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Order item fetched", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to create order");
    }
  }
);

export const paymentSuccess = createAsyncThunk(
  "orders/paymentSuccess",
  async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `http://localhost:8090/api/payment/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: { paymentLinkId },
        }
      );
      console.log("Payment success", response.data);

      return response.data;
    } catch (error) {
      console.log("Error", error.response);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `http://localhost:8090/api/order/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      console.log("Cancel order ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error.response);
    }
  }
);

const initialState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.paymentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload; // or appropriate property
      })
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payment Successful: ", action.payload);
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        state.orderCanceled = true;
        state.currentOrder = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
