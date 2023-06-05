import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getUsers, patchUsers, postUsers } from "../api/users";

const setLoading = (state) => {
  state.loading = false;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, setLoading);
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, setError);
    builder.addCase(postUsers.pending, setLoading);
    builder.addCase(postUsers.fulfilled, (action) => {
      console.log(action.payload);
      message.success("User added successfully!");
    });
    builder.addCase(postUsers.rejected, setError);
    builder.addCase(patchUsers.pending, setLoading);
    builder.addCase(patchUsers.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(patchUsers.rejected, setError);
  },
});

export default slice.reducer;
