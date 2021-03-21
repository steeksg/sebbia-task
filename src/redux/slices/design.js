import { createSlice } from "@reduxjs/toolkit";

const designSlice = createSlice({
  name: "design",
  initialState: { namePage:"" },
  reducers: {
    setNamePage: (state, action) => {
      state.namePage = action.payload;
    },
  },
});

const { actions, reducer } = designSlice;

export const { setNamePage} = actions;

export default reducer;
