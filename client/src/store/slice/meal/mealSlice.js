import { createSlice } from "@reduxjs/toolkit";
import { createPlan, fetchPlan } from "./mealActions";

const initialState = {
  mealsAndExercise: [],
  loading: false,
  error: null,
};

const mealSlice = createSlice({
  name: "mealsAndExercise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsAndExercise = action.payload.plan || [];
        state.error = null;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsAndExercise = action.payload.plan || [];
        state.error = null;
      })
      .addCase(fetchPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mealSlice.reducer;
