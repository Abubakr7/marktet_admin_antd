import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
