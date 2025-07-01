import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPlan = createAsyncThunk(
  "meal-plan/create",
  async (credentials, thunkAPI) => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("User is not authenticated");
    }

    try {
      const response = await axios.post(
        "https://ai-powered-diet-planner.onrender.com/api/meal-plan/create",
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create meal plan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchPlan = createAsyncThunk(
  "meal-plan/suggestions",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("User is not authenticated");
    }
    try {
      const response = await axios.post(
        "https://ai-powered-diet-planner.onrender.com/api/meal-plan/suggestions",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch meal plan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
