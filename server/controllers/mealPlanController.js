import axios from "axios";
import MealPlan from "../models/mealSchema.js";

export const createMealPlan = async (req, res) => {
  const {
    dietaryPreference,
    currentWeight,
    targetWeight,
    activityLevel,
    allergies,
    mealFrequency,
    prepTime,
    lifestyle,
    workSchedule,
    medicalConditions,
    medications,
    budget,
  } = req.body;
  try {
    const prompt = `Generate a personalized health and fitness plan that includes a diet plan and exercise routine, tailored to the user's preferences and needs.

Diet Plan Requirements:
Dietary Preferences: ${dietaryPreference}
Current Weight: ${currentWeight}
Target Weight: ${targetWeight}
Activity Level: ${activityLevel}
Allergies: ${allergies}
Meal Frequency: ${mealFrequency} meals per day
Meal Preparation Time: ${prepTime}
Lifestyle: ${lifestyle}
Work Schedule: ${workSchedule}
Medical Conditions: ${medicalConditions}
Medications: ${medications}
Budget: ${budget} per day

    Structure of the plan is -
    [
  {
    "currDay": "Day 1",
    "currDayPlan": {
      "meals": [
        {
          "mealNum": "1st Meal",
          "timing": "when to eat meal",
          "name": "Meal name and details",
          "calories": calories in meal,
          "isCompleted": false
        }
        // more meals...
      ],
      "exercise": [
        {
        "type": "Cardio + Stretching",
        "duration": "30 minutes",
        "intensity": "Moderate",
        "name": "exercise name and details",
        "isCompleted": false
        },
        // more exercises according to the requirements
      ],
    }
  },
  // repeat for 7 days
]
  `;

    const API_KEY = process.env.GEMINI_API_KEY; // Ensure you have your API key set in your environment variables

    // Call the external API to generate a meal plan
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 3000,
          responseMimeType: "application/json",
        },
      }
    );

    const AIPlan = JSON.parse(
      response.data.candidates[0].content.parts[0].text
    );

    // Save the generated meal plan to the database
    const generatedPlan = await MealPlan.findByIdAndUpdate(
      req.user.id,
      {
        dietaryPreference,
        currentWeight,
        targetWeight,
        activityLevel,
        allergies,
        mealFrequency,
        prepTime,
        lifestyle,
        workSchedule,
        medicalConditions,
        medications,
        budget,
        plan: AIPlan,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!generatedPlan) {
      return res.status(500).json({ message: "Failed to create meal plan" });
    }
    res
      .status(201)
      .json({ message: "Meal plan generated successfully", plan: AIPlan });
  } catch (error) {
    res.status(500).json({
      message: "Request failed, try again",
      error: error?.response?.data || error.message,
    });
  }
};
