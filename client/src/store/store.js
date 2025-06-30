import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice";
import mealReducer from "./slice/meal/mealSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mealsAndExercise: mealReducer,
  },
});
export default store;
