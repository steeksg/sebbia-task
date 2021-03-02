import { combineReducers } from "@reduxjs/toolkit";

import categoriesSliceReducer from "./slices/categories";
import newsSliceReducer from "./slices/news";
import detailsSliceReducer from "./slices/details";

const rootReducer = combineReducers({
  categories: categoriesSliceReducer,
  news: newsSliceReducer,
  details: detailsSliceReducer,
});

export default rootReducer;
