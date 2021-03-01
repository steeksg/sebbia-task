import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  (endPoint, thunkAPI) => {
    return fetch(endPoint)
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((res) => res);
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { code: null, list: [], isLoaded: false, error: null },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.isLoaded = true;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.list = action.payload.list;
      state.code = action.payload.code;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.isLoaded = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
