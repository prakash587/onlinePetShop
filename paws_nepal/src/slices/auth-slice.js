import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  role: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    replaceLoggedInState(state, action) {
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;
