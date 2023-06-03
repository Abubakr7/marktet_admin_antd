import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getBrands = createAsyncThunk(
  "brands/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("brands");

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const postBrands = createAsyncThunk(
  "brands/postBrands",
  async (brand, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.post("brands", brand);

      dispatch(getBrands());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const patchBrands = createAsyncThunk(
  "brands/patchBrands",
  async ({ brand, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.patch(`brands/${id}`, brand);

      dispatch(getBrands());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
