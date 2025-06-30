import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout, userSignup } from "./authActions";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  user: null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder //signup pending
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) //signup successfull
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      }) //signup rejected
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      }) //login pending
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) //login successfull
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      }) //login rejected
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      }) //logout user
      .addCase(userLogout.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.userId = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
