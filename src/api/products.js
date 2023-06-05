import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("products");

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (subCategory, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.post("products", subCategory);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      dispatch(getProducts());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const patchProduct = createAsyncThunk(
  "products/patchProduct",
  async ({ product, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.patch(`products/${id}`, product);

      dispatch(getProducts());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.delete(`products/${id}`);

      dispatch(getProducts());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
