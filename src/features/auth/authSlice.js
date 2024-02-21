import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload;
    },
    logoutAction(state, action) {
      state.token = null;
    },
  },
});

export const { setCredentials, logoutAction } = authSlice.actions;

export default authSlice.reducer;
