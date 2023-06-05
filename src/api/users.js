import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("users");

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const postUsers = createAsyncThunk(
  "users/postUsers",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.post("users", user);

      dispatch(getUsers());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const patchUsers = createAsyncThunk(
  "users/patchUsers",
  async ({ brand, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.patch(`users/${id}`, brand);

      dispatch(getUsers());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
