import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../api/categories";
import { getBrands, patchBrands, postBrands } from "../api/brands";
import { message } from "antd";

const setLoading = (state) => {
  state.loading = false;
};

const setError = (state, action) => {
  state.loading = false;
  console.log(action.payload, "sss");
  state.error = action.payload;
};
const slice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, setLoading);
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    builder.addCase(getBrands.rejected, setError);
    builder.addCase(postBrands.pending, setLoading);
    builder.addCase(postBrands.fulfilled, (action) => {
      console.log(action.payload);
      message.success("Brand added successfully!");
    });
    builder.addCase(postBrands.rejected, setError);
    builder.addCase(patchBrands.pending, setLoading);
    builder.addCase(patchBrands.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(patchBrands.rejected, setError);
  },
});

export default slice.reducer;
