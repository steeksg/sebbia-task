import { combineReducers } from "@reduxjs/toolkit";

import categoriesSliceReducer from "./slices/categories";
import newsSliceReducer from "./slices/news";

const rootReducer = combineReducers({
  categories: categoriesSliceReducer,
  news: newsSliceReducer,
});

export default rootReducer;
