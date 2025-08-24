// src/redux/Slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkAUTH } from "../../helper/helperFN";
import { createAuthError } from "../../utils/authError";

const BOOKING_URL = process.env.REACT_APP_BOOKING_API_URL;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  let lang = localStorage.getItem("lang") || "en";
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  };
};

// Async thunk for fetching wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (params, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }

    try {
      const response = await axios.post(
        `${BOOKING_URL}/GetClientWishList`,
        params,
        getAuthHeaders()
      );
      
      if (response.data.success === false) {
        return rejectWithValue(response.data.errors || "Failed to fetch wishlist");
      }
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(error.response?.data?.errors || error.message);
    }
  }
);

// Async thunk for adding item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (wishlistData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }

    try {
      const response = await axios.post(
        `${BOOKING_URL}/AddTripToWishList`,
        wishlistData,
        getAuthHeaders()
      );
      
      if (response.data.success === false) {
        return rejectWithValue(response.data.errors || "Failed to add to wishlist");
      }
      
      return { ...response.data, trip_id: wishlistData.trip_id };
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(error.response?.data?.errors || error.message);
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
      });
  }
});

export const { resetWishlistOperation, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;