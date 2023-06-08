import { createSlice } from "@reduxjs/toolkit";
import {
  getProductById,
  getProducts,
  patchProduct,
  postProduct,
  removeProduct,
} from "../api/products";
import { message } from "antd";

const setLoading = (state) => {
  state.loading = true;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  message.error("Something went wrong");
};
const slice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, setLoading);
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, setError);
    builder.addCase(postProduct.pending, setLoading);
    builder.addCase(postProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postProduct.rejected, setError);
    builder.addCase(patchProduct.pending, setLoading);
    builder.addCase(patchProduct.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(patchProduct.rejected, setError);
    builder.addCase(removeProduct.pending, setLoading);
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = false;
      message.success("Successfully deleted!");
    });
    builder.addCase(removeProduct.rejected, setError);
    builder.addCase(getProductById.pending, setLoading);
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, setError);
  },
});

export default slice.reducer;
