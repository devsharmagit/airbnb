import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_ME } from "../services/api/apiEndpoints";
import { UserType } from "../types/user";

export interface UserStateType {
  user: null | UserType;
  loading: boolean;
  error: null;
}

const initialState: UserStateType = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(GET_ME, {
      withCredentials: true,
    });
    return data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const userSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
