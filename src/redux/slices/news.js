import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk(
  "categories/fetchNews",
  (endPoint, thunkAPI) => {
    return fetch(endPoint)
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((res) => res);
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    code: null,
    list: null,
    isLoaded: false,
    error: null,
    currentCategoryID: 0,
    selectedNews:0,
    paginationActivity:{}
  },
  reducers: {
    setCategoryID: (state, action) => {
      state.currentCategoryID = action.payload;
    },
    setSelectedNews: (state, action) => {
      state.selectedNews = action.payload;
    },
    setPaginationActivity: (state, action) => {
      state.paginationActivity = {...state.paginationActivity, ...action.payload};
    },
  },
  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.isLoaded = true;
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.list = action.payload.list;
      state.code = action.payload.code;
    },
    [fetchNews.rejected]: (state, action) => {
      state.isLoaded = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = newsSlice;

export const { setCategoryID, setSelectedNews, setPaginationActivity } = actions;

export default reducer;
