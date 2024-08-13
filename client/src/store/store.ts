import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slice/filterSlice.ts";
import userReducer from "../slice/userSlice.ts";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    user: userReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
