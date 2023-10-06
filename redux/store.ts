import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const makeStore = () =>
  configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export default makeStore;
