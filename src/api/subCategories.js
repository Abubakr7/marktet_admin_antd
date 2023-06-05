import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getSubCategories = createAsyncThunk(
  "subCategories/getSubCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("subCategories");
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const postSubCategory = createAsyncThunk(
  "subCategories/postSubCategory",
  async (subCategory, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.post("subCategories", subCategory);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      dispatch(getSubCategories());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const patchSubCategory = createAsyncThunk(
  "subCategories/patchSubCategory",
  async ({ subCategory, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.patch(
        `subCategories/${id}`,
        subCategory
      );

      dispatch(getSubCategories());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const removeSubCategory = createAsyncThunk(
  "subCategories/removeSubCategory",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.delete(`subCategories/${id}`);

      dispatch(getSubCategories());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
