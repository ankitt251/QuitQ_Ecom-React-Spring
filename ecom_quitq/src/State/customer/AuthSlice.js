import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { useNavigate } from "react-router-dom";

export const signin = createAsyncThunk(
  "auth/sign",
  async (loginRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(
        "http://localhost:8090/api/user/signin",
        loginRequest
      );
      localStorage.setItem("jwt", response.data.jwt);
      console.log("Login Success", response.data);

      // Dispatch the action to fetch user profile right after successful login
      dispatch(fetchUserProfile({ jwt: response.data.jwt }));

      return response.data; // Return response for further handling
    } catch (error) {
      console.log("Login error:", error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "/api/user/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "http://localhost:8090/api/user/signup",
        signupRequest
      );
      console.log(response.data);
      localStorage.setItem("jwt", response.data.jwt);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "/auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("http://localhost:8090/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User profile", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
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

const initialState = {
  jwt: null,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log("User data with addresses:", action.payload);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
