import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ai-powered-diet-planner.onrender.com/api/auth/signup",
        credentials,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ai-powered-diet-planner.onrender.com/api/auth/login",
        credentials,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogout = createAsyncThunk("auth/logout", async () => {
  return true;
});
