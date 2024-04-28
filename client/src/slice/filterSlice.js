import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: null,
  searchString: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, actions) => {
      state.filter = actions.payload;
    },
    removeAllFilter: (state) => {
      state.filter = null;
    },
    editSearchString: (state, actions) => {
      state.searchString = actions.payload;
    },
  },
});

export const { addFilter, removeAllFilter, editSearchString } = filterSlice.actions;

export default filterSlice.reducer;
