import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentAdmin: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  successMessage: null,
  applications: [],
  currentApplication: null,
  stats: null,
  filters: {
    status: '',
    searchTerm: '',
    sortBy: 'createdAt',
  },
};

export const getCurrentAdmin = createAsyncThunk(
  "user/getCurrentAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admins/me`,
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
        `${process.env.REACT_APP_API_BASE_URL}/admins/login`,
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
        `${process.env.REACT_APP_API_BASE_URL}/admins/logout`,
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetAuthState: (state) => {
      return initialState;
    },
  },
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
      state.successMessage = "Login successful";
      state.error = null;
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
      state.error = null;
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
