import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_CLIENT_API_URL;

const getAuthHeaders = () => {
  let lang = localStorage.getItem("lang");
  return {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang
    },
  };
};

// ---------- Thunks ----------
export const fetchTripsAll = createAsyncThunk(
  "trips/fetchTripsAll",
  async (
    { destination_id = 0, lang_code = "en", currency_code = "USD" } = {},
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/GetTripsAll`, 
        {
        destination_id,
        lang_code,
        show_in_top: false,
        show_in_slider: false,
        currency_code,
      },
      getAuthHeaders()
    );
      return data;
    } catch (e) {
      return rejectWithValue(e?.message || "Fetch trips failed");
    }
  }
);

export const fetchPickupsForTrip = createAsyncThunk(
  "trips/fetchPickupsForTrip",
  async ({ trip_id, trip_type = 1, lang_code = "en" }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/GetPickupsForTrip`, 
        {
        trip_id,
        trip_type,
        lang_code,
      },
      getAuthHeaders()
    );
      return { trip_id, pickups: data };
    } catch (e) {
      return rejectWithValue(e?.message || "Fetch pickups failed");
    }
  }
);

export const fetchClientsReviews = createAsyncThunk(
  "trips/fetchClientsReviews",
  async (
    { trip_id, trip_type = 1, pageNumber = 0, pageSize = 5 },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/GetClientsReviews`, 
        {
        trip_id,
        trip_type,
        pageNumber,
        pageSize,
      },
      getAuthHeaders()
    );
      return { trip_id, pageNumber, pageSize, items: data };
    } catch (e) {
      return rejectWithValue(e?.message || "Fetch reviews failed");
    }
  }
);

// ---------- Helpers ----------
const normalizeTrips = (list) => {
  const byId = {};
  const allIds = [];
  list?.forEach((t) => {
    byId[t.trip_id] = t;
    allIds.push(t.trip_id);
  });
  return { byId, allIds };
};

// ---------- Slice ----------
const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    byId: {},
    allIds: [],
    pickupsByTrip: {},
    reviewsByTrip: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchTripsAll.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchTripsAll.fulfilled, (s, a) => {
      s.loading = false;
      const norm = normalizeTrips(a.payload || []);
      s.byId = norm.byId;
      s.allIds = norm.allIds;
    });
    b.addCase(fetchTripsAll.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    });

    b.addCase(fetchPickupsForTrip.fulfilled, (s, a) => {
      const { trip_id, pickups } = a.payload;
      s.pickupsByTrip[trip_id] = pickups;
    });

    b.addCase(fetchClientsReviews.fulfilled, (s, a) => {
      const { trip_id, pageNumber, pageSize, items } = a.payload;
      const prev = s.reviewsByTrip[trip_id]?.items || [];
      const merged = pageNumber === 0 ? items : [...prev, ...items];
      s.reviewsByTrip[trip_id] = { items: merged, pageNumber, pageSize };
    });
  },
});

export default tripsSlice.reducer;

// ---------- Selectors ----------
const selectTripsState = (state) => state.trips;

export const selectAllTrips = createSelector(
  selectTripsState,
  (s) => s.allIds.map((id) => s.byId[id])
);

export const selectTripById = (tripId) =>
  createSelector(selectTripsState, (s) => s.byId[tripId]);

export const selectSliderTrips = createSelector(selectAllTrips, (trips) =>
  trips.filter((t) => t.show_in_slider === true)
);

export const selectTopTrips = createSelector(selectAllTrips, (trips) =>
  trips.filter((t) => t.show_in_top === true)
);

export const selectPickupsForTrip = (tripId) =>
  createSelector(selectTripsState, (s) => s.pickupsByTrip[tripId] || []);

export const selectReviewsForTrip = (tripId) =>
  createSelector(selectTripsState, (s) => s.reviewsByTrip[tripId]?.items || []);

export const selectReviewsMeta = (tripId) =>
  createSelector(selectTripsState, (s) => s.reviewsByTrip[tripId] || { pageNumber: 0, pageSize: 5 });
