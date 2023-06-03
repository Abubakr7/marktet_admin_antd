import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("categories");

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const postCategories = createAsyncThunk(
  "categories/postCategories",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post("categories", category);

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const patchCategory = createAsyncThunk(
  "categories/patchCategory",
  async ({ category, id }) => {
    try {
      const { data } = await axiosRequest.patch(`categories/${id}`, category);

      return data;
    } catch (error) {}
  }
);
