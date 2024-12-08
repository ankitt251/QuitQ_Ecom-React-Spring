import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const initialState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

export const fetchTransactionBySeller = createAsyncThunk(
  "transactions/fetchTransactionsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/transaction/seller`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetchTransactionsBySeller", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch transactions");
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionBySeller.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.loading = false;
        state.transactions = action.payload;
      })

      .addCase(fetchTransactionBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
