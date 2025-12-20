import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentAdmin: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const getCurrentAdmin = createAsyncThunk(
  "user/getCurrentAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admins/me`,
        {
          withCredentials: true,
        }
      );
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred in getCurrentAdmin"
      );
    }
  }
);

export const login = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admins/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred in loginAdmin"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admins/logout`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred in logoutAdmin"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAdmin = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.currentAdmin = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    builder.addCase(getCurrentAdmin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(getCurrentAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAdmin = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getCurrentAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentAdmin = null;
      state.isAuthenticated = false;
    });
  },
});

export default adminSlice.reducer;
