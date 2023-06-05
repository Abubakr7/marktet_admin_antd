import { createSlice } from "@reduxjs/toolkit";
import {
  getSubCategories,
  patchSubCategory,
  postSubCategory,
  removeSubCategory,
} from "../api/subCategories";
import { message } from "antd";

const setLoading = (state) => {
  state.loading = true;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const slice = createSlice({
  name: "subCategories",
  initialState: {
    subCategories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getSubCategories.pending, setLoading);
    builder.addCase(getSubCategories.fulfilled, (state, action) => {
      state.subCategories = action.payload;
      state.loading = false;
    });
    builder.addCase(getSubCategories.rejected, setError);
    builder.addCase(postSubCategory.pending, setLoading);
    builder.addCase(postSubCategory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postSubCategory.rejected, setError);
    builder.addCase(patchSubCategory.pending, setLoading);
    builder.addCase(patchSubCategory.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(patchSubCategory.rejected, setError);
    builder.addCase(removeSubCategory.pending, setLoading);
    builder.addCase(removeSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      message.success("Successfully deleted!");
    });
    builder.addCase(removeSubCategory.rejected, setError);
  },
});

export default slice.reducer;
