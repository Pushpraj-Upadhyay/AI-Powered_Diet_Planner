import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dietaryPreference: {
      type: String,
      default: "standard",
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    targetWeight: {
      type: Number,
      required: true,
    },
    activityLevel: {
      type: String,
      default: "lightly active",
    },
    allergies: {
      type: [String],
      default: [],
    },
    mealFrequency: {
      type: Number,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    lifestyle: {
      type: String,
      default: "Office/Desk Job",
    },
    workSchedule: {
      type: String,

      default: "regular 9-5",
    },
    medicalConditions: {
      type: [String],
      default: [],
    },
    medications: {
      type: [String],
      default: [],
    },
    budget: {
      type: String,
      default: "economy(Rs. 500-2000)",
    },
    plan: {
      type: mongoose.Schema.Types.Mixed, // This can store the generated meal plan
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);
export default MealPlan;
