import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  isError: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state,action) => {
        state.currentUser = action.payload
        state.isAuthenticated = true;
        state.isLoading = false
        state.isError = null 
    }
  },
});
