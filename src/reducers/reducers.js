import { combineReducers } from "@reduxjs/toolkit";
import categories from "./categories";
import brands from "./brands";
import subCategories from "./subCategories";

export const rootReducer = combineReducers({
  categories,
  brands,
  subCategories,
});
