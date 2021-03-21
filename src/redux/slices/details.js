import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetails = createAsyncThunk(
  "details/fetchDetails",
  (endPoint, thunkAPI) => {
    return fetch(endPoint)
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((res) => res);
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState: { code: null, news: null, isLoaded: false, error: null },
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
  extraReducers: {
    [fetchDetails.pending]: (state) => {
      state.isLoaded = true;
    },
    [fetchDetails.fulfilled]: (state, action) => {
      state.news = action.payload.news;
      state.code = action.payload.code;
    },
    [fetchDetails.rejected]: (state, action) => {
      state.isLoaded = false;
      state.error = action.payload;
    },
  },
});


const { actions, reducer } = detailsSlice;

export const {setNews} = actions;

export default detailsSlice.reducer;
