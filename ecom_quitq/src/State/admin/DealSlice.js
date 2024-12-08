import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const initialState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Created deal", response.data);

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Get All deal", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);

export const deleteDeal = createAsyncThunk(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Deal deleted", response.data);
    } catch (error) {
      console.log("Error", error.response);
    }
  }
);
