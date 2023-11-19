import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isSignedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signIn(state) {
      state.isSignedIn = true;
    },
    signOut(state) {
      state.isSignedIn = false;
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
