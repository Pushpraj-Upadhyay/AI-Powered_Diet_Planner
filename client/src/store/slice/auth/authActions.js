import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        credentials
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
        "http://localhost:5000/api/auth/login",
        credentials
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
