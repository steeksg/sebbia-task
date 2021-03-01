import { combineReducers } from "@reduxjs/toolkit";

import categoriesSliceReducer from "./slices/categories";

const rootReducer = combineReducers({ categories: categoriesSliceReducer });

export default rootReducer;
