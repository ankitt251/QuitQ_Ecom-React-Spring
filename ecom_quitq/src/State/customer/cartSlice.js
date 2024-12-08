import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../Util/sumCartItemMrpPrice";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("http://localhost:8090/api/cart", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Cart fetched", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch user cart", error.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "http://localhost:8090/api/cart/add", // Replace with your actual API endpoint
        request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error in add cart", error.response);
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `http://localhost:8090/api/cart/delete/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to delete cart item");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `http://localhost:8090/api/cart/update/${cartItemId}`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return { cartItemId, updatedData: response.data }; // Send cartItemId and updated data back
    } catch (error) {
      return rejectWithValue("Failed to update cart item");
    }
  }
);

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle", // Can be 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the item to the cart (you can modify this to merge or update the cart)
        state.items.push(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item) => item.id !== action.meta.arg.cartItemId
          );
          const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
          const sellingPrice = sumCartItemSellingPrice(
            state.cart?.cartItems || []
          );
          state.cart.totalSellingPrice = sellingPrice;
          state.cart.totalMrpPrice = mrpPrice;
        }
        state.loading = false;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { cartItemId, updatedData } = action.payload;
        if (state.cart) {
          const itemIndex = state.cart.cartItems.findIndex(
            (item) => item.id === cartItemId
          );
          if (itemIndex !== -1) {
            state.cart.cartItems[itemIndex] = {
              ...state.cart.cartItems[itemIndex],
              ...updatedData,
            };
          }
          const mrpPrice = sumCartItemMrpPrice(state.cart.cartItems);
          const sellingPrice = sumCartItemSellingPrice(state.cart.cartItems);
          state.cart.totalSellingPrice = sellingPrice;
          state.cart.totalMrpPrice = mrpPrice;
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

export const { resetCartState } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
