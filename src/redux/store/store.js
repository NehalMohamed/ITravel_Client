import { configureStore } from "@reduxjs/toolkit";
import toursReducer from "./toursSlice";
import authReducer from "../Slices/AuthSlice";
export const store = configureStore({
  reducer: {
    tours: toursReducer,
    auth: authReducer,
  },
});
