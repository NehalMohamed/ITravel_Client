// src/redux/Slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, isTokenExpired } from "../../utils/tokenUtils";

const BOOKING_URL = process.env.REACT_APP_BOOKING_API_URL;

// Create axios instance with interceptors
const apiClient = axios.create();

// Request interceptor to add auth token and handle expiration
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.requiresAuth) {
      // Token is expired or missing for an auth-required request
      throw new axios.Cancel('Token expired or missing');
    }
    
    const lang = localStorage.getItem("lang") || "en";
    config.headers["Accept-Language"] = lang;
    config.headers["Content-Type"] = "application/json";
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.message === 'Token expired or missing') {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('authError', { detail: 'Token expired' }));
    }
    return Promise.reject(error);
  }
);

const getAuthHeaders = () => {
  return { requiresAuth: true };
};

// Async thunk for fetching wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (params, { rejectWithValue }) => {
    try {
      // Check token before making the request
    //   const token = getToken();
    //   if (!token || isTokenExpired(token)) {
    //     return rejectWithValue({ 
    //       message: "Unauthorized - Please login again",
    //       status: 401 
    //     });
    //   }
      
      const { data } = await apiClient.post(
        `${BOOKING_URL}/GetClientWishList`,
        params,
        getAuthHeaders()
      );
      return data;
    } catch (e) {
      if (axios.isCancel(e) || e.message === 'Token expired or missing' || e.response?.status === 401) {
        return rejectWithValue({ 
          message: "Unauthorized - Please login again",
          status: 401 
        });
      }
      return rejectWithValue({ 
        message: e.response?.data?.message || "Fetch wishlist failed",
        status: e.response?.status 
      });
    }
  }
);

// Async thunk for adding item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (wishlistData, { rejectWithValue }) => {
    try {
      // Check token before making the request
      const token = getToken();
      if (!token) {
        return rejectWithValue({ 
          message: "Unauthorized - Please login again",
          status: 401,
          errors: ["Authentication required"]
        });
      }
      
      const { data } = await apiClient.post(
        `${BOOKING_URL}/AddTripToWishList`,
        wishlistData,
        getAuthHeaders()
      );
      
      return { ...data, trip_id: wishlistData.trip_id };
    } catch (e) {
      if (e.message === 'Token expired or missing' || e.response?.status === 401) {
        return rejectWithValue({ 
          message: "Unauthorized - Please login again",
          status: 401,
          errors: ["Authentication required"]
        });
      }
      
      return rejectWithValue({ 
        message: e.response?.data?.message || "Add to wishlist failed",
        status: e.response?.status,
        errors: e.response?.data?.errors || ["Operation failed"]
      });
    }
  }
);



const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
    operation: {
      loading: false,
      error: null,
      success: false
    }
  },
  reducers: {
    resetWishlistOperation: (state) => {
      state.operation.loading = false;
      state.operation.error = null;
      state.operation.success = false;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    clearAuthError: (state) => {
      if (state.error?.status === 401) {
        state.error = null;
      }
      if (state.operation.error?.status === 401) {
        state.operation.error = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.operation.loading = true;
        state.operation.error = null;
        state.operation.success = false;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.operation.loading = false;
        state.operation.error = null;
        state.operation.success = true;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.operation.loading = false;
        state.operation.error = action.payload;
        state.operation.success = false;
      })
  }
});

export const { resetWishlistOperation, clearWishlist, clearAuthError} = wishlistSlice.actions;
export default wishlistSlice.reducer;