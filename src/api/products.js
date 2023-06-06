import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";
import { message } from "antd";

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
  async ({ product, callback }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.post("productss", product);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      dispatch(getProducts());
      callback();
      return response.data;
    } catch (err) {
      message.error("Something went wrong");
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
