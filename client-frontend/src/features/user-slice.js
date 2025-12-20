import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/clients/me`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred in getCurrentUser"
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/clients/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred in login"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/clients/logout`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred in logout"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin" ? true : false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin" ? true : false;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    });
  },
});

export default userSlice.reducer;
