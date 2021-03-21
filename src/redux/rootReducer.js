import { combineReducers } from "@reduxjs/toolkit";

import categoriesSliceReducer from "./slices/categories";
import newsSliceReducer from "./slices/news";
import detailsSliceReducer from "./slices/details";
import designSliceReducer from "./slices/design";

const rootReducer = combineReducers({
  categories: categoriesSliceReducer,
  news: newsSliceReducer,
  details: detailsSliceReducer,
  design: designSliceReducer,
});

export default rootReducer;
