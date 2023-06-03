import { createSlice } from "@reduxjs/toolkit";
import { getCategories, postCategories } from "../api/categories";

const setLoading = (state) => {
  state.loading = false;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const slice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, setLoading);
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, setError);
    builder.addCase(postCategories.pending, setLoading);
    builder.addCase(postCategories.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postCategories.rejected, setError);
  },
});

export default slice.reducer;
