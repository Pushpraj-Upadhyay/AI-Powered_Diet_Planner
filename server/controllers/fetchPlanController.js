import MealPlan from "../models/mealSchema.js";

export const fetchMealPlan = async (req, res) => {
  try {
    const fetchedData = await MealPlan.findOne({ _id: req.user.id });
    if (!fetchedData) {
      return res.status(404).json({ message: "No plan created yet" });
    }

    const plan = fetchedData.plan;
    return res
      .status(200)
      .json({ message: "Meal plan fetched successfully", plan });
  } catch (error) {
    res.status(500).json({
      message: "Request failed",
      error: error?.response?.data || error.message,
    });
  }
};
