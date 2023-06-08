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
      const response = await axiosRequest.post("products", product);
      if (!response.statusCode >= 400) {
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
  async ({ product, id, callback }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.patch(`products/${id}`, product);

      if (!response.statusCode >= 400) {
        return rejectWithValue(response.status);
      }
      dispatch(getProducts());
      callback();
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

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(`products/${id}`);

      return data;
    } catch (error) {
      rejectWithValue(err);
    }
  }
);
