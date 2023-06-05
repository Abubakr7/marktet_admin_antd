import { combineReducers } from "@reduxjs/toolkit";
import categories from "./categories";
import brands from "./brands";
import subCategories from "./subCategories";
import users from "./users";
import products from "./products";

export const rootReducer = combineReducers({
  categories,
  brands,
  subCategories,
  users,
  products,
});
