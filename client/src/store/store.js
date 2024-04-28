import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slice/filterSlice.js";
import userReducer from "../slice/userSlice.js";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    user: userReducer,
  },
});
